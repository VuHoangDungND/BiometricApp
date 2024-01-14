//Pages
import Home from "../pages/Home";
import Register from "../pages/Register";
import LoginWithFinger from "../pages/LoginWithFinger";
import LoginWithFace from "../pages/LoginWithFace";
import Delete from "../pages/Delete";
import ShowData from "../pages/ShowData";
import LoginAll from "../pages/LoginAll"

//public routes
const publicRoutes = [
    { name: "Home" , component: Home},
    { name: "Register", component: Register},
    { name: "LoginWithFace", component: LoginWithFace},
    { name: "LoginWithFinger", component: LoginWithFinger},
    { name: "Delete" , component: Delete},
    { name: "ShowData" , component: ShowData},
    { name: "LoginAll" , component: LoginAll},
]

export {publicRoutes};