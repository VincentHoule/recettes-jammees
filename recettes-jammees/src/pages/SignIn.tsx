import { Alert, Backdrop, Box, Button, Card, CircularProgress, Container, CssBaseline, Snackbar, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router";

import Api from "../utils/Api";
import { Error } from "@mui/icons-material";


export default function SignIn() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        signIn: ""
    })

    useEffect(() => {
        setErrors({
            name: "",
            email: "",
            password: "",
            signIn: ""
        })
    }, [])

    const handleValidateName = () => {
        setErrors((prevState) => ({ ...prevState, name: "" }));

        if (name == null) {
            setErrors((prevState) => ({ ...prevState, name: "Veuillez rentrez votre nom de Chef." }));
            return false;
        }
        else if (name.length <= 0) {
            setErrors((prevState) => ({ ...prevState, name: "Votre nom doit contenir au moins 1 caractère." }));
            return false;
        }
        return true;

    }

    const handleValidateEmail = () => {
        setErrors((prevState) => ({ ...prevState, email: "" }));
        if (email == null) {
            setErrors((prevState) => ({ ...prevState, email: "Veuillez rentrez votre addresse courriel." }));

            return false;
        }
        else if (email.length <= 0) {
            setErrors((prevState) => ({ ...prevState, email: "Votre addresse courriel doit contenir au moins 1 caractère." }));

            return false;
        }
        else if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            setErrors((prevState) => ({ ...prevState, email: "Le format de l'adresse courriel est invalide." }));

            return false;
        }
        return true;

    }


    const handleValidatePassword = () => {
        setErrors((prevState) => ({ ...prevState, password: "" }));

        if (password == null) {
            setErrors((prevState) => ({ ...prevState, password: "Veuillez rentrez un mot de passe." }));
            return false;
        }
        else if (password.length <= 5) {
            setErrors((prevState) => ({ ...prevState, password: "Votre mot de passe doit contenir au moins 6 caractère." }));
            return false;
        }
        return true;
    }

    const handleCloseError = () => {
        setErrors((prevState) => ({ ...prevState, signIn: "" }));
    }

    const handleSignIn = () => {
        if (handleValidateEmail() && handleValidateName() && handleValidatePassword()) {
            setLoading(true);

            const formData = new FormData()
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);

            Api.post("/api/user/signIn", formData).then((response) => {
                setLoading(false);
                localStorage.setItem("id", response.data[0].id);
                localStorage.setItem("name", response.data[0].name);
                localStorage.setItem("email", response.data[0].email);
                setRedirect(true);

            }).catch((error) => {
                setLoading(false);
                if (error.response.status === 422) {
                    setErrors((prevState) => ({
                        ...prevState,
                        email: error.response.data.message
                    }))
                }
                else {
                    setErrors((prevState) => ({
                        ...prevState,
                        signIn: "Une erreur est survenu.\n Veuillez réesayer plus tard."
                    }))
                }
            });
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
            <Snackbar open={errors.signIn != ""} autoHideDuration={6000} onClose={handleCloseError}>
                <Alert onClose={handleCloseError} severity="error"
                    sx={{ width: '100%' }} icon={<Error fontSize="inherit" />}>
                    {errors.signIn}
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
                        Inscription
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}
                    >
                        <Typography>Nom de chef</Typography>
                        <TextField
                            type="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Chef Sweedish"
                            onBlur={handleValidateName}
                            error={errors.name.length > 0}
                            helperText={errors.name}
                            autoFocus
                            fullWidth
                            variant="outlined"
                        />
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
                            fullWidth
                            variant="contained"
                            onClick={handleSignIn}
                        >
                            Créer son compte
                        </Button>
                        <Typography variant="caption">OU</Typography>
                        <Button
                            key={"/login"}
                            component={Link}
                            to={"/login"}
                        >
                            Se Connecter
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