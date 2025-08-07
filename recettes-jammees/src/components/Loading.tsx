import { Backdrop, CircularProgress } from "@mui/material";

/**
 * Fonction qui affiche un chargement
 * @param props bool pour savoir si le chargement est en cours
 * @returns un chargement
 */
export default function Loading(props:{loading : boolean}) {
    return (
        <>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={props.loading}
            >
                <CircularProgress />
            </Backdrop>
        </>

    )
}