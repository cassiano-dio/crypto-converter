import { useState, useEffect} from 'react'

function useFetchData(url) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(url)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => console.log(`Error: ${err}`));
    },[]);

    console.log("Hook data:", data)
    

    return { data };
}

export default useFetchData