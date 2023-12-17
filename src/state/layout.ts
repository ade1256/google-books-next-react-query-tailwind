import { create } from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'


interface LayoutState {
    layout: 'grid' | 'list',
    setLayout: (layout: 'grid' | 'list') => void,
}

export const useLayout = create<LayoutState>()(persist((set) => ({
   layout: 'grid',
   setLayout: (layout: 'grid' | 'list') => set({ layout }),
}), {
    name: 'layoutSetting',
    storage: createJSONStorage(() => localStorage)
}))