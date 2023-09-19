"use client";

import { useEffect, useState } from "react";

const useSticky = (): { sticky: boolean } => {
  const [sticky, setSticky] = useState<boolean>(false);

  const stickyHeader = () => {
    if (window.scrollY > 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', stickyHeader);
    return () => {
      window.removeEventListener('scroll', stickyHeader);
    };
  }, []);

  return {
    sticky,
  };
};

export default useSticky;
