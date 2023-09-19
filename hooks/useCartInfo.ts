"use client";

import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";

const useCartInfo = () => {
  const [quantity, setQuantity] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const { cart_products } = useAppSelector((state) => state.cart);

  useEffect(() => {
    const cart = cart_products.reduce(
      (cartTotal, cartItem) => {
        const { price, orderQuantity } = cartItem;
        const itemTotal = price * orderQuantity;
        cartTotal.total += itemTotal;
        cartTotal.quantity += orderQuantity;

        return cartTotal;
      },
      {
        total: 0,
        quantity: 0,
      }
    );
    setQuantity(cart.quantity);
    setTotal(cart.total);
  }, [cart_products]);

  return {
    quantity,
    total,
    setTotal,
  };
};

export default useCartInfo;
