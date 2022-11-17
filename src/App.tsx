import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import Home from "./pages/Home";
import { ProductProvider } from "./ProductContext";
import styles from "./styles";

function App() {
  return (
    <div className="w-full bg-white">
      <ProductProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </ProductProvider>
    </div>
  );
}

export default App;
