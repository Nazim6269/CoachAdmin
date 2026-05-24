"use client";

import SearchIcon from "@/icons/SearchIcon";
import { useEffect, useState } from "react";
import { useDebouncedSearch } from "@/hooks/common/useDebouncedSearch";

export default function Search({
  placeholder,
  onSearch,
  value,
  onChange,
}: {
  placeholder?: string;
  onSearch?: (value: string) => void;
  value?: string;
  onChange?: (value: string) => void;
}) {
  const [internalSearch, setInternalSearch] = useState("");
  const debouncedSearch = useDebouncedSearch(internalSearch);

  const isControlled = value !== undefined && onChange !== undefined;

  useEffect(() => {
    if (!isControlled) {
      onSearch?.(debouncedSearch);
    }
  }, [debouncedSearch, onSearch, isControlled]);

  const inputValue = isControlled ? value : internalSearch;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isControlled) {
      onChange(e.target.value);
    } else {
      setInternalSearch(e.target.value);
    }
  };

  return (
    <div className="w-full md:w-80 lg:w-90 relative">
      <input
        type="text"
        name="search"
        value={inputValue}
        onChange={handleChange}
        className="w-full text-sm bg-primaryColor text-whiteColor rounded-md md:rounded-lg py-3 md:py-3.5 px-4 pl-10 focus:outline-none"
        placeholder={placeholder}
      />

      <button className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl">
        <SearchIcon />
      </button>
    </div>
  );
}