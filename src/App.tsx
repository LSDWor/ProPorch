import React from 'react';
import { useDemo } from './hooks/useDemo';
import Landing from './components/Landing';
import DemoPortal from './components/DemoPortal';

const App: React.FC = () => {
  const demo = useDemo();

  if (demo.state.appView === 'landing') {
    return <Landing onEnterDemo={demo.enterDemo} />;
  }

  return <DemoPortal demo={demo} />;
};

export default App;
