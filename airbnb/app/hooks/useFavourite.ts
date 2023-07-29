import axios from "axios";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { toast } from "react-hot-toast";

import { SafeUser } from "../types";
import LoginModal from "@/components/modals/LoginModal";

interface IUseFavourite {
    listingsId: string;
    currentUser?: SafeUser | null;
}