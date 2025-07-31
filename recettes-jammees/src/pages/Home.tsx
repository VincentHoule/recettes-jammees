import { Alert, Backdrop, Box, Button, CircularProgress, Container, CssBaseline, Grid, NativeSelect, Pagination, Snackbar, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { HeadersRecette } from "../components/HeadersRecipe"

import { useEffect, useState } from "react";
import Api from "../utils/Api";
import RecipeCard from "../components/RecipeCard";
import type Recipe from "../interfaces/Recipe";
import { ArrowDownward, ArrowUpward, Error, Height } from "@mui/icons-material";

export default function Home() {
    const [category, setCategory] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [recipesFilter, setRecipesFilter] = useState([]);
    const [page, setPage] = useState(1);
    const [order, setOrder] = useState("created_at");
    const [direction, setDirection] = useState("asc");
    const [research, setResearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);

        Api.get("/api/recipe/all", {
            params: {
                order: order,
                direction: direction,
                category: category,
                research: research
            }
        }).then((response) => {
            setLoading(false);
            setRecipes(response.data);
            setRecipesFilter(response.data.slice(page * 3 - 3, page * 3));

        })
            .catch((_) => {
                setLoading(false);
                setError(true);
            });
    }, [order, category, direction, research])

    const handleCategory = (_: React.ChangeEvent<unknown>, value: string) => {
        setCategory(value);
    };

    const handlePage = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        setRecipesFilter(recipes.slice(value * 3 - 3, value * 3));

    };

    const handleDirection = () => {
        direction == 'desc' ? setDirection('asc') : setDirection('desc');
        console.log(direction)
    }
    const handleCloseError = () => {
        setError(false);
    }

    function handleResearch(value: string) {
        setResearch(value);
    };

    function handleOrder(value: string) {
        setOrder(value);
    };


    return (
        <>
            <CssBaseline />
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
            >
                <CircularProgress />
            </Backdrop>
            <Snackbar open={error} autoHideDuration={6000} onClose={handleCloseError}>
                <Alert onClose={handleCloseError} severity="error"
                    sx={{ width: '100%' }} icon={<Error fontSize="inherit" />}>
                    Vraiment désolé, mais nous avons un problème avec nos server. Veuillez réessayer plus tard.
                </Alert>
            </Snackbar>

            <Box sx={{
                display: 'flex', justifyContent: "space-around", alignItems: 'center',
                flexDirection: 'column', minHeight: '100vh', paddingTop: "75px",
            }}>

                <Container>
                    <Typography variant="h2" >Recettes-Jammées</Typography>
                    <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Container sx={{ display: "flex", justifyContent:"center", marginTop: "15px" }}>
                            <TextField sx={{ width: "20em" }} color="secondary" onBlur={(e) => handleResearch(e.target.value)}
                                id="outlined-search" label="Rechercher" type="search" />
                            <Container sx={{ display: "flex", flexDirection: "row", alignItems: "center", width: "max-content" }}>
                                <Typography>Trier par :</Typography>
                                <NativeSelect color="secondary" onChange={(e) => handleOrder(e.target.value)} defaultValue={order}>
                                    <option value={"name"}>Nom</option>
                                    <option value={"created_at"}>Date de création</option>
                                </NativeSelect>
                            </Container>
                            <Container sx={{ display: "flex", flexDirection: "row", alignItems: "center", width: "max-content"}}>
                                <Typography>Ordre :</Typography>
                                <Button size="medium" startIcon={direction == "desc" ? <ArrowDownward /> : <ArrowUpward />}
                                    variant="contained" color='secondary' sx={{ width: '100px' }}
                                    onClick={handleDirection}>
                                    {direction}
                                </Button>
                            </Container>

                        </Container>

                        <ToggleButtonGroup
                            sx={{ marginTop: "15px" }}
                            color="primary"
                            value={category}
                            defaultValue={''}
                            onChange={handleCategory}
                            exclusive
                            aria-label="Platform"
                        >
                            <ToggleButton color="secondary" value="repas">Repas</ToggleButton>
                            <ToggleButton color="secondary" value="dessert">Dessert</ToggleButton>
                            <ToggleButton color="secondary" value="breuvage">Breuvage</ToggleButton>
                        </ToggleButtonGroup>
                    </Container>

                </Container>
                <Grid sx={{ marginTop: "15px" }} container spacing={8}>
                    {recipesFilter.length != 0 ? recipesFilter.map((recipe: Recipe) => {
                        return (
                            <Grid key={recipe.id} size={{ xs: 12, sm: 4 }}>
                                <RecipeCard id={recipe.id} name={recipe.name} user_id={recipe.user_id}
                                    description={recipe.description} category={recipe.category} image={recipe.image}
                                    created_at={recipe.created_at} />
                            </Grid>
                        );
                    }) : <Alert severity="info">Aucun résultat pour cette recherche.</Alert>}
                </Grid>
                <Pagination page={page} onChange={handlePage} count={Math.round(recipes.length / 3)} color="secondary" />
            </Box>

        </>

    );
}