import { Alert, Backdrop, Box, Button, Card, CircularProgress, Container, CssBaseline, Snackbar, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router";
import { Error } from "@mui/icons-material";
import Api from "../utils/Api";

/**
 * Page de connexion d'un utilisateur
 * @returns page de connexion
 */
export default function Login() {
    // Valeur des champs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        login: ""
    })

    /**
     * Réinitialiser en jour les erreurs
     */
    useEffect(() => {
        setErrors({
            email: "",
            password: "",
            login: ""
        })
    }, [])

    /**
     * Validation du champs courriel
     * @returns bool s'il est valide
     */
    const handleValidateEmail = () => {
        setErrors((prevState) => ({ ...prevState, email: "" }));

        if (email == null) {
            setErrors((prevState) => ({ ...prevState, email: "Veuillez rentrez votre addresse courriel." }));
            return false;
        }
        else if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            setErrors((prevState) => ({ ...prevState, email: "Votre addresse courriel contient des erreurs." }));
            return false;
        }
        return true;
    }

    /**
     * Validation du champs mot de passe
     * @returns bool s'il est valide
     */
    const handleValidatePassword = () => {
        setErrors((prevState) => ({ ...prevState, password: "" }));

        if (password == null) {
            setErrors((prevState) => ({ ...prevState, password: "Veuillez rentrez votre mot de passe." }));
            return false;
        }
        return true;
    }

    /**
     * Fermer le retour utilisateur
     */
    const handleCloseError = () => {
        setErrors((prevState) => ({ ...prevState, login: "" }));
    }

    /**
     * Gère la connexion
     */
    const handleLogin = () => {

        // Validation des champs
        if (handleValidateEmail() && handleValidatePassword()) {
            setLoading(true);

            // paramètres
            const formData = new FormData()
            formData.append("email", email);
            formData.append("password", password);

            // requête
            Api.post("/api/user/login", formData).then((response) => {
                setLoading(false);
                localStorage.setItem("id", response.data[0].id);
                localStorage.setItem("name", response.data[0].name);
                localStorage.setItem("email", response.data[0].email);
                setRedirect(true);


            }).catch((error) => {
                setLoading(false);

                if (error.response.status === 500) {
                    setErrors((prevState) => ({
                        ...prevState,
                        login: "Une erreur est survenu.\n Veuillez réesayer plus tard."
                    }))
                }
                else if (error.response.status == 401) {
                    setErrors((prevState) => ({
                        ...prevState,
                        email: error.response.data.email,
                        password: error.response.data.password
                    }))

                }
                else {
                    setErrors((prevState) => ({
                        ...prevState,
                        login: "Une erreur est survenu.\n Veuillez réesayer plus tard."
                    }))
                }

            })
        }

    }

    return (
        <>
            <CssBaseline />
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
            >
                <CircularProgress />
            </Backdrop>
            {!redirect || <Navigate to="/" />}
            <Snackbar open={errors.login != ""} autoHideDuration={6000} onClose={handleCloseError}>
                <Alert onClose={handleCloseError} severity="error"
                    sx={{ width: '100%' }} icon={<Error fontSize="inherit" />}>
                    {errors.login}
                </Alert>
            </Snackbar>
            <Container disableGutters sx={{
                margin: 0,
                padding: 0,
                height: '100vh',
                minWidth: '100vw',
                display: "flex",
                alignItems: "center",
                flexDirection: "row"
            }}>
                <Box padding={0} width={"60vw"} height={"100%"} bgcolor={"secondary.main"} />
                <Card sx={{ padding: "5em 3em 8em 3em", width: "40vw" }} >
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Se connecter
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}
                    >
                        <Typography>Courriel</Typography>
                        <TextField
                            type="email"
                            name="email"
                            placeholder="ton@courriel.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            onBlur={handleValidateEmail}
                            error={errors.email.length > 0}
                            helperText={errors.email}
                            autoFocus
                            fullWidth
                            variant="outlined"
                        />
                        <Typography >Mot de passe</Typography>
                        <TextField
                            placeholder="••••••"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={handleValidatePassword}
                            error={errors.password.length > 0}
                            helperText={errors.password}
                            autoFocus
                            fullWidth
                            variant="outlined"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={handleLogin}

                        >
                            Se Connecter
                        </Button>
                        <Typography variant="caption">OU</Typography>
                        <Button
                            key={"/signIn"}
                            component={Link}
                            to={"/signIn"}
                        >
                            S'Inscrire
                        </Button>
                        <Button
                            sx={{ textTransform: "none" }}
                            color="secondary"
                            key={"/"}
                            component={Link}
                            to={"/"}
                        >
                            Continuer en étant déconnecté
                        </Button>
                    </Box>
                </Card>
            </Container>


        </>
    );
}