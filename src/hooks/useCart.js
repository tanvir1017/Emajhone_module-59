import { useEffect, useState } from "react";
import { getStoredCart } from "../utilities/fakedb";

const useCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = getStoredCart();
    const keys = Object.keys(savedCart);
    console.log(keys);
    fetch("http://localhost:5000/products/byKeys", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(keys),
    })
      .then((res) => res.json())
      .then((products) => {
        console.log(products);
        if (products.length) {
          const storedCart = [];
          for (const key in savedCart) {
            const addedProduct = products.find(
              (product) => product.key === key
            );
            if (addedProduct) {
              // set quantity
              const quantity = savedCart[key];
              addedProduct.quantity = quantity;
              storedCart.push(addedProduct);
            }
          }
          setCart(storedCart);
        }
      });
  }, []);

  return [cart, setCart];
};

export default useCart;
