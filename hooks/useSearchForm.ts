"use client";

import { useRouter } from "next/router";
import { useState, ChangeEvent, FormEvent } from "react";

const useSearchFormSubmit = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchText) {
      let route = `/search?searchText=${searchText}`;

      if (category && category !== "Select Category") {
        route += `&productType=${category}`;
        setCategory("");
      }

      router.push(route, undefined, { scroll: false });
      setSearchText("");
    } else {
      router.push(`/`, undefined, { scroll: false });
      setSearchText("");
      setCategory("");
    }
  };

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  return {
    searchText,
    category,
    setSearchText,
    setCategory,
    handleSubmit,
    handleSearchTextChange,
    handleCategoryChange,
  };
};

export default useSearchFormSubmit;
