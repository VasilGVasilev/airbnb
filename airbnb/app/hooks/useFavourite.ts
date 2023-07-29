import axios from "axios";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { toast } from "react-hot-toast";

import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface IUseFavourite {
    listingId: string;
    currentUser?: SafeUser | null;
}

const useFavourite = ({
    listingId,
    currentUser
}: IUseFavourite) => {
    const router = useRouter();
    const LoginModal = useLoginModal();

    const hasFavourited = useMemo(()=>{
        const list = currentUser?.favouriteIds || [];
        return list.includes(listingId)
    }, [listingId, currentUser]);

    const toggleFavourite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();

        if(!currentUser){
            return LoginModal.onOpen();
        }

        try {
            let request;

            if(hasFavourited){
                request = () => axios.delete(`/api/favourites/${listingId}`);
            } else {
                request = () => axios.post(`/api/favourites/${listingId}`);
            }

            await request();
            router.refresh();
            toast.success('Success');

        } catch (error) {
            toast.error('Something went wrong.')
        }
    }, [currentUser, hasFavourited, listingId, LoginModal, router])

    return {
        hasFavourited,
        toggleFavourite
    }
}

export default useFavourite;