import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../api";

interface SearchData {
  value: string;
  label: string;
}

interface SearchProps {
  onSearchChange: (searchData: SearchData) => void;
}

const Search: React.FC<SearchProps> = ({ onSearchChange }) => {
  const [search, setSearch] = useState<SearchData | null>(null);

  const loadOptions = async (inputValue: string) => {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    );
    const data = await response.json();

    return {
      options: data.data.map((city: { latitude: number; longitude: number; name: string; countryCode: string }) => {
        return {
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        };
      }),
    };
  };

  const handleOnChange = (searchData: SearchData | null) => {
    setSearch(searchData);
    if (searchData) {
      onSearchChange(searchData);
    }
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
