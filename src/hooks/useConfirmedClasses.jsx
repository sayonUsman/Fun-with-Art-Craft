import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../authProvider/AuthProvider";
import { useContext } from "react";

const useConfirmedClasses = () => {
  const { loggedInUser } = useContext(AuthContext);
  const userDetails = loggedInUser();
  const email = userDetails[1];

  const { data, refetch } = useQuery({
    queryKey: ["confirmedClasses", email],

    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/confirmedClasses?email=${email}`
      );
      return res.json();
    },
  });

  return [data, refetch];
};

export default useConfirmedClasses;
