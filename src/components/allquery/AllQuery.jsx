import { useEffect, useState } from "react";
import useAdminService from "../../services/adminService/AdminService";
import useToastNotifications from "../../services/toastify/ToasterService";
import BackButton from "../backButton/BackButton";
import Loader from "../loader/Loader";
import Table from "../table/Table";
import Pagination from "../pagination/Pagination";
const AllQuery = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getquery } = useAdminService();
  const { notifyError } = useToastNotifications();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
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
        </>
      )}
    </div>
  );
};

export default AllQuery;
