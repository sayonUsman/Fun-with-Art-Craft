import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../authProvider/AuthProvider";
import { useContext } from "react";

const useConfirmedClasses = () => {
  const { loggedInUser } = useContext(AuthContext);
  const userDetails = loggedInUser();
  let accessToken = localStorage.getItem("accessToken");
  accessToken = JSON.parse(accessToken);
  const email = userDetails[1];

  const { data, refetch } = useQuery({
    queryKey: ["confirmedClasses", email],

    queryFn: async () => {
      const res = await fetch(
        `https://fun-with-art-craft.vercel.app/confirmedClasses?email=${email}`,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return res.json();
    },
  });

  return [data, refetch];
};

export default useConfirmedClasses;
