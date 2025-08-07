import { Alert, Box, Button, CardMedia, Container, CssBaseline, FormControlLabel, IconButton, Radio, RadioGroup, Snackbar, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type Ingredient from "../interfaces/Ingredient";
import { Add, CheckCircleOutline, Error, Remove } from "@mui/icons-material";
import IngredientComponent from "../components/Ingredient";
import { Link, useParams } from "react-router";
import StepComponent from "../components/Step";
import Api from "../utils/Api";
import type Step from "../interfaces/Step";
import Loading from "../components/Loading";

/**
 * Valeur par défault d'un ingrédient
 */
const ingredientDummy = {
    id: 0,
    name: "",
    quantity: 0,
    unit: "",
    recipe_id: 0
}


/**
 * Fonction qui affiche le formulaire de modification d'une recette
 * @returns le formulaire de modification
 */
export default function ModifyRecipe() {

    const exampleDescription = "Pâtisseries empoisonnées \nLes beignets mortels \nMoui \nMacarons foudroyants \nPas mal \nTarte au venin de vipère \nClassique \nClafoutis au curare \nBof \nHaaa le pudding à l'arsenic \nOh oui!\nDans un grand bol de strychnine \nDélayez de la morphine \nFaites tiédir à la casserole \nUn bon verre de pétrole \nHo ho, je vais en mettre deux \nQuelques gouttes de  ... "

    // Donnée de la recette
    const { id } = useParams()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [url, setUrl] = useState("")
    const [ingredients, setIngredients] = useState<Array<Ingredient>>([])
    const [steps, setSteps] = useState<Array<Step>>([])

    const [loading, setLoading] = useState(false)

    // Élément du popup d'information
    const [info, setInfo] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");
    const [icon, setIcon] = useState<React.JSX.Element>(<Error fontSize='inherit' />);
    const [color, setColor] = useState("");

    const [errors, setErrors] = useState({
        name: "",
        description: "",
        url: "",
        ingredients: "",
        steps: "",
        create: ""
    })

    /**
     * Valeur de la recette à modifier
     */
    useEffect(() => {
        setLoading(true);
        Api.get(`/api/recipe/details/${id}`).then((response) => {
            setSteps(response.data.step);
            setIngredients(response.data.ingredient);
            setName(response.data.recipe.name)
            setDescription(response.data.recipe.description)
            setCategory(response.data.recipe.category)
            setUrl(response.data.recipe.image)
            setLoading(false);

        }).catch((_) => {
            setLoading(false);
            setColor("error");
            setIcon(<Error fontSize='inherit' />)
            setInfoMessage("Les informations de la recette n'ont pas été récupérées. ")
            setInfo(true)
        })
    }, []);

    /**
     * Actualise l'ordre des étapes
     */
    useEffect(() => {
        if (steps != undefined) {
            const stepsDummy: Array<Step> | undefined = steps.map((step, index) => {
                step.position = index + 1
                return step
            });
            setSteps(stepsDummy)
        }
    }, [steps.length])

    /**
     * Ferme le popup d'information
     */
    const handleCloseInfo = () => {
        setInfo(false);
    }


    /**
     * Fonction qui modifie les valeurs de l'ingrédient
     * @param ingredientNew nouvelles valeurs de l'ingrédient
     * @param indexNew position dans le tableau de l'ingrédient
     */
    const updateIngredient = (ingredientNew: Ingredient, indexNew: number) => {
        if (ingredients != undefined) {

            const ingredientsDummy: Array<Ingredient> | undefined = ingredients.map((ingredient, index) => {
                if (index === indexNew) {
                    return ingredientNew
                } else {
                    return ingredient;
                }
            });
            setIngredients(ingredientsDummy)
        }
    }

    /**
     * Ajoute un ingrédient au formulaire
     */
    const addIngredient = () => {
        if (ingredients != undefined) {
            setIngredients([...ingredients, ingredientDummy])
        }
    }

    /**
     * Fonction qui modifie la valeur de l'étape
     * @param stepNew nouvelle valeur de l'étape
     * @param indexNew position de l'étape dans le tableau
     */
    const updateStep = (stepNew: Step, indexNew: number) => {
        if (steps != undefined) {
            const stepsDummy: Array<Step> | undefined = steps.map((step, index) => {
                if (index === indexNew) {
                    stepNew.position = index + 1
                    return stepNew
                } else {
                    step.position = index + 1

                    return step;
                }
            });
            setSteps(stepsDummy)
        }
    }

    /**
     * Ajoute une étape au formulaire
     */
    const addStep = () => {
        if (steps != undefined) {
            setSteps([...steps, {
                id: 0,
                description: "",
                position: 0,
                recipe_id: 0,
            }])
        }
    }

    /**
     * Validation du nom de la recette
     * @returns bool s'il est valide
     */
    const handleValidateName = () => {
        setErrors((prevstate) => ({ ...prevstate, name: "" }))

        if (name.length <= 0) {
            setErrors((prevState) => ({ ...prevState, name: "Le nom de votre recette doit contenir au moins 1 caractère." }));
            return false;
        }
        return true
    }

    /**
     * Validation de la description de la recette
     * @returns bool s'il est valide
     */
    const handleValidateDescription = () => {
        setErrors((prevstate) => ({ ...prevstate, description: "" }))

        if (description.length <= 0) {
            setErrors((prevState) => ({ ...prevState, description: "La description de votre recette doit contenir au moins 1 caractère." }));
            return false;
        }
        return true

    }

    /**
     * Validation de la catégorie de la recette
     * @returns bool s'il est valide
     */
    const handleValidateCategory = () => {
        setErrors((prevstate) => ({ ...prevstate, category: "" }))

        if (category.length <= 0) {
            setErrors((prevState) => ({ ...prevState, category: "Veuillez choisir une catégorie." }));
            return false;
        }
        return true

    }

    /**
     * Validation de l'url de l'image de la recette
     * @returns bool s'il est valide
     */
    const handleValidateUrl = () => {
        setErrors((prevstate) => ({ ...prevstate, url: "" }))

        if (url == null || url.length <= 0) {
            setErrors((prevState) => ({ ...prevState, url: "Veuillez choisir une image." }));
            return false;
        }
        return true

    }

    /**
     * Validation des ingrédients de la recette
     * @returns bool s'il est valide
     */
    const handleValidateIngredients = () => {
        setErrors((prevstate) => ({ ...prevstate, ingredients: "" }))
        ingredients.map((ingredient: Ingredient) => {
            if (ingredient.name == "") {
                setErrors((prevstate) => ({
                    ...prevstate,
                    ingredients: "Le nom des ingredients ne pas être vide."
                }))
                return false;
            }
            else if (ingredient.quantity <= 0) {
                setErrors((prevstate) => ({
                    ...prevstate,
                    ingredients: "La quantitée des ingredients ne pas être en-dessous de 0."
                }))
                return false;
            }
        })
        return true

    }

     /**
     * Validation des étapes de la recette
     * @returns bool s'il est valide
     */
    const handleValidateSteps = () => {
        setErrors((prevstate) => ({ ...prevstate, steps: "" }))
        steps.map((step: Step) => {
            if (step.description == "") {
                setErrors((prevstate) => ({
                    ...prevstate,
                    steps: "La description des étapes ne peut pas être vide."
                }))
                return false;
            }
        })
        return true

    }

    /**
     * Gère la modification de la recette
     */
    const handleModifyRecipe = () => {

        // Validation des champs
        if (handleValidateName() && handleValidateCategory() && handleValidateDescription()
            && handleValidateIngredients() && handleValidateSteps() && handleValidateUrl()) {
            const user_id = localStorage.getItem("id");
            
            // Paramètres
            const formData = new FormData()
            if (id != undefined) {
                formData.append("id", id);
                formData.append("name", name);
                formData.append("description", description);
                formData.append("category", category);
                if (url != null)
                    formData.append("image", url);
                if (user_id != null)
                    formData.append("user_id", user_id);
                formData.append("steps", JSON.stringify(steps || []));
                formData.append("ingredients", JSON.stringify(ingredients));

                setLoading(true)
                // requête
                Api.post(`/api/recipe/updateRecipe`, formData).then((_) => {
                    // retour utilisateur
                    setColor("success");
                    setIcon(<CheckCircleOutline fontSize='inherit' />)
                    setInfoMessage("La modification de la recette a réussit. ")
                    setInfo(true)
                    setLoading(false)

                }).catch((_) => {
                    // retour utilisateur
                    setColor("error");
                    setIcon(<Error fontSize='inherit' />)
                    setInfoMessage("La modification de la recette a échoué. ")
                    setInfo(true)
                    setLoading(false)
                })
            }
            else {
                setIcon(<Error fontSize='inherit' />)
                setInfoMessage("Vous êtes considérés comme déconnecté. Veuillez-vous reconnecter. ")
                setInfo(true)
                setLoading(false)
            }

        }
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
            <Container>
                <Button
                    variant="contained"
                    key={"/myRecipes"}
                    component={Link}
                    to={"/myRecipes"}>
                    Retour au profile</Button>
                <Typography variant="h2">Modifier la recette</Typography>
                <Container>
                    <Typography>Nom</Typography>
                    <TextField
                        placeholder="Macarons foudroyants"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={handleValidateName}
                        error={errors.name.length > 0}
                        helperText={errors.name}
                        fullWidth
                        variant="outlined" />
                </Container>
                <Container>
                    <Typography>Description</Typography>
                    <TextField
                        placeholder={exampleDescription}
                        type="text"
                        multiline
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onBlur={handleValidateDescription}
                        error={errors.description.length > 0}
                        helperText={errors.description}
                        fullWidth
                        variant="outlined" />
                </Container>
                <Container>
                    <RadioGroup
                        row
                        name="radio-group-category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <FormControlLabel value="repas" control={<Radio />} label="Repas" />
                        <FormControlLabel value="dessert" control={<Radio />} label="Dessert" />
                        <FormControlLabel value="breuvage" control={<Radio />} label="Breuvage" />
                    </RadioGroup>
                </Container>
                <Container>
                    <Typography>Url de l'image</Typography>
                    <TextField
                        placeholder="https://example.jpg"
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onBlur={handleValidateUrl}
                        error={errors.url.length > 0}
                        helperText={errors.url}
                        fullWidth
                        variant="outlined" />
                    <CardMedia />
                </Container>
                <Container>
                    <Typography>Ingrédients</Typography>
                    <Typography color="error" variant="caption">{errors.ingredients}</Typography>
                    <Container>
                        {ingredients == undefined || ingredients.map((ingredient: Ingredient, index) => {
                            return (
                                <Box sx={{
                                    padding: "15px",
                                    margin: "5px",
                                    borderRadius: "5px",
                                    backgroundColor: "secondary.dark"
                                }} key={crypto.randomUUID()}>
                                    <IngredientComponent index={index} ingredient={ingredient} setIngredient={updateIngredient} />
                                    <IconButton color="error" onClick={() => {
                                        setIngredients(
                                            ingredients.filter(a =>
                                                a !== ingredient
                                            )
                                        );

                                    }}>
                                        <Remove />
                                    </IconButton>
                                </Box>
                            );
                        })}
                        <IconButton color="primary" onClick={addIngredient}>
                            <Add />
                        </IconButton>
                    </Container>

                </Container>
                <Container>
                    <Typography>Étapes</Typography>
                    <Typography color="error" variant="caption">{errors.steps}</Typography>
                    <Container>
                        {steps == undefined || steps.map((step: Step, index) => {
                            return (
                                <Box sx={{
                                    padding: "15px",
                                    margin: "5px",
                                    borderRadius: "5px",
                                    backgroundColor: "secondary.dark"
                                }} key={crypto.randomUUID()}>
                                    <StepComponent index={index} step={step} setStep={updateStep} />
                                    <IconButton color="error" onClick={() => {
                                        setSteps(
                                            steps.filter(a =>
                                                a !== step
                                            ))
                                    }}>
                                        <Remove />
                                    </IconButton>
                                </Box>
                            );
                        })}
                        <IconButton color="primary" onClick={addStep}>
                            <Add />
                        </IconButton>
                    </Container>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleModifyRecipe}>Modifier</Button>
                </Container>
            </Container>
        </>
    );

}