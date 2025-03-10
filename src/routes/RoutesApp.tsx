import {Routes, Route, Navigate} from "react-router-dom";

import Signup from "../pages/Signup";
import { Home } from "../pages/Home";
import Login from "../pages/Login";
import { AddReserve } from "../pages/AddReserve";
import { Reserves } from "../pages/Reserves";
import { Reports } from "../pages/Reports";


export const RoutesApp = () => {
    return(
        <div>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={ <Login /> } />
                <Route path="/home" element={ <Home /> } />
                <Route path="/register" element={ <Signup /> } />
                <Route path="/add" element={ <AddReserve /> } />
                <Route path="/reserves" element={ <Reserves /> } />
                <Route path="/rel" element={ <Reports /> } />
            </Routes>
        </div>
    )
}