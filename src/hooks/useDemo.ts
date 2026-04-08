import { useState, useCallback } from 'react';
import { AppView, ProjectData, QuoteData } from '../types';
import { mockProjectData, serviceQuotes } from '../data/mockData';

export type DemoView = 'home' | 'loading' | 'result';

interface DemoState {
  appView: AppView;
  demoView: DemoView;
  address: string;
  projectData: ProjectData | null;
  loadingStep: number;
  quoteResult: QuoteData | null;
  selectedService: string;
}

export function useDemo() {
  const [state, setState] = useState<DemoState>({
    appView: 'landing',
    demoView: 'home',
    address: '',
    projectData: null,
    loadingStep: 0,
    quoteResult: null,
    selectedService: '',
  });

  const enterDemo = useCallback(() => {
    setState(prev => ({ ...prev, appView: 'demo', demoView: 'home' }));
  }, []);

  const goToLanding = useCallback(() => {
    setState(prev => ({
      ...prev,
      appView: 'landing',
      demoView: 'home',
      projectData: null,
      address: '',
      loadingStep: 0,
    }));
  }, []);

  const submitAddress = useCallback((address: string) => {
    setState(prev => ({ ...prev, address, demoView: 'loading', loadingStep: 0 }));

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= 6) {
        clearInterval(interval);
        setState(prev => ({
          ...prev,
          demoView: 'result',
          projectData: { ...mockProjectData, address },
        }));
      } else {
        setState(prev => ({ ...prev, loadingStep: step }));
      }
    }, 600);
  }, []);

  const resetSearch = useCallback(() => {
    setState(prev => ({
      ...prev,
      demoView: 'home',
      projectData: null,
      address: '',
      loadingStep: 0,
    }));
  }, []);

  const generateQuote = useCallback((serviceType: string) => {
    const key = serviceType.toLowerCase();
    const quote = serviceQuotes[key] || serviceQuotes.plumbing;
    setState(prev => ({ ...prev, quoteResult: quote, selectedService: serviceType }));
  }, []);

  const clearQuote = useCallback(() => {
    setState(prev => ({ ...prev, quoteResult: null }));
  }, []);

  return {
    state,
    enterDemo,
    goToLanding,
    submitAddress,
    resetSearch,
    generateQuote,
    clearQuote,
  };
}
