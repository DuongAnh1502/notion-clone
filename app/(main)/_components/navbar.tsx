"use client";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
interface NavbarProps {
    isCollapsed: boolean;
    onResetWidth: () => void;
}
const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
    const params = useParams();

    return <div>Navbar</div>;
};

export default Navbar;
