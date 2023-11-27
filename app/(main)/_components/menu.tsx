"use client";
import { useParams, useRouter } from "next/navigation";
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
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash } from "lucide-react";
interface MenuProps {
    documentId: Id<"documents">;
}
const Menu = ({ documentId }: MenuProps) => {
    const router = useRouter();
    const { user } = useUser();
    const params = useParams();
    const archive = useMutation(api.documents.archive);
    const onArchive = () => {
        const promise = archive({ id: documentId });
        toast.promise(promise, {
            loading: "Moving to Trash...",
            success: "Note moved to Trash!",
            error: "Failed to archive note.",
        });
        if (params.documentId === documentId) {
            router.push("/documents");
        }
    };
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size='sm' variant='ghost'>
                        <MoreHorizontal className='h-4 w-4' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className='w-60'
                    align='end'
                    alignOffset={8}
                    forceMount
                >
                    <DropdownMenuItem onClick={onArchive}>
                        <Trash className='h-4 w-4 mr-2' />
                        Delete
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <div className='text-xs text-muted-foreground p-2'>
                        Last edited by: {user?.fullName}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default Menu;
