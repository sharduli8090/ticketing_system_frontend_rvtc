import { useEffect, useState } from "react";
import useAdminService from "../../services/adminService/AdminService";
import useToastNotifications from "../../services/toastify/ToasterService";
import BackButton from "../backButton/BackButton";
import Loader from "../loader/Loader";
import Pagination from "../pagination/Pagination";
import Table from "../table/Table";
const AllQuery = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getquery } = useAdminService();
  const { notifyError } = useToastNotifications();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of items per page
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setCurrentPage(1);
    try {
      const response = await getquery();
      const formattedData = response?.data.map((query) => ({
        Name: query.name,
        Query: query.query,
      }));
      setData(formattedData);
    } catch (error) {
      notifyError("An error occurred while fetching data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate the current page's data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleLimitChange = () => {
    if (limit < 1) {
      notifyError("Limit should be greater than 0");
      return;
    }
    setItemsPerPage(limit);
  };
  return (
    <div className="flex flex-col justify-between items-center mt-32 mb-64 w-auto mx-28">
      <BackButton />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-center items-center flex-row w-full mb-10"></div>
          <Table data={currentData} tableType={"query"} />

          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={data.length}
            paginate={paginate}
            currentPage={currentPage}
          />

          <div className="flex mt-2 w-full justify-end items-center">
            <input
              type="number"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="focus:none outline-none  w-16 p-1 text-center h-7 rounded-lg  glow-button-purple text-gray-50 text-sm duration-1000 transition-colors transform"
            />
            <button
              onClick={handleLimitChange}
              className="glow-button transition-all transform hover:scale-110 rounded-lg text-sm text-gray-50 ml-5 duration-1000 p-1"
            >
              Change Limit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllQuery;
