export default function Navbar() {
  return (
    <div className="absolute top-0 z-20 backdrop-blur-md w-full flex justify-center py-2">
      <div className="w-[80%] flex flex-row justify-between items-center bg-teal-500 py-2 px-4 rounded-md">
        <div className="font-bold text-white">CryptoStatus</div>
        <div className="flex flex-row gap-1">
          <button type="button" className="font-semibold px-2 py-1 rounded-md text-white hover:cursor-pointer transition duration-200 ease-in-out hover:bg-teal-600">
            About
          </button>
          <button type="button" className="font-semibold px-2 py-1 rounded-md text-white hover:cursor-pointer transition duration-200 ease-in-out hover:bg-teal-600">
            Profile
          </button>
        </div>
      </div>
    </div>
  );
}
