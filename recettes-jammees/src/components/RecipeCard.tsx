import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type Recipe from '../interfaces/Recipe';
import { AppBar, Backdrop, Chip, CircularProgress, Container, Dialog, Divider, Grid, IconButton, List, ListItem, ListItemText, Toolbar } from '@mui/material';
import { useState } from 'react';
import { Close } from '@mui/icons-material';
import type Ingredient from '../interfaces/Ingredient';
import type Step from '../interfaces/Step';
import Api from "../utils/Api";

export default function RecipeCard(recipe: Recipe) {
    const [openRecipe, setOpenRecipe] = useState(false);
    const [steps, setSteps] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(false);


    const handleClose = () => {
        setOpenRecipe(false)
    }

    const handleOpen = () => {
        setLoading(true);

        Api.get(`/api/recipe/details/${recipe.id}`).then((response) => {
            setOpenRecipe(true);
            setSteps(response.data.steps);
            setIngredients(response.data.ingredients);
            setLoading(false);


        }).catch((_) => {
            setLoading(false);

        })
    }

    return (
        <>
            {/*Chargement de l'information*/}
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
            >
                <CircularProgress />
            </Backdrop>
            <Card sx={{ maxWidth: 345, }}>
                <CardMedia
                    sx={{ height: 200 }}
                    image={recipe.image == null ? "../../public/plat.jpg" : recipe.image}
                    title={recipe.name}
                />
                <CardContent sx={{display:'flex', flexDirection:"column"}}>
                    <Container sx={{marginBottom:"5px"}}>
                        <Typography gutterBottom component="div">
                            {recipe.name.length <= 18 ? recipe.name: (recipe.name.slice(0, 20) + "...")}
                        </Typography>
                    </Container>
                    <Container>
                        <Typography gutterBottom variant="body2" >
                            {recipe.description.length <= 18 ? recipe.description: (recipe.description.slice(0, 20) + "...")}
                        </Typography>
                        <Container disableGutters sx={{display:"flex", gap : "50px", justifyContent: "center"}}>
                            <Chip color='secondary' label={recipe.category} variant="outlined" />

                            <Typography variant="caption">
                                {recipe.created_at.split(' ')[0]}
                            </Typography>
                        </Container>
                    </Container>
                </CardContent>
                <CardActions sx={{display:"flex", flexDirection:"row-reverse"}}>
                    <Button variant="outlined" color='primary' onClick={handleOpen} size="small">Consulter</Button>
                </CardActions>
            </Card >

            <Dialog
                fullScreen
                open={openRecipe}
                onClose={handleClose}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <Close />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {recipe.name}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container >
                    <Container>
                        <Typography>{recipe.name}</Typography>
                        <Typography>{recipe.description}</Typography>
                        <CardMedia
                            sx={{ height: 200 }}
                            image={recipe.image == null ? "../../public/plat.jpg" : recipe.image}
                            title={recipe.name}
                        />
                    </Container>
                    <Container>
                        <Container>
                            <Typography variant='h6'>Ingrédients</Typography>
                            <List >
                                {ingredients.length != 0 ? ingredients.map((ingredient: Ingredient) => {
                                    return (
                                        <>
                                            <ListItem key={ingredient.id}>
                                                <ListItemText primary={ingredient.name} />
                                                <ListItemText primary={ingredient.unit == null ?
                                                    ingredient.quantity :
                                                    `${ingredient.quantity} ${ingredient.unit}`} />
                                            </ListItem>
                                            <Divider component="li" />
                                        </>
                                    )
                                }) : <Typography>Désolé, il n'y a pas d'ingrédient listé.</Typography>}
                            </List>
                        </Container>
                        <Container>
                            <Typography variant='h6'>Étapes</Typography>
                            <List >
                                {steps.length != 0 ? steps.map((step: Step) => {
                                    return (
                                        <>
                                            <ListItem key={step.id}>
                                                <ListItemText primary={step.position} />
                                                <ListItemText primary={step.description} />
                                            </ListItem>
                                            <Divider component="li" />
                                        </>
                                    )
                                }) : <Typography>Désolé, il n'y a pas d'étape de listée,</Typography>}
                            </List>
                        </Container>
                    </Container>
                </Container>
            </Dialog>
        </>
    )
}