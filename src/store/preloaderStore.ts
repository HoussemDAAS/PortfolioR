import { create } from 'zustand';

interface PreloaderState {
  isDone: boolean;
  markAsDone: () => void;
}

export const usePreloaderStore = create<PreloaderState>((set) => ({
  isDone: false,
  markAsDone: () => set({ isDone: true }),
}));