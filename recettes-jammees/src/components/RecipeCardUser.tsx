import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type Recipe from '../interfaces/Recipe';
import { Alert, AppBar, Chip, Container, Dialog, Divider, IconButton, List, ListItem, ListItemText, Snackbar, Toolbar } from '@mui/material';
import { useState } from 'react';
import { CheckCircleOutline, Close, Error } from '@mui/icons-material';
import type Ingredient from '../interfaces/Ingredient';
import type Step from '../interfaces/Step';
import Api from "../utils/Api";
import Loading from './Loading';
import { Link } from 'react-router';

/**
 * Paramètre de la carte recette utilisateur
 * @param recipe Recette
 * @param handleDelete Fonction qui donne un retour utilisateur de la suppression
 */
interface RecipeCardUserProps {
    recipe: Recipe,
    handleDelete: (recipe: Recipe) => void
}

/**
 * Fonction qui affiche une carte de recette qui appartient à son utilisateur
 * @param props Paramètres
 * @returns carte recette de l'utilisateur
 */
export default function RecipeCardUser(props: RecipeCardUserProps) {
    const [openRecipe, setOpenRecipe] = useState(false);
    const [steps, setSteps] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");
    const [icon, setIcon] = useState<React.JSX.Element>(<Error fontSize='inherit' />);
    const [color, setColor] = useState("");

    /**
      * Ferme la recette en détail
      */
    const handleClose = () => {
        setOpenRecipe(false)
    }

    /**
     * Ferme la popup du retour utilisateur
     */
    const handleCloseInfo = () => {
        setInfo(false)
    }

    /**
     * Ouvre la recette en détail
     */
    const handleOpen = () => {
        setLoading(true);

        Api.get(`/api/recipe/details/${props.recipe.id}`).then((response) => {
            setOpenRecipe(true);
            setSteps(response.data.step);
            setIngredients(response.data.ingredient);
            setLoading(false);

        }).catch((_) => {
            setLoading(false);
            setColor("error");
            setIcon(<Error fontSize='inherit' />)
            setInfoMessage("La consultation de la recette a échoué. Veuillez réessayer plus tard.")
            setInfo(true)


        })
    }

    /**
     * Supprime la carte et la recette
     */
    const handleDelete = () => {
        setLoading(true)
        Api.delete(`/api/recipe/delete/${props.recipe.id}`).then((_) => {
            setLoading(false);

        }).catch((_) => {
            setLoading(false);
            setColor("error");
            setIcon(<Error fontSize='inherit' />)
            setInfoMessage("La suppression de la recette a échoué. Veuillez réessayer plus tard.")
            setInfo(true)
        })
        props.handleDelete(props.recipe)
    }


    return (
        <>
            {/*Chargement de l'information*/}
            <Loading loading={loading} />
            <Snackbar open={info} autoHideDuration={6000} onClose={handleCloseInfo}>
                <Alert onClose={handleCloseInfo} severity={color == "success" ? "success" : "error"}
                    sx={{ width: '100%' }} icon={icon}>
                    {infoMessage}
                </Alert>
            </Snackbar>
            <Card sx={{ width: "325px" }}>
                <CardMedia
                    sx={{ height: 200 }}
                    image={props.recipe.image == null ? "../../public/plat.jpg" : props.recipe.image}
                    title={props.recipe.name}
                />
                <CardContent sx={{ display: 'flex', flexDirection: "column" }}>
                    <Container sx={{ marginBottom: "5px" }}>
                        <Typography gutterBottom component="div">
                            {props.recipe.name.length <= 18 ? props.recipe.name : (props.recipe.name.slice(0, 20) + "...")}
                        </Typography>
                    </Container>
                    <Container>
                        <Typography gutterBottom variant="body2" >
                            {props.recipe.description.length <= 18 ? props.recipe.description : (props.recipe.description.slice(0, 20) + "...")}
                        </Typography>
                        <Container disableGutters sx={{ display: "flex", gap: "50px", justifyContent: "center" }}>
                            <Chip color='secondary' label={props.recipe.category} variant="outlined" />

                            <Typography variant="caption">
                                {props.recipe.created_at.split(' ')[0]}
                            </Typography>
                        </Container>
                    </Container>
                </CardContent>
                <CardActions sx={{ display: "flex", flexDirection: "row-reverse", justifyContent: "space-between" }}>
                    <Button variant="outlined" color='error' onClick={handleDelete} size="small">Supprimer</Button>
                    <Button
                        variant="outlined"
                        color='secondary'
                        key={`/modifyRecipe/${props.recipe.id}`}
                        component={Link}
                        to={`/modifyRecipe/${props.recipe.id}`}
                        size="small">
                        Modifier
                    </Button>
                    <Button variant="outlined" color='primary' onClick={handleOpen} size="small">Consulter</Button>
                </CardActions>
            </Card >

            {/*Page de consultation en détail de la recette */}
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
                            {props.recipe.name}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container >
                    <Container>
                        <Typography>{props.recipe.name}</Typography>
                        <Typography>{props.recipe.description}</Typography>
                        <CardMedia
                            sx={{ height: 200 }}
                            image={props.recipe.image == null ? "../../public/plat.jpg" : props.recipe.image}
                            title={props.recipe.name}
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