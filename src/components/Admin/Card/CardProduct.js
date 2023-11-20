import { useState } from "react";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import {
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineInformationCircle,
} from "react-icons/hi2";
import { useGlobal } from "@/context/GlobalProvider";

const CardGeneral = ({ section, tag, title, data, pageSize = 6 }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(data.length / pageSize);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setCurrentPage(selectedPage);
  };

  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <>
      <div className="flex items-center justify-between border-t  px-2 py-2 sm:px-6 ">
        <ReactPaginate
          previousLabel={<span className="text-sm">Anterior</span>}
          nextLabel={<span className="text-sm">Siguiente</span>}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          disabledClassName={"disabled"}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {currentData?.map((datas, index) => (
          <div className="w-[100%] bg-gradient-to-t from-red-200 to-amber-100 flex items-center gap-3 border rounded-lg overflow-hidden shadow-md">
            <div className="w-[60%] flex justify-center items-center p-3 ">
              <img className="w-[100%]" src={`/card-item.png`} alt="" />
            </div>
            <div className="w-[100%] flex-row p-3 bg-white">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm text-[#ff7751] font-bold underline">
                  Nike Air Men's Hoodie
                </h2>
                <HiOutlineInformationCircle
                  className="text-xl cursor-pointer text-[#4878c5] hover:opacity-70 transition-all duration-300 ease-in-out"
                  title="Mas detalles"
                />
              </div>

              <p className="text-xs text-[#606879] mb-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Molestias, impedit aliquam obcaecati ullam nesciunt veniam culpa
                pariatur blanditiis quibusdam aliquid fugit ea? Voluptatum
                blanditiis possimus illum, excepturi quasi fugit sit.
              </p>
              <div className="w-[100%] flex items-center justify-between">
                <span className="text-[10px] bg-[#ff7751] text-white px-4 py-1 rounded-lg font-bold">
                  Categoria
                </span>
                <span className="text-[10px] bg-[#ff7751] text-white px-4 py-1 rounded-lg font-bold">
                  Marca
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CardGeneral;