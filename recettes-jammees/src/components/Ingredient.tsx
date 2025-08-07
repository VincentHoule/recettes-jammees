import { useState } from "react";
import type Ingredient from "../interfaces/Ingredient";
import { IconButton, TextField, Typography } from "@mui/material";
import { Check } from "@mui/icons-material";

/**
 * Interface des paramètres du composant
 * @param index position dans le tableau de l'ingrédient
 * @param ingrédient l'ingrédient
 * @param setIngredient la fonction pour changer la valeur d'ingrédient
 */
interface IngredientComponentProps {
    index: number;
    ingredient: Ingredient;
    setIngredient: (a: Ingredient, b: number) => void
}

/**
 * Section ingrédient des formulaires de modification et de création de recette
 * @param props paramètres
 * @returns les champs pour la modification ou la création d'un ingrédient
 */
export default function IngredientComponent(props: IngredientComponentProps) {
    const [ingredientDummy, setIngredientDummy] = useState(props.ingredient)
    const [errors, setErrors] = useState({
        name: "",
        quantity: "",
        unit: "",
    })

    /**
     * Changement de la valeur de l'ingrédient
     */
    const updateIngredient = () => {
        props.setIngredient(ingredientDummy, props.index)
    }

    /**
     * Vérification du champs nom de l'ingrédient
     */
    const handleValidateName = () => {
        setErrors((prevstate) => ({
            ...prevstate, name: ""
        }))
        if (props.ingredient.name == "") {
            setErrors((prevstate) => ({
                ...prevstate, name: "Veuillez inscrire le nom de votre ingrédient."
            }))
        }
    }

    /**
     * Vérification du champs nom de l'ingrédient
     */
    const handleValidateQuantity = (e: any) => {
        setErrors((prevstate) => ({
            ...prevstate, quantity: ""
        }))
        if (e.target.value != 0) {
            if (Number(e.target.value)) {
                setIngredientDummy((prevstate) => ({
                    ...prevstate, quantity: parseFloat(e.target.value)
                }))

            }
            else {
                setErrors((prevstate) => ({
                    ...prevstate, quantity: "Le format des unités doit être un chiffre. Ex : 1, 2, 3.2"
                }))
            }
        }



    }

    return (
        <>
            <TextField
                sx={{ marginTop: "15px" }}
                label="Nom"
                placeholder="Tomate"
                value={ingredientDummy.name}
                onChange={(e) => setIngredientDummy((prevstate) => ({
                    ...prevstate, name: e.target.value
                }))}
                onBlur={handleValidateName}
                error={errors.name.length > 0}
                helperText={errors.name}
                fullWidth
                variant="outlined" />
            <TextField
                sx={{ marginTop: "15px" }}
                label="Quantité"
                defaultValue={ingredientDummy.quantity}
                onBlur={(e) => handleValidateQuantity(e)}
                error={errors.quantity.length > 0}
                helperText={errors.quantity}
                fullWidth
                variant="outlined" />
            <TextField
                sx={{ marginTop: "15px" }}
                label="Unité"
                placeholder="kg, ml, tasse, cuillère à soupe ..."
                value={ingredientDummy.unit}
                onChange={(e) => setIngredientDummy((prevstate) => ({
                    ...prevstate, unit: e.target.value
                }))}
                error={errors.unit.length > 0}
                helperText={errors.unit}
                fullWidth
                variant="outlined" />
            <IconButton
                color="success"
                onClick={updateIngredient}>
                <Check />
            </IconButton>
            <Typography variant="caption">{ingredientDummy != props.ingredient ? "Les modification ne sont pas enregistrées" : ""}</Typography>
        </>
    );
}