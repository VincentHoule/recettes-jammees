import { Outlet } from "react-router";
import { HeadersRecette } from "../components/HeadersRecipe";



export default function Layout() {
    return (
        <>
            <HeadersRecette />
            <Outlet />
        </>
    )
}