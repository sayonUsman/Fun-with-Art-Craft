import { useContext } from "react";
import { AuthContext } from "../authProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useEnrollmentClasses = () => {
  const { loggedInUser } = useContext(AuthContext);
  const userDetails = loggedInUser();
  let accessToken = localStorage.getItem("accessToken");
  accessToken = JSON.parse(accessToken);
  const email = userDetails[1];

  const { data, refetch } = useQuery({
    queryKey: ["enrollmentClasses", email],

    queryFn: async () => {
      const res = await fetch(
        `https://fun-with-art-craft.vercel.app/enrollmentClasses?email=${email}`,
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

export default useEnrollmentClasses;
