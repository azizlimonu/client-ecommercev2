"use client";

import useAuthCheck from '@/hooks/useAuth';
import {
  get_cart_products,
  initialOrderQuantity
} from '@/redux/features/cartSlice';
import { get_compare_products } from '@/redux/features/compareSlice';
import { get_wishlist_products } from '@/redux/features/wishlistSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react'
import Loader from '../loader/Loader';
import { ToastContainer } from 'react-toastify';
import BackToTopComp from '../common/BackToTop';
import ProductModal from '../common/ProductModal';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { productItem } = useAppSelector((state) => state.productModal);
  const dispatch = useAppDispatch();
  const authChecked = useAuthCheck();

  useEffect(() => {
    dispatch(get_cart_products());
    dispatch(get_wishlist_products());
    dispatch(get_compare_products());
    dispatch(initialOrderQuantity())
  }, [dispatch]);

  return !authChecked ? (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <Loader spinner="fade" loading={!authChecked} />
    </div>
  ) : (
    <div id='wrapper'>
      {children}
      <BackToTopComp />
      <ToastContainer />
      {productItem && <ProductModal />}
    </div>
  )
}

export default Wrapper