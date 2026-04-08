import { useState, useCallback } from 'react';
import { TabId, AppView, ProjectData, QuoteData } from '../types';
import { mockProjectData, serviceQuotes } from '../data/mockData';

interface DemoState {
  appView: AppView;
  activeTab: TabId;
  address: string;
  projectData: ProjectData | null;
  isLoading: boolean;
  loadingStep: number;
  quoteResult: QuoteData | null;
  selectedService: string;
  drawerOpen: boolean;
}

export function useDemo() {
  const [state, setState] = useState<DemoState>({
    appView: 'landing',
    activeTab: 'home',
    address: '',
    projectData: null,
    isLoading: false,
    loadingStep: 0,
    quoteResult: null,
    selectedService: '',
    drawerOpen: false,
  });

  const enterDemo = useCallback(() => {
    setState(prev => ({ ...prev, appView: 'demo', activeTab: 'home' }));
  }, []);

  const goToLanding = useCallback(() => {
    setState(prev => ({
      ...prev,
      appView: 'landing',
      activeTab: 'home',
      projectData: null,
      address: '',
      isLoading: false,
    }));
  }, []);

  const setActiveTab = useCallback((tab: TabId) => {
    setState(prev => ({ ...prev, activeTab: tab }));
  }, []);

  const submitAddress = useCallback((address: string) => {
    setState(prev => ({ ...prev, address, isLoading: true, loadingStep: 0 }));

    // Simulate loading steps
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= 6) {
        clearInterval(interval);
        setState(prev => ({
          ...prev,
          isLoading: false,
          projectData: { ...mockProjectData, address },
          activeTab: 'projects',
          drawerOpen: true,
        }));
      } else {
        setState(prev => ({ ...prev, loadingStep: step }));
      }
    }, 600);
  }, []);

  const generateQuote = useCallback((serviceType: string) => {
    const key = serviceType.toLowerCase();
    const quote = serviceQuotes[key] || serviceQuotes.plumbing;
    setState(prev => ({ ...prev, quoteResult: quote, selectedService: serviceType }));
  }, []);

  const clearQuote = useCallback(() => {
    setState(prev => ({ ...prev, quoteResult: null }));
  }, []);

  const setDrawerOpen = useCallback((open: boolean) => {
    setState(prev => ({ ...prev, drawerOpen: open }));
  }, []);

  return {
    state,
    enterDemo,
    goToLanding,
    setActiveTab,
    submitAddress,
    generateQuote,
    clearQuote,
    setDrawerOpen,
  };
}
