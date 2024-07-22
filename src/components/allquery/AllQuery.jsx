import { useEffect, useState } from "react";
import useAdminService from "../../services/adminService/AdminService";
import Loader from "../loader/Loader";
import Table from "../table/Table";

const AllQuery = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getquery } = useAdminService();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getquery();
      console.log(response);
      const formattedData = response.data.map((query) => ({
        Name: query.name,
        Query: query.query,
      }));
      setData(formattedData);
    } catch (error) {
      alert("An error occurred while fetching data");
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
