import { useState, useMemo } from "react";
import http from "../utils/http";
import { useNavigate } from "react-router-dom";

interface FetchedDataType {
  loading: boolean;
  fetchedData: {
    unit?: any[] | null;
    data: any[];
    totalPage: number;
    currentPage: number;
  };
  error: boolean;
  fetchNewData: Function;
}

type fetchedDataType = {
  data: any[];
  totalPage: number;
  currentPage: number;
};

/**
 *
 * @param {string} url  url link to fetch data
 * @returns {object} {fetchedData,loading,error,fetchNewData}
 */
export default function useFetch(): FetchedDataType {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [fetchedData, setFetchedData] = useState<fetchedDataType>({
    data: [],
    totalPage: 0,
    currentPage: 0,
  });

  const navigate = useNavigate();

  /**
   *
   * @param {string} newUrl url link to fetch data
   * sets loading true while fetching data , fetches new data with given url
   */
  const fetchNewData = useMemo((): Function => {
    return (newUrl: string): void => {
      setLoading(true);
      async function getData() {
        setLoading(true);
        try {
          const response = await http.GET(newUrl, "");
          if (response.status === 200) {
            setFetchedData(response?.data);
            setLoading(false);
          } else {
            setError(true);
            setLoading(false);
          }
        } catch (error) {
          if (error?.response?.status === 401) {
            navigate("/login");
          }
          setError(true);
          setLoading(false);
        }
      }
      getData();
    };
  }, [navigate]);

  return { loading, fetchedData, error, fetchNewData };
}
