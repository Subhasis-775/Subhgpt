import React from "react";
import {BrowserRouter,Routes,Route}  from  'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Chat from './pages/Chat.jsx';

const Approutes=()=>{
    return(
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/chat' element={
                        <ProtectedRoute>
                            <Chat/>
                        </ProtectedRoute>
                    }/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )   
}
export default Approutes;