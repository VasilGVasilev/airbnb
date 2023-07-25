import { create } from 'zustand';
// hook that stores a state instead of context

// generic accepting one boolean and two void functions, ts will infer values without interface, but this way, it is more reabale
interface RentModalStore {
    // state
    isOpen: boolean;
    // state setters
    onOpen: () => void;
    onClose: () => void;
}

const useRentModal = create<RentModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))

export default useRentModal;