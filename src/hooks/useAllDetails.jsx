import { useEffect, useState } from "react";

const useAllDetails = () => {
  const [allDetails, setAllDetails] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/all_details")
      .then((res) => res.json())
      .then((data) => {
        setAllDetails(data);
        setIsLoading(false);
      });
  }, []);

  return [allDetails, isloading];
};

export default useAllDetails;
