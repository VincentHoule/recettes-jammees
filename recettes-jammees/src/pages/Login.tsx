import { Box, Button, Card, Container, CssBaseline, FormControl, FormLabel, TextField, Typography } from "@mui/material";
import { Link } from "react-router";


export default function Login() {

    return (
        <>
            <CssBaseline />
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
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                id="email"
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                autoComplete="email"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Mot de passe</FormLabel>
                            <TextField
                                name="mot de passe"
                                placeholder="••••••"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                            />
                        </FormControl>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Se Connecter
                        </Button>
                        <Typography variant="caption">OU</Typography>
                        <Button
                            key={"/"}
                            component={Link}
                            to={"/"}
                        >
                            Continuer en étant déconnecté.
                        </Button>

                    </Box>
                </Card>
            </Container>

        </>
    );
}