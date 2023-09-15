import React from "react";
import '../index.css';
import { Route, Routes} from "react-router-dom";
import AddPage from "./AddPage";
import BucketPage from "./BucketPage";
import DetailPage from "./DetailPage";


const RoutePage = () => {
    return (
        <Routes>
          <Route path="/" element={<AddPage />} /> 
          <Route path="/bucket" element={<BucketPage />} />
          <Route path="/papers/:paperId" element={<DetailPage />} />
        </Routes>
    );
}

export default RoutePage;