'use client'

import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "../types"

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface TripsClientProps {
    reservations: SafeReservation[];
    currentUser: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
    reservations,
    currentUser
}) => {

    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        // del FE
        setDeletingId(id);
        // del BE
        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Reservation cancelled');
                router.refresh();
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error);
            })
            .finally(() => {
                setDeletingId('');
            })
    }, [router])
    // We put in the router variable in the dep array, because it may change its value between triggering execution of onCancel function
    // and actual calling of router.refresh() method. Thus, to ensure that the onCancel function is re-evaluated (up-to-date) 
    // whenever the router variable changes, we need to add the router variable to the dependency array of the useCallback hook.

    return (
        <Container>
            <Heading
                title="Trips"
                subtitle="Where you've been and where you're going?"
            />
            <div
                className="
                    mt-10
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6
                    gap-8
                "
            >

            </div>
        </Container>
    )
}

export default TripsClient
