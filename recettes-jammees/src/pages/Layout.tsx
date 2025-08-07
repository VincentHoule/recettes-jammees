import { Outlet } from "react-router";
import { HeadersRecette } from "../components/HeadersRecipe";


/**
 * Fonction pour avoir le Header de la page
 */
export default function Layout() {
    return (
        <>
            <HeadersRecette />
            <Outlet />
        </>
    )
}