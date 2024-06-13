import React from "react";
import { PRODUCTS } from "./product";
function Main() {
  return (
    <div className="flex flex-wrap justify-center">
      {PRODUCTS.map((product) => {
        return (
          <div key={product.id}>
            <img
              className="w-40 h-40"
              src={product.productImage}
              alt={product.productName}
            />
            <h3>{product.productName}</h3>
            <p>${product.price}</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add To Cart
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Main;
