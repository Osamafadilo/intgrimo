import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Search, X, Clock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  recentSearches?: string[];
  popularSearches?: string[];
}

const SearchBar = ({
  onSearch = () => {},
  placeholder,
  recentSearches = [
    "Plumber near me",
    "Best restaurants",
    "Home cleaning service",
    "Car rental",
  ],
  popularSearches = [
    "Restaurant delivery",
    "Apartment for rent",
    "Electrician",
    "Grocery delivery",
    "Hotel booking",
  ],
}: SearchBarProps) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setIsPopoverOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearchItemClick = (search: string) => {
    setSearchQuery(search);
    onSearch(search);
    setIsPopoverOpen(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsPopoverOpen(true);
  };

  return (
    <div className="relative w-full max-w-[600px] h-[50px] bg-white">
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <div className="relative flex items-center w-full">
            <Search className="absolute left-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder={placeholder || t("header.search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsPopoverOpen(true)}
              onKeyDown={handleKeyDown}
              className="pl-10 pr-10 h-[50px] rounded-full border-gray-300 focus:border-primary focus:ring-primary"
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-12 h-8 w-8 p-0"
                onClick={clearSearch}
              >
                <X className="h-4 w-4 text-gray-500" />
              </Button>
            )}
            <Button
              type="button"
              size="icon"
              className="absolute right-2 h-8 w-8 rounded-full"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-[600px] p-0 rounded-xl shadow-lg mt-1"
          align="start"
        >
          <div className="p-4">
            {recentSearches.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <h3 className="text-sm font-medium">Recent Searches</h3>
                </div>
                <ul className="space-y-1">
                  {recentSearches.map((search, index) => (
                    <li key={`recent-${index}`}>
                      <button
                        className="w-full text-left px-2 py-1.5 text-sm rounded-md hover:bg-gray-100 flex items-center"
                        onClick={() => handleSearchItemClick(search)}
                      >
                        <Clock className="h-3 w-3 mr-2 text-gray-400" />
                        {search}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {popularSearches.length > 0 && (
              <div>
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-4 w-4 mr-2 text-gray-500" />
                  <h3 className="text-sm font-medium">Popular Searches</h3>
                </div>
                <ul className="space-y-1">
                  {popularSearches.map((search, index) => (
                    <li key={`popular-${index}`}>
                      <button
                        className="w-full text-left px-2 py-1.5 text-sm rounded-md hover:bg-gray-100 flex items-center"
                        onClick={() => handleSearchItemClick(search)}
                      >
                        <TrendingUp className="h-3 w-3 mr-2 text-gray-400" />
                        {search}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchBar;
