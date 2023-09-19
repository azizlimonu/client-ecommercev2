"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { userLoggedIn } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";

export default function useAuthCheck() {
  const dispatch = useAppDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const localAuth = Cookies.get('userInfo')

    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.accessToken && auth?.user) {
        dispatch(
          userLoggedIn({
            accessToken: auth.accessToken,
            user: auth.user,
          })
        );
      }
    }
    setAuthChecked(true);
  }, [dispatch, setAuthChecked]);

  return authChecked;
};
