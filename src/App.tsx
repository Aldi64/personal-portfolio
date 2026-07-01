import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Hobbies from './components/Hobbies';
import Contact from './components/Contact';

export type Section =
  | 'dashboard'
  | 'profile'
  | 'skills'
  | 'projects'
  | 'hobbies'
  | 'contact';

function App() {
  const [activeSection, setActiveSection] = useState<Section>('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'profile':
        return <Profile />;
      case 'skills':
        return <Skills />;
      case 'projects':
        return <Projects />;
      case 'hobbies':
        return <Hobbies />;
      case 'contact':
        return <Contact />;
    }
  };

  return (
    <div
      className="flex min-h-screen"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Ambient background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, #7c3aed, transparent)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, #3b82f6, transparent)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {renderSection()}
      </main>
    </div>
  );
}

export default App;
