import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from '@/libs/LocalStorage';
import { notifyError, notifySuccess } from "@/libs/Toast";
import { Product } from "@/libs/Types";

interface CartProduct extends Product {
  orderQuantity: number;
}
interface CartState {
  cart_products: CartProduct[];
  orderQuantity: number;
  cartMiniOpen: boolean;
}

const initialState: CartState = {
  cart_products: [],
  orderQuantity: 1,
  cartMiniOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add_cart_product: (state, { payload }) => {
      const isExist = state.cart_products.some((i) => i._id === payload._id);
      if (!isExist) {
        const newItem = {
          ...payload,
          orderQuantity: state.orderQuantity,
        };

        state.cart_products.push(newItem);

        notifySuccess(`${state.orderQuantity} ${payload.title} added to cart`);

      } else {
        state.cart_products.map((item) => {
          if (item._id === payload._id) {
            if (item.quantity >= item.orderQuantity + state.orderQuantity) {
              item.orderQuantity =
                state.orderQuantity !== 1
                  ? state.orderQuantity + item.orderQuantity
                  : item.orderQuantity + 1;
              notifySuccess(`${state.orderQuantity} ${item.title} added to cart`);
            } else {
              notifyError("No more quantity available for this product!");
              state.orderQuantity = 1;
            }
          }
          return { ...item };
        });
      }
      setLocalStorage("cart_products", state.cart_products);
    },
    increment: (state, { payload }) => {
      const product = state.cart_products.find((item) => item._id === payload.productId);

      if (product) {
        if (state.orderQuantity < product.quantity) {
          state.orderQuantity += 1;
        }
      }
    },
    decrement: (state, { payload }) => {
      state.orderQuantity =
        state.orderQuantity > 1
          ? state.orderQuantity - 1
          : (state.orderQuantity = 1);
    },
    quantityDecrement: (state, { payload }) => {
      state.cart_products.map((item) => {
        if (item._id === payload._id) {
          if (item.orderQuantity > 1) {
            item.orderQuantity = item.orderQuantity - 1;
          }
        }
        return { ...item };
      });
      setLocalStorage("cart_products", state.cart_products);
    },
    get_cart_products: (state) => {
      state.cart_products = getLocalStorage("cart_products");
    },
    remove_product: (state, { payload }) => {
      state.cart_products = state.cart_products.filter(
        (item) => item._id !== payload.id
      );
      setLocalStorage("cart_products", state.cart_products);
      notifyError(`${payload.title} Remove from cart`);
    },
    initialOrderQuantity: (state) => {
      state.orderQuantity = 1;
    },
    clearCart: (state, { payload }) => {
      const isClearCart = window.confirm('Are you sure you want to remove all items ?');
      if (isClearCart) {
        state.cart_products = []
      }
      setLocalStorage("cart_products", state.cart_products);
    },
    closeCartMini: (state, { payload }) => {
      state.cartMiniOpen = true
    },
    openCartMini: (state, { payload }) => {
      state.cartMiniOpen = false
    },
  },
});

export const {
  add_cart_product,
  increment,
  decrement,
  get_cart_products,
  remove_product,
  quantityDecrement,
  initialOrderQuantity,
  clearCart,
  closeCartMini,
  openCartMini,
} = cartSlice.actions;

export default cartSlice.reducer;
