//Pages
import Home from "../pages/Home";
import Register from "../pages/Register";
import LoginAll from "../pages/LoginAll";
import LoginWithFinger from "../pages/LoginWithFinger";
import LoginWithFace from "../pages/LoginWithFace";

//public routes
const publicRoutes = [
    { name: "Home" , component: Home},
    { name: "Register", component: Register},
    { name: "LoginAll", component: LoginAll},
    { name: "LoginWithFace", component: LoginWithFace},
    { name: "LoginWithFinger", component: LoginWithFinger},
]

export {publicRoutes};