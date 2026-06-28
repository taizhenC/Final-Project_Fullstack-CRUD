import { create } from 'zustand'

type StudentFilterStore = {
    selectedCampusId: string
    setSelectedCampusId: (campusId: string) => void
}

export const useStudentFilterStore = create<StudentFilterStore>((set) => ({
    selectedCampusId: 'all',
    setSelectedCampusId: (campusId) => set({ selectedCampusId: campusId }),
}))