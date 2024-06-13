import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { PRODUCTS } from "./product";

function Main() {
  const [cartItems, setCartItems] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  });

  const [searchQuery, setSearchQuery] = useState("");

  const addToCart = (id) => {
    setCartItems((cartItems) => ({ ...cartItems, [id]: cartItems[id] + 1 }));
  };

  const subFromCart = (id) => {
    setCartItems((cartItems) => ({ ...cartItems, [id]: cartItems[id] - 1 }));
  };

  const removeFromCart = (id) => {
    setCartItems((cartItems) => ({ ...cartItems, [id]: 0 }));
  };

  const totalAmount = () => {
    let amount = 0;
    for (const key in cartItems) {
      if (cartItems[key] > 0) {
        let productInfo = PRODUCTS.find(
          (product) => product.id === Number(key)
        );
        amount += Math.floor(cartItems[key] * productInfo.price);
      }
    }
    return amount;
  };

  const filteredProducts = PRODUCTS.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-wrap justify-center items-center gap-20 p-10 pr-96">
      <div className="w-full mb-8 relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for products..."
          className="border p-2 rounded-lg w-full pl-10"
        />
        <IoSearchOutline className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          return (
            <div key={product.id} className="border p-4 rounded-lg">
              <img
                className="w-40 h-40 mx-auto"
                src={product.productImage}
                alt={product.productName}
              />
              <h3 className="text-lg font-semibold text-center mt-2">
                {product.productName}
              </h3>
              <p className="text-center">${product.price}</p>
              <button
                onClick={() => addToCart(product.id)}
                className="border-2 bg-[#6331f7] font-mono hover:bg-[#03fcca] text-white drop-shadow-2xl font-bold py-2 px-4 rounded-xl mt-4 w-full"
              >
                Add To Cart
              </button>
            </div>
          );
        })}
      </div>
      <div className="fixed p-4 right-0 top-0 bg-blue-100 h-screen w-80">
        <h1 className="text-[#03fcca] font-bold text-2xl">Your Cart</h1>
        <p className="text-3xl font-bold">Total: ${totalAmount()}</p>
        <div className="cart-items-container mt-4">
          {PRODUCTS.map((product) => {
            if (cartItems[product.id] > 0) {
              return (
                <div
                  key={product.id}
                  className="mb-4 justify-center items-center flex gap-4 p-4 bg-[#eeecec] rounded-xl shadow-xl"
                >
                  <p className="flex items-center space-x-2">
                    <img
                      className="w-auto h-20"
                      src={product.productImage}
                      alt=""
                    />
                    <span className="w-20 lg:w-auto text-2xl font-bold">
                      x {cartItems[product.id]}
                    </span>
                  </p>
                  <div className="flex flex-col gap-2 font-bold bg-gray-200 rounded-md">
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="border bg-[#6331f7] font-mono hover:bg-[#f73149] text-white drop-shadow-2xl font-bold py-2 px-4 rounded-xl mt-2"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="text-green-500 text-2xl hover:text-green-700"
                    >
                      +
                    </button>
                    <button
                      onClick={() => subFromCart(product.id)}
                      className="text-[#f73149] text-2xl hover:text-red-700"
                    >
                      -
                    </button>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}

export default Main;
