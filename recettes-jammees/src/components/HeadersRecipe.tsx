import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext, useState, type MouseEvent } from 'react';
import { Link } from 'react-router';
import { Menu, MenuItem } from '@mui/material';
import { RecipeContext } from '../contexts/RecipeContext';
import { AccountCircle } from '@mui/icons-material';

interface Page {
    name: string,
    href: string,
    connecte: boolean
}

export function HeadersRecette() {
    const context = useContext(RecipeContext);
    const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);
    const stateNavMenu = Boolean(anchorMenu);
    const [currentPage, setCurrentPage] = useState("home");
    console.log(context);
    const pages = [
        { name: "Se Connecter", href: "/login", connecte: false },
        { name: "Déconnecter", href: "/logout", connecte: true },
        { name: "Recettes", href: "/", connecte: false },
        { name: "Mes recettes", href: "/myRecipes", connecte: true }
    ]

    const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorMenu(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorMenu(null);
    };


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
                            onClick={handleCloseNavMenu}
                            disabled={context.user == undefined && !page.connecte ? false : true}
                            hidden={context.user == undefined && !page.connecte ? false : true}
                        >
                            <Typography textAlign="center">{page.name}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
                <Button color='secondary' size='large' variant='contained' startIcon={<AccountCircle fontSize='large' />
                } sx={{ display: "flex", flexDirection: "row", alignItems: "center" }} onClick={handleOpen}>
                    <Typography>{context.user == undefined ? "Intvité" : context.user?.name} </Typography>
                </Button>
            </AppBar>
        </Box>
    );
}