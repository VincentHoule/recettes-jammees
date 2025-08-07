import { useState } from "react";
import { Container, IconButton, TextField, Typography } from "@mui/material";
import { Check } from "@mui/icons-material";
import type Step from "../interfaces/Step";

/**
 * Interface des paramètres du composant
 * @param index position dans le tableau de l'étape
 * @param step l'étape
 * @param setStep la fonction pour changer la valeur de l'étape
 */
interface StepComponentProps {
    index: number;
    step: Step;
    setStep: (a: Step, b: number) => void
}

/**
 * Section étape des formulaires de modification et de création de recette
 * @param props paramètres
 * @returns les champs pour la modification ou la création d'une étape
 */
export default function StepComponent(props: StepComponentProps) {
    const [stepDummy, setStepDummy] = useState(props.step)
    const [descriptionError, setDescriptionError] = useState("")

    /**
     * Changement de la valeur de l'étape
     */
    const updateStep = () => {
        props.setStep(stepDummy, props.index)
    }

    /**
     * Valide la description
     */
    const handleValidateDescription = () => {
        setDescriptionError("");
        if (stepDummy.description.length == 0) {
            setDescriptionError("Vous devez avoir une description");
        }
    }


    return (
        <>
            <Container sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Typography sx={{ marginRight: "10px" }}>{stepDummy.position}-</Typography>
                <TextField

                    label="Description"
                    placeholder="Mélanger à feux doux"
                    value={stepDummy.description}
                    onChange={(e) => setStepDummy((prevstate) => ({
                        ...prevstate, description: e.target.value
                    }))}
                    onBlur={handleValidateDescription}
                    error={descriptionError.length > 0}
                    helperText={descriptionError}
                    fullWidth
                    variant="outlined" />
            </Container>

            <IconButton
                color="success"
                onClick={updateStep}>
                <Check />
            </IconButton>
            <Typography variant="caption">
                {stepDummy != props.step ? "Les modification ne sont pas enregistrées" : ""}
            </Typography>
        </>
    );
}