import { useEffect, useState } from "react";

const useAllDetails = () => {
  const [allDetails, setAllDetails] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://fun-with-art-craft.vercel.app/all_details")
      .then((res) => res.json())
      .then((data) => {
        setAllDetails(data);
        setIsLoading(false);
      });
  }, []);

  return [allDetails, isloading];
};

export default useAllDetails;
