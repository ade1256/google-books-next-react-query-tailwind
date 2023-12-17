import { create } from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Book {
  id: string,
  title: string,
  authors: string[],
  description: string,
  imageUrl: string,
  publishedDate: string,
  publisher: string,
}

interface BookmarkState {
    bookmark: Book[],
    setBookmark: (bookmark: Book[]) => void,
}

export const useBookmark = create<BookmarkState>()(persist((set) => ({
   bookmark: [],
   setBookmark: (bookmark: Book[]) => set({ bookmark }),
}), {
    name: 'mybookmark',
    storage: createJSONStorage(() => localStorage)
}))