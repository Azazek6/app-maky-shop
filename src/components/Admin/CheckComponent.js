import react from "react";

const CheckComponent = ({ toogle, activate, title, classStyle}) => {
  return (
    <label
      className={`${classStyle} w-[100%] flex items-center justify-center sm:justify-normal space-x-2 cursor-pointer transition-all duration-300 ease-in-out ${
        activate ? "text-[#ff7f51] font-bold" : "text-gray-700"
      }`}
      htmlFor="status"
      onClick={toogle}
    >
      <input
        type="checkbox"
        className="hidden"
        checked={activate}
        name="status"
        onChange={() => {}}
      />
      <div
        //onClick={toggleCheckbox}
        className="w-6 h-6 border-2 border-[#ff7f51] rounded-md flex items-center justify-center transition-all duration-300 ease-in-out group-hover:border-opacity-60"
      >
        {activate && (
          <svg
            className="w-4 h-4 text-[#ff7f51]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        )}
      </div>
      <span className="text-xs sm:text-sm transition-all duration-150 ease-in-out">{title}</span>
    </label>
  );
};

export default CheckComponent;
