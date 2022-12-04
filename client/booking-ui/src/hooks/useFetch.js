import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoadiing] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoadiing(true);
      try {
        const res = await axios.get("http://localhost:8800/api" + url);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoadiing(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoadiing(true);
    try {
      const res = await axios.get("http://localhost:8800/api" + url);
      data && setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoadiing(false);
  };

  return { data, loading, error, reFetch}
};

export default useFetch;