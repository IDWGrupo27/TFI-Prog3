import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import passport from "passport";

// rutas
import reclamos from "./routes/reclamosRoutes.js";
import reclamosTipo from "./routes/reclamosTipoRoutes.js";
import usuarios from "./routes/usuariosRoutes.js";
import oficinas from "./routes/oficinasRoutes.js";
import autorizacion from './routes/authRoutes.js';

// middleware
import validateContentType from "./middleware/validateContentType.js";

// passport
import { estrategia, validacion } from './config/passport.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(validateContentType);

passport.use(estrategia);
passport.use(validacion);
app.use(passport.initialize());

app.use("/api/inicio-sesion", autorizacion);
app.use("/api/reclamos", passport.authenticate('jwt', {session:false}), reclamos);
app.use("/api/reclamos-tipo", passport.authenticate('jwt', {session:false}), reclamosTipo);
app.use("/api/usuarios", passport.authenticate('jwt', {session:false}), usuarios);
app.use("/api/oficinas", passport.authenticate('jwt', {session:false}), oficinas);


app.listen(process.env.PUERTO, () => {
    console.log(`Servidor web corriendo en http://localhost:${process.env.PUERTO}`);
});
