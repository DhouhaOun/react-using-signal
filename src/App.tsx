import Product from "./components/Product.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Products from "./components/Products.tsx";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import DashBoard from "./components/DashBoard.tsx";
import NavBar from "./components/NavBar.tsx";
import {useState} from "react";
export default function App(){
    return(
        <div>
            <BrowserRouter>
                <NavBar></NavBar>
                <DashBoard></DashBoard>
                <Routes>
                    <Route path="/home" element={<Product/>}></Route>
                    <Route path="/products" element={<Products/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}