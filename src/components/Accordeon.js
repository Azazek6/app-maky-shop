import { useState } from "react";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi2";

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b">
      <button
        onClick={toggleAccordion}
        className="flex justify-between items-center w-full p-3 focus:outline-none bg-[#FCCB90] bg-opacity-40 text-[#636c7d] text-sm font-bold"
      >
        <span className="text-base">{title}</span>
        {!isOpen ? (
          <HiOutlineChevronDown className="w-6 h-6" />
        ) : (
          <HiOutlineChevronUp className="w-6 h-6" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-max-h duration-500 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="text-[#909090] p-3">{content}</div>
      </div>
    </div>
  );
};

export default Accordion;
