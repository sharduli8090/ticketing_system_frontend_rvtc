import { useEffect, useState } from "react";
import useAdminService from "../../services/adminService/AdminService";
import useToastNotifications from "../../services/toastify/ToasterService";
import Loader from "../loader/Loader";
import Table from "../table/Table";

const AllQuery = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getquery } = useAdminService();
  const { notifyError } = useToastNotifications();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getquery();
      const formattedData = response.data.map((query) => ({
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

  return (
    <div className="flex flex-col justify-between items-center mt-32 mb-64 w-auto mx-28">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-center items-center flex-row w-full mb-10"></div>
          <Table data={data} tableType={"query"} />
        </>
      )}
    </div>
  );
};

export default AllQuery;
