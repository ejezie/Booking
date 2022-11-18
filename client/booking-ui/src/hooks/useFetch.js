import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
    const [data, setData] = useState([])
    const [loadiing, setLoadiing] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoadiing(true);
            try{
                const data = await axios.get(url);
                data && setData(data)
            }catch(err){
                setError(err)
            }
        }
    })
}