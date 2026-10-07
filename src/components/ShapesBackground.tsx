import { motion, useReducedMotion } from 'framer-motion';

function ElegantShape({
  className = '',
  delay = 0,
  width,
  height,
  rotate = 0,
  gradient,
  borderRadius = 16,
  reduce,
}: {
  className?: string;
  delay?: number;
  width: number;
  height: number;
  rotate?: number;
  gradient: string;
  borderRadius?: number;
  reduce: boolean;
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={reduce ? false : { opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
    >
      <motion.div
        animate={{ y: reduce ? 0 : [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
        style={{ width, height }}
      >
        <div
          className={`absolute inset-0 bg-linear-to-r to-transparent ${gradient} ring-1 ring-ink/5 after:absolute after:inset-0 after:rounded-[inherit] after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.35),transparent_70%)]`}
          style={{ borderRadius }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function ShapesBackground() {
  const reduce = useReducedMotion() ?? false;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      <ElegantShape
        reduce={reduce}
        delay={0.3}
        width={300}
        height={500}
        rotate={-8}
        borderRadius={24}
        className="top-[-10%] left-[-15%]"
        gradient="from-accent/20"
      />
      <ElegantShape
        reduce={reduce}
        delay={0.5}
        width={600}
        height={200}
        rotate={15}
        borderRadius={20}
        className="right-[-20%] bottom-[-5%]"
        gradient="from-[#E8A86B]/30"
      />
      <ElegantShape
        reduce={reduce}
        delay={0.4}
        width={300}
        height={300}
        rotate={24}
        borderRadius={32}
        className="top-[40%] left-[-5%]"
        gradient="from-ink/10"
      />
      <ElegantShape
        reduce={reduce}
        delay={0.6}
        width={250}
        height={100}
        rotate={-20}
        borderRadius={12}
        className="top-[5%] right-[10%]"
        gradient="from-[#B5483A]/20"
      />
      <ElegantShape
        reduce={reduce}
        delay={0.7}
        width={400}
        height={150}
        rotate={35}
        borderRadius={16}
        className="top-[45%] right-[-10%]"
        gradient="from-accent/15"
      />
      <ElegantShape
        reduce={reduce}
        delay={0.2}
        width={200}
        height={200}
        rotate={-25}
        borderRadius={28}
        className="bottom-[10%] left-[20%]"
        gradient="from-border-strong/40"
      />
      <ElegantShape
        reduce={reduce}
        delay={0.8}
        width={150}
        height={80}
        rotate={45}
        borderRadius={10}
        className="top-[15%] left-[40%]"
        gradient="from-[#E8A86B]/25"
      />
      <ElegantShape
        reduce={reduce}
        delay={0.9}
        width={450}
        height={120}
        rotate={-12}
        borderRadius={18}
        className="top-[60%] left-[25%]"
        gradient="from-ink/[0.07]"
      />
    </div>
  );
}
