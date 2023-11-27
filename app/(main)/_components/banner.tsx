"use client";

import { useMutation } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";
interface BannerProps {
    documentId: Id<"documents">;
}
export const Banner = ({ documentId }: BannerProps) => {
    const router = useRouter();
    const params = useParams();
    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.restore);
    const onRemove = () => {
        const promise = remove({ id: documentId });
        toast.promise(promise, {
            loading: "Removing document...",
            success: "Document removed!",
            error: "Failed to remove document.",
        });
        router.push("/documents");
    };
    const onRestore = () => {
        const promise = restore({ id: documentId });
        toast.promise(promise, {
            loading: "Restoring document...",
            success: "Document restored!",
            error: "Failed to restor document.",
        });
        if (params.documentId === documentId) {
            router.push("/documents");
        }
    };
    return (
        <div className='w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center'>
            <p>This page is in the Trash.</p>
            <Button
                size='sm'
                onClick={onRestore}
                variant='outline'
                className='border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal'
            >
                Restore page
            </Button>
            <ConfirmModal onConfirm={onRemove} action='Delete'>
                <Button
                    size='sm'
                    variant='outline'
                    className='border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal'
                >
                    Delete forever
                </Button>
            </ConfirmModal>
        </div>
    );
};
