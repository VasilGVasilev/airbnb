import { create } from 'zustand';

// generic accepting one boolean and two void functions, ts will infer values without interface, but this way, it is more reabale
interface LoginModalStore {
    // state
    isOpen: boolean;
    // state setters
    onOpen: () => void;
    onClose: () => void;
}

const useLoginModal = create<LoginModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))

export default useLoginModal;