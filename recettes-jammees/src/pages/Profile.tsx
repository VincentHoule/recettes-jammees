import { Alert, Box, Button, Container, CssBaseline, Grid, Pagination, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Api from "../utils/Api";
import type Recipe from "../interfaces/Recipe";
import Loading from "../components/Loading";
import { CheckCircleOutline, Error } from "@mui/icons-material";
import { Link } from "react-router";
import RecipeCardUser from "../components/RecipeCardUser";


export default function Profile() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [recipesFilter, setRecipesFilter] = useState<Recipe[]>([]);
    const [page, setPage] = useState(1);
    const [info, setInfo] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");
    const [icon, setIcon] = useState<React.JSX.Element>(<Error fontSize='inherit' />);
    const [color, setColor] = useState("");
    const [loading, setLoading] = useState(false);
    const numCardPage = 3;

    useEffect(() => {
        setLoading(true);
        const id = localStorage.getItem("id");
        Api.get(`/api/recipe/myRecipes/${id}`).then((response) => {
            setLoading(false);
            setRecipes(response.data);
            setRecipesFilter(response.data.slice(page * numCardPage - numCardPage, page * numCardPage));
        }).catch((_) => {
            setLoading(false);
            setColor("error");
            setInfoMessage("Un problème est survenu avec le serveur. Veuillez réessayer plus tard.")
            setIcon(<Error fontSize='inherit' />)
            setInfo(true);
        })
    }, [])

    const handleDelete = (recipe: Recipe) => {
        setRecipes(recipes.filter(a =>
            a !== recipe
        ))
        setRecipesFilter(recipesFilter.filter(a =>
            a !== recipe

        ))
        setColor("success");
        setIcon(<CheckCircleOutline fontSize='inherit' />)
        setInfoMessage("La suppression de la recette a réussi.")
        setInfo(true)
    }



    const handlePage = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        setRecipesFilter(recipes.slice(value * 3 - 3, value * 3));

    };

    const handleCloseInfo = () => {
        setInfo(false);
    }

    return (
        <>
            <CssBaseline />
            <Loading loading={loading} />
            <Snackbar open={info} autoHideDuration={6000} onClose={handleCloseInfo}>
                <Alert onClose={handleCloseInfo} severity={color == "success" ? "success" : "error"}
                    sx={{ width: '100%' }} icon={icon}>
                    {infoMessage}
                </Alert>
            </Snackbar>
            <Box sx={{
                display: 'flex', justifyContent: "space-around", alignItems: 'center',
                flexDirection: 'column', minHeight: '100vh', paddingTop: "75px",
            }}>

                <Container>
                    <Typography variant="h2">Mes recettes</Typography>
                    <Button
                        variant="contained"
                        key={"/createRecipe"}
                        component={Link}
                        to={"/createRecipe"}>
                        Créer une recette</Button>
                </Container>

                <Grid sx={{ marginTop: "15px" }} container spacing={8}>
                    {recipesFilter.length != 0 ? recipesFilter.map((recipe: Recipe) => {
                        return (
                            <Grid key={recipe.id} size={{ xs: 12, sm: recipesFilter.length > 2 ? 4 : 6 }}>
                                <RecipeCardUser recipe={recipe} handleDelete={handleDelete} />
                            </Grid>
                        );
                    }) : <Alert severity="info">Vous n'avez aucune recette.</Alert>}
                </Grid>
                <Pagination page={page} onChange={handlePage} count={Math.ceil(recipes.length / numCardPage)} color="secondary" />
            </Box>
        </>
    );
}