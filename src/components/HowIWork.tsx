import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import {
  AnimatePresence,
  easeInOut,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  LuBug,
  LuCode,
  LuLightbulb,
  LuRefreshCw,
  LuRocket,
  LuSearch,
} from 'react-icons/lu';

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

type Step = { title: string; blurb: string; Icon: IconType };

const STEPS: Step[] = [
  {
    title: 'Discover',
    blurb:
      'I start by listening: who this is for, what problem it solves, and what "done" looks like. A few honest questions up front save weeks later.',
    Icon: LuSearch,
  },
  {
    title: 'Brainstorm & Architect',
    blurb:
      'I sketch the flows, pick the stack, and map out the data before touching code. The goal is a plan simple enough to explain on a napkin.',
    Icon: LuLightbulb,
  },
  {
    title: 'Development',
    blurb:
      'I build in small, working slices that stay typed, readable, and easy to change. Something runnable shows up early, so feedback is on the real thing.',
    Icon: LuCode,
  },
  {
    title: 'QA & Testing',
    blurb:
      "I click through every path, break things on purpose, and check them on real screens. If I'd be nervous demoing it, it isn't ready.",
    Icon: LuBug,
  },
  {
    title: 'Ship & Deploy',
    blurb:
      'I ship through a Git-based pipeline with preview links along the way, so releasing feels calm instead of risky.',
    Icon: LuRocket,
  },
  {
    title: 'Iterate',
    blurb:
      'Launch is the start of the loop. I watch how people actually use it, gather feedback, and keep refining.',
    Icon: LuRefreshCw,
  },
];

const N = STEPS.length;

/* ------------------------------------------------------------------ */
/*  Scene constants                                                    */
/* ------------------------------------------------------------------ */

const ACCENT = '#D9642C';
const ROT_X = 58; // tilt of the ground plane
const ROT_Z = 45; // isometric turn
const STEP_GAP = 440; // distance between nodes on the ground plane (px)
const HOLD = 0.05; // scroll fraction the camera rests on each node
const PLATFORM = 224;
const PLATFORM_H = 20;
const CUBE = 124;
const CUBE_H = 84;
const RAISE = 30; // how far the current node lifts

// Path zig-zags: +x, -y, +x, -y... which reads left to right on screen.
const POSITIONS = STEPS.map((_, i) => ({
  x: Math.ceil(i / 2) * STEP_GAP,
  y: -Math.floor(i / 2) * STEP_GAP,
}));

// Camera keyframes: rest on every node, glide between them.
const CAMERA = (() => {
  const inputs: number[] = [];
  const xs: number[] = [];
  const ys: number[] = [];
  POSITIONS.forEach((p, i) => {
    const c = i / (N - 1);
    for (const t of [Math.max(0, c - HOLD), Math.min(1, c + HOLD)]) {
      inputs.push(t);
      xs.push(-p.x);
      ys.push(-p.y);
    }
  });
  return { inputs, xs, ys };
})();

type NodeState = 'upcoming' | 'current' | 'done';
type Palette = { top: string; left: string; right: string };

const PLATFORM_PALETTE: Palette = {
  top: '#F2EEE6',
  left: '#DDD7CB',
  right: '#CAC3B4',
};
const CUBE_PALETTE: Record<NodeState, Palette> = {
  upcoming: { top: '#FAF8F4', left: '#E3DDD2', right: '#CEC7B9' },
  done: { top: '#EBA67C', left: '#D98C5E', right: '#C07448' },
  current: { top: '#E87A3E', left: ACCENT, right: '#B04D1D' },
};

const P3D: CSSProperties = { transformStyle: 'preserve-3d' };

/* ------------------------------------------------------------------ */
/*  3D building blocks                                                 */
/* ------------------------------------------------------------------ */

/** A box standing on the ground plane, centred on its parent's origin. Draws the three visible faces. */
function Box({
  w,
  d,
  h,
  palette,
  children,
}: {
  w: number;
  d: number;
  h: number;
  palette: Palette;
  children?: ReactNode;
}) {
  const face: CSSProperties = {
    position: 'absolute',
    transition: 'background-color .5s ease',
    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.28)',
  };
  return (
    <div style={{ ...P3D, position: 'absolute', left: 0, top: 0 }}>
      {/* top */}
      <div
        style={{
          ...face,
          width: w,
          height: d,
          left: -w / 2,
          top: -d / 2,
          backgroundColor: palette.top,
          transform: `translateZ(${h}px)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </div>
      {/* +y face */}
      <div
        style={{
          ...face,
          width: w,
          height: h,
          left: -w / 2,
          top: -h / 2,
          backgroundColor: palette.left,
          transform: `translate3d(0, ${d / 2}px, ${h / 2}px) rotateX(90deg)`,
        }}
      />
      {/* +x face */}
      <div
        style={{
          ...face,
          width: d,
          height: h,
          left: -d / 2,
          top: -h / 2,
          backgroundColor: palette.right,
          transform: `translate3d(${w / 2}px, 0, ${h / 2}px) rotateZ(90deg) rotateX(90deg)`,
        }}
      />
    </div>
  );
}

function Grid() {
  return (
    <div
      style={{
        position: 'absolute',
        width: 7000,
        height: 5000,
        left: -3500,
        top: -2500,
        transform: 'translateZ(-2px)',
        backgroundImage:
          'linear-gradient(rgba(70,50,30,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(70,50,30,.08) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
      }}
    />
  );
}

const TRACK = 8;

function Segment({
  from,
  to,
  index,
  progress,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  index: number;
  progress: MotionValue<number>;
}) {
  const a = index / (N - 1) + HOLD;
  const b = (index + 1) / (N - 1) - HOLD;
  const fill = useTransform(progress, [a, b], [0, 1]);
  const horizontal = to.x > from.x;

  const box: CSSProperties = horizontal
    ? {
        left: from.x,
        top: from.y - TRACK / 2,
        width: to.x - from.x,
        height: TRACK,
      }
    : {
        left: from.x - TRACK / 2,
        top: to.y,
        width: TRACK,
        height: from.y - to.y,
      };

  return (
    <div style={{ position: 'absolute', transform: 'translateZ(1px)', ...box }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `repeating-linear-gradient(${horizontal ? '90deg' : '180deg'}, rgba(70,50,30,.28) 0 14px, transparent 14px 26px)`,
        }}
      />
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 4,
          backgroundColor: ACCENT,
          scaleX: horizontal ? fill : 1,
          scaleY: horizontal ? 1 : fill,
          transformOrigin: horizontal ? 'left center' : 'center bottom',
        }}
      />
    </div>
  );
}

function SceneNode({
  step,
  index,
  state,
}: {
  step: Step;
  index: number;
  state: NodeState;
}) {
  const { Icon } = step;
  const current = state === 'current';
  const raise = current ? RAISE : 0;
  const { x, y } = POSITIONS[index];
  const ease = 'transform .6s cubic-bezier(.2,.8,.2,1)';

  const badgeBg = current
    ? ACCENT
    : state === 'done'
      ? '#F8DCC9'
      : 'var(--color-card, #FAF8F4)';
  const badgeFg = current ? '#fff' : state === 'done' ? ACCENT : '#7A7168';

  return (
    <div
      style={{
        ...P3D,
        position: 'absolute',
        left: 0,
        top: 0,
        transform: `translate3d(${x}px, ${y}px, 0)`,
      }}
    >
      {/* contact shadow */}
      <div
        style={{
          position: 'absolute',
          width: PLATFORM + 10,
          height: PLATFORM + 10,
          left: -(PLATFORM + 10) / 2 + 22,
          top: -(PLATFORM + 10) / 2 + 22,
          background: 'rgba(50,35,20,.3)',
          filter: 'blur(20px)',
          transform: 'translateZ(0.5px)',
        }}
      />

      <Box
        w={PLATFORM}
        d={PLATFORM}
        h={PLATFORM_H}
        palette={PLATFORM_PALETTE}
      />

      {current && (
        <motion.div
          style={{
            position: 'absolute',
            width: PLATFORM - 18,
            height: PLATFORM - 18,
            left: -(PLATFORM - 18) / 2,
            top: -(PLATFORM - 18) / 2,
            border: `2px solid ${ACCENT}`,
            z: PLATFORM_H + 1,
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.7, 0.15, 0.7] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* raised cube */}
      <div
        style={{
          ...P3D,
          position: 'absolute',
          left: 0,
          top: 0,
          transform: `translateZ(${PLATFORM_H + raise}px)`,
          transition: ease,
        }}
      >
        <Box w={CUBE} d={CUBE} h={CUBE_H} palette={CUBE_PALETTE[state]}>
          <span
            style={{
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: current
                ? 'rgba(255,255,255,.92)'
                : state === 'done'
                  ? 'rgba(255,255,255,.75)'
                  : 'rgba(70,50,30,.35)',
              transition: 'color .5s ease',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </Box>
      </div>

      {/* billboard: icon badge + label, always facing the viewer */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          transform: `translate3d(0, 0, ${PLATFORM_H + CUBE_H + raise + 20}px) rotateZ(-${ROT_Z}deg) rotateX(-${ROT_X}deg)`,
          transition: ease,
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            x: '-50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
          animate={{ y: current ? [0, -9, 0] : 0 }}
          transition={
            current
              ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.3 }
          }
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              display: 'grid',
              placeItems: 'center',
              background: badgeBg,
              color: badgeFg,
              boxShadow:
                '0 12px 26px rgba(60,40,20,.25), inset 0 0 0 1px rgba(255,255,255,.4)',
              transition: 'background .5s ease, color .5s ease',
            }}
          >
            <Icon size={28} />
          </div>
          <div
            style={{
              whiteSpace: 'nowrap',
              padding: '5px 12px',
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 600,
              background: current ? ACCENT : 'rgba(255,255,255,.75)',
              color: current ? '#fff' : '#5B534B',
              boxShadow: '0 4px 12px rgba(60,40,20,.12)',
              transition: 'background .5s ease, color .5s ease',
            }}
          >
            {step.title}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scroll-driven section                                              */
/* ------------------------------------------------------------------ */

function useSceneScale() {
  const [k, setK] = useState(1);
  useEffect(() => {
    const update = () =>
      setK(Math.min(1, Math.max(0.6, window.innerWidth / 1100)));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return k;
}

function Header() {
  return (
    <h2
      id="process-title"
      className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl"
    >
      How I work
    </h2>
  );
}

function ScrollScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: progress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const [active, setActive] = useState(0);
  const k = useSceneScale();

  const camX = useTransform(progress, CAMERA.inputs, CAMERA.xs, {
    ease: easeInOut,
  });
  const camY = useTransform(progress, CAMERA.inputs, CAMERA.ys, {
    ease: easeInOut,
  });
  const hint = useTransform(progress, [0, 0.04], [1, 0]);

  const toIndex = (v: number) =>
    Math.min(N - 1, Math.max(0, Math.round(v * (N - 1))));
  useMotionValueEvent(progress, 'change', (v) => setActive(toIndex(v)));
  useEffect(() => setActive(toIndex(progress.get())), [progress]);

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const range = el.offsetHeight - window.innerHeight;
    const top =
      el.getBoundingClientRect().top + window.scrollY + (i / (N - 1)) * range;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const step = STEPS[active];

  return (
    <section
      id="process"
      ref={ref}
      aria-labelledby="process-title"
      className="relative"
      style={{ height: `${N * 80 + 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 3D scene */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 bottom-[272px] overflow-hidden [mask-image:linear-gradient(to_bottom,#000_88%,transparent)] lg:bottom-0 lg:[mask-image:linear-gradient(to_right,transparent_10%,#000_40%)]"
        >
          <div
            className="absolute left-1/2 top-[60%] lg:left-[66%] lg:top-1/2"
            style={{ perspective: '1800px' }}
          >
            <div
              style={{
                ...P3D,
                position: 'absolute',
                left: 0,
                top: 0,
                width: 0,
                height: 0,
                transform: `scale3d(${k}, ${k}, ${k}) rotateX(${ROT_X}deg) rotateZ(${ROT_Z}deg)`,
              }}
            >
              <motion.div
                style={{
                  ...P3D,
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  x: camX,
                  y: camY,
                }}
              >
                <Grid />
                {POSITIONS.slice(0, -1).map((p, i) => (
                  <Segment
                    key={i}
                    index={i}
                    from={p}
                    to={POSITIONS[i + 1]}
                    progress={progress}
                  />
                ))}
                {STEPS.map((s, i) => (
                  <SceneNode
                    key={s.title}
                    step={s}
                    index={i}
                    state={
                      i === active
                        ? 'current'
                        : i < active
                          ? 'done'
                          : 'upcoming'
                    }
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* copy panel */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex h-[272px] flex-col bg-gradient-to-t from-[#E7E3DB]/95 via-[#E7E3DB]/80 to-transparent px-6 pt-6 sm:px-10 lg:inset-y-0 lg:right-auto lg:h-auto lg:w-[min(30rem,42vw)] lg:justify-center lg:bg-none lg:pl-[max(2rem,calc((100vw-72rem)/2))] lg:pr-0 lg:pt-0">
          <Header />

          <div className="mt-5 min-h-[8.5rem] lg:mt-8" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                <p
                  className="font-mono text-sm font-medium"
                  style={{ color: ACCENT }}
                >
                  {String(active + 1).padStart(2, '0')} /{' '}
                  {String(N).padStart(2, '0')}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-neutral-900 sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-neutral-600">
                  {step.blurb}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <nav
            className="mt-3 flex items-center gap-2 lg:mt-6"
            aria-label="Process steps"
          >
            {STEPS.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to step ${i + 1}: ${s.title}`}
                aria-current={i === active ? 'step' : undefined}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === active ? 28 : 8,
                  backgroundColor: i <= active ? ACCENT : 'rgba(70,50,30,.2)',
                }}
              />
            ))}
          </nav>
        </div>

        <motion.div
          aria-hidden
          style={{ opacity: hint }}
          className="pointer-events-none absolute bottom-8 left-[66%] hidden -translate-x-1/2 text-sm text-neutral-500 lg:block"
        >
          Scroll to begin
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reduced-motion fallback: same content, no scroll theatre           */
/* ------------------------------------------------------------------ */

function StaticList() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <Header />
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map(({ title, blurb, Icon }, i) => (
            <li
              key={title}
              className="rounded-2xl bg-[var(--color-card,#FAF8F4)] p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span
                  className="grid h-11 w-11 place-items-center rounded-full text-white"
                  style={{ backgroundColor: ACCENT }}
                >
                  <Icon size={20} />
                </span>
                <span className="font-mono text-sm" style={{ color: ACCENT }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900">
                {title}
              </h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-neutral-600">
                {blurb}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function HowIWork() {
  const reduce = useReducedMotion();
  return reduce ? <StaticList /> : <ScrollScene />;
}
