import { useContext, useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../../authProvider/AuthProvider";

const Payments_History = () => {
  const { loggedInUser } = useContext(AuthContext);
  const userDetails = loggedInUser();
  const email = userDetails[1];
  const [paymentsDetails, setPaymentsDetails] = useState([]);

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/payments-history?email=${email}`)
        .then((res) => res.json())
        .then((data) => setPaymentsDetails(data));
    }
  }, [email]);

  return (
    <div className="min-h-screen mb-24">
      <div className="overflow-x-auto">
        <p className="text-center text-xl lg:text-2xl font-semifold mt-20">
          Payments History
        </p>

        <table className="table mt-12">
          <thead>
            <tr>
              <th></th>
              <th>Date</th>
              <th>Time</th>
              <th>Transaction Id</th>
              <th>Total Price</th>
              <th></th>
            </tr>
          </thead>

          {paymentsDetails.map((details) => (
            <tbody key={details._id}>
              <tr>
                <td>#</td>
                <td>{details.date}</td>
                <td>{details.time}</td>
                <td>{details.transactionId}</td>
                <td>${details.totalPrice}.00</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Payments_History;
