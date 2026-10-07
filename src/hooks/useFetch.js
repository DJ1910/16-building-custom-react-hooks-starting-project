import { useEffect, useState } from 'react';

export function useFetch(fetchFn, customMessage, initialLoadingValue, initialDataValue) {
    const [isFetching, setIsFetching] = useState(initialLoadingValue);
    const [fetchedData, setFetchedData] = useState(initialDataValue);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        async function fetchData() {
          setIsFetching(true);
          try {
            const data = await fetchFn();
            setFetchedData(data);
          } catch (error) {
            setFetchError({ message: error.message || customMessage });
          }
          setIsFetching(false);
        }
    
        fetchData();
    }, [fetchFn]);

    return {isFetching, fetchedData, fetchError, setFetchedData};
}