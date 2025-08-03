import { useDebounce } from "@/hooks/useDebounce";
import { ICoinsProps } from "@/lib/interfaces";
import LoadingDots from "@/lib/loadingDots";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface ISearchbarProps {
  allCoins: ICoinsProps[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

interface ISuggestionProps {
  id: string;
  symbol: string;
  name: string;
}

const Searchbar: React.FC<ISearchbarProps> = ({
  searchTerm,
  setSearchTerm,
  allCoins,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<ISuggestionProps[]>([]);

  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    const handleSearchProblems = async () => {
      if (!debouncedQuery?.trim()) {
        setIsSearching(false);
        setSuggestions([]);
        return;
      }

      try {
        setIsSearching(true);
        setLoading(true);
        setError(null);

        const filteredCoins = allCoins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );

        console.log("suggestions: ", filteredCoins);
        setSuggestions(filteredCoins);
      } catch (error) {
        console.error("Error while searching: ", error);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    handleSearchProblems();
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsSearching(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    // search shall happen on the basis of name and symbol as asked in the assignment
    <div className="flex flex-row items-center gap-1">
      <div className="">
        <p className="text-md font-semibold text-teal-600">Search:</p>
      </div>
      <div ref={wrapperRef} className="md:w-[20rem] w-[18rem] relative">
        <input
          type="text"
          name=""
          id=""
          value={searchTerm}
          className="w-full border-[0.5px] border-zinc-400 text-sm p-1 rounded-sm focus:outline-none"
          placeholder="Search by name or symbol..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value;
            setSearchTerm(val);
            setQuery(val);
            setIsSearching(true);
          }}
        />
        {isSearching && (
          <div className="absolute top-[100%] mt-1 left-0 w-full bg-teal-300 dark:bg-slate-900 border-none rounded-md shadow-lg max-h-60 overflow-y-auto z-50 p-1">
            {loading ? (
              <div className="px-4 py-2 flex justify-center">
                <p className="flex flex-row gap-2 items-center text-xs">
                  <span className="">Searching...</span>
                  <LoadingDots />
                </p>
              </div>
            ) : error ? (
              <div className="py-1 flex justify-center">
                <p className="text-red-500 font-bold">Something went wrong</p>
              </div>
            ) : suggestions.length > 0 ? (
              suggestions.map((s, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-teal-500 hover:text-white cursor-pointer hover:dark:bg-teal-900 text-sm transition duration-200 ease-in-out rounded-sm"
                  onClick={() => {
                    setIsSearching(false);
                    setQuery("");
                    setSuggestions([]);
                    router.push(`/coin/${s.id}`);
                  }}
                >
                  {s.name}-{s.symbol.toUpperCase()}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 font-space text-xs flex justify-center font-medium text-red-400">
                No results found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
