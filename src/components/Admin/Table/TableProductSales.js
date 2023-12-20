import { useState } from "react";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { useGlobal } from "@/context/GlobalProvider";

const TableProductSales = ({ section, title, data, pageSize = 5 }) => {
  const { removeProductSales } = useGlobal();
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
    <div className="w-[100%] flex flex-col">
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle overflow-x-auto">
          <table className="w-[100%] divide-y divide-gray-200">
            <thead className="bg-[#e87f7f]">
              <tr>
                <th
                  scope="col"
                  className="transition-all duration-300 ease-in-out px-6 py-3 text-xs font-semibold text-left text-[#b9b8b8] sm:px-2 md:px-3 lg:px-4 xl:px-6 sm:text-sm md:text-base lg:text-sm xl:text-sm hover:text-[#fff]"
                >
                  #
                </th>
                {title.map(({ name }) => (
                  <th
                    key={name}
                    scope="col"
                    className="transition-all duration-300 ease-in-out px-6 py-3 text-xs font-semibold text-left text-[#b9b8b8] sm:px-2 md:px-3 lg:px-4 xl:px-6 sm:text-sm md:text-base lg:text-sm xl:text-sm hover:text-[#fff]"
                  >
                    {name}
                  </th>
                ))}
                <th
                  scope="col"
                  className="transition-all duration-300 ease-in-out px-6 py-3 text-xs font-semibold text-left text-[#b9b8b8] sm:px-2 md:px-3 lg:px-4 xl:px-6 sm:text-sm md:text-base lg:text-sm xl:text-sm hover:text-[#fff]"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentData?.map((datas, index) => {
                const globalIndex = currentPage * pageSize + index + 1;
                return (
                  <tr key={index}>
                    <td className="px-6 py-4 text-xs text-[#34495E] whitespace-nowrap sm:px-2 md:px-3 lg:px-4 xl:px-6 sm:text-sm md:text-base lg:text-base xl:text-xs">
                      {globalIndex}
                    </td>
                    {title?.map((item) => {
                      const value = datas[item.id];
                      return (
                        <td
                          key={item.id}
                          className="px-6 py-4 text-xs text-[#34495E] whitespace-nowrap sm:px-2 md:px-3 lg:px-4 xl:px-6 sm:text-sm md:text-base lg:text-base xl:text-xs"
                        >
                          {value}
                        </td>
                      );
                    })}
                    <td className="px-6 py-4 text-xs font-medium text-right whitespace-nowrap sm:px-2 md:px-3 lg:px-4 xl:px-6 sm:text-sm md:text-base lg:text-base xl:text-xs">
                      <Link
                        className="text-red-500 hover:text-red-700"
                        href="#"
                        onClick={() => {
                          removeProductSales(datas.id_product);
                        }}
                      >
                        <HiOutlineTrash className="sm:text-sm md:text-base lg:text-base xl:text-xl" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 bg-[#fff] px-2 py-2 sm:px-6 ">
        <ReactPaginate
          previousLabel={<span className="text-sm sm:text-base">Anterior</span>}
          nextLabel={<span className="text-sm sm:text-base">Siguiente</span>}
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
    </div>
  );
};

export default TableProductSales;
