"use client";

import useCartInfo from '@/hooks/useCartInfo';
import useSticky from '@/hooks/useSticky';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useState } from 'react'

const HeaderHome = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOffCanvasOpen, setIsCanvasOpen] = useState(false);
  const { wishlist } = useAppSelector((state) => state.wishlist);

  const { quantity } = useCartInfo();
  const { sticky } = useSticky();
  const dispatch = useAppDispatch();

  return (
    <>
      <header>

      </header>

      {/* SearchBar */}

      {/* CartSidebar */}

      {/* OffCanvas */}
    </>
  )
}

export default HeaderHome