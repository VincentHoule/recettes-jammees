import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useEffect, useState, type MouseEvent } from 'react';
import { Link } from 'react-router';
import { Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

/**
 * Interface d'une page dans le menu déroulant
 * @param name Nom de la page
 * @param href lien de la page
 * @param connecte bool si la page est visible lorsque l'utilisateur est connecté.
 * @param logout bool si la page est celle pour se déconnecter
 */
interface Page {
    name: string,
    href: string,
    connecte: boolean,
    logout : boolean
}

/**
 * Fonction de l'entête du site
 * @returns l'entête du site
 */
export function HeadersRecette() {
    // Pour le menu déroulant
    const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);
    const stateNavMenu = Boolean(anchorMenu);
    const handleCloseNavMenu = () => {
        setAnchorMenu(null);
    };
    const handleLogout = () => {
        localStorage.removeItem("name");
        localStorage.removeItem("id");
        localStorage.removeItem("email");
        handleCloseNavMenu()
    }
    const [pages, setPages] = useState([
        { name: "Se Connecter", href: "/login", connecte: false, logout: false },
        { name: "S'Inscrire", href: "/signIn", connecte: false, logout: false }
    ])

    /**
     * Ouvre le menu déroulant
     * @param event lorsque le bouton utilisateur est appuyé
     */
    const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorMenu(event.currentTarget);
    };

    /**
     * Actualise le menu déroulant
     */
    useEffect(() => {
        if (localStorage.getItem("email") != null) {
            setPages([{ name: "Déconnecter", href: "/", connecte: true, logout: true },
            { name: "Recettes", href: "/", connecte: false, logout: false },
            { name: "Mes recettes", href: "/myRecipes", connecte: true, logout: false }])
        }
        else {
            setPages([
                { name: "Se Connecter", href: "/login", connecte: false, logout: false },
                { name: "S'Inscrire", href: "/signIn", connecte: false, logout: false }
            ])
        }
    }, [stateNavMenu, ]);

    return (
        <Box sx={{ flexGrow: 1, width: '100vw' }}>
            <AppBar sx={{ display: "flex", alignItems: "center", flexDirection: "row", minHeight: '75px', padding: "0em 1em 0em 1em" }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Recette-Jammées
                </Typography>
                <Menu
                    open={stateNavMenu}
                    anchorEl={anchorMenu}
                    onClose={handleCloseNavMenu}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                >
                    {pages.map((page: Page) => (
                        <MenuItem
                            key={page.href}
                            component={Link}
                            to={page.href}
                            onClick={page.logout ? handleLogout : handleCloseNavMenu}
                        >
                            <Typography textAlign="center">{page.name}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
                <Button color='secondary' size='large' variant='contained' startIcon={<AccountCircle fontSize='large' />
                } sx={{position: "absolute", right : "15px"}} onClick={handleOpen}>
                    <Typography>{localStorage.getItem("name") == null ? "Intvité" : localStorage.getItem("name")} </Typography>
                </Button>
            </AppBar>
        </Box>
    );
}