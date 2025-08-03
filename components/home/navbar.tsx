import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  return (
    <div className="fixed top-0 z-20 backdrop-blur-md w-full flex justify-center py-2">
      <div className="w-[90%] sm:w-[80%] flex flex-row justify-between items-center bg-teal-500 py-2 px-4 rounded-md gap-2 sm:gap-0">
        <div className="font-bold text-white text-lg sm:text-xl">CryptoStatus</div>
        <div className="flex flex-row gap-2">
          <button
            type="button"
            className="font-semibold px-3 py-1 rounded-md text-white text-sm sm:text-base hover:cursor-pointer transition duration-200 ease-in-out hover:bg-teal-600"
            onClick={() => {
              router.push("/watchlist");
            }}
          >
            Watchlist
          </button>
        </div>
      </div>
    </div>
  );
}

