import { create } from 'zustand'

type Store = {
    bioList: Object[]
    setBioList: (bioList: Object[]) => void
}

const useStore = create<Store>()((set) => ({
    bioList: [],
    setBioList: (bioList: Object[]) => set({ bioList: bioList }),
}))

export default useStore