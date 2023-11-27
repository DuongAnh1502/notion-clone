"use client";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";

import { Id } from "@/convex/_generated/dataModel";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
interface MenuProps {
    documentId: Id<"documents">;
}
const Menu = ({ documentId }: MenuProps) => {
    const router = useRouter();
    const { user } = useUser();
    const archive = useMutation(api.documents.archive);
    const onArchive = () => {
        const promise = archive({ id: documentId });
        toast.promise(promise, {
            loading: "Moving to Trash...",
            success: "Note moved to Trash!",
            error: "Failed to archive note.",
        });
        router.push("/documents");
    };
    return <div>Menu</div>;
};

export default Menu;
