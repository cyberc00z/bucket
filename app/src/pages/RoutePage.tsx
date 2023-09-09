import React from "react";
import '../index.css';
import { Routes, Route} from "react-router-dom";
import AddPage from "./AddPage";
import BucketPage from "./BucketPage";


const RoutePage = () => {
    return (
     <Routes>
       <Route path="/" element={<AddPage />} /> 
       <Route path="/bucket" element={<BucketPage />} />
     </Routes>
    );
}

export default RoutePage;