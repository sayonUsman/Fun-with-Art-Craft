import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useConfirmedClasses from "../../hooks/useConfirmedClasses";
import useConfirmedClassesDetails from "../../hooks/useConfirmedClassesDetails";

const Dashboard = () => {
  const [, refetch] = useConfirmedClasses();
  const confirmedClassesDetails = useConfirmedClassesDetails();
  const totalPrice = confirmedClassesDetails.reduce(
    (sum, classDetails) => sum + classDetails?.price,
    0
  );

  const handleDelete = (classId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete your selected class?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://fun-with-art-craft.vercel.app/confirmedClasses/${classId}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              refetch(); // To remove the class from the navbar cart
              Swal.fire(
                "Deleted!",
                "The class has been deleted from your selected class.",
                "success"
              );
            }
          });
      }
    });
  };

  return (
    <div className="mt-20 md:mt-4 mb-7">
      <p className="text-4xl xl:text-5xl text-center font-bold">
        Your Activities
      </p>

      <div className="overflow-x-auto mt-9">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Selected Classes</th>
              <th>Available Seats</th>
              <th>Course Price</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {confirmedClassesDetails.map((details) => (
              <tr key={details?._id} className="text-center">
                <th>#</th>
                <td>{details?.className}</td>
                <td>{details?.availableSeats}</td>
                <td>{`$ ${details?.price}.00`}</td>
                <td>
                  <button
                    className="btn btn-xs bg-red-400"
                    onClick={() => handleDelete(details?._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            <tr className="text-center">
              <th></th>
              <td></td>
              <td>Total</td>
              <td>{`$ ${totalPrice}.00`}</td>
            </tr>
          </tbody>
        </table>

        <div className="flex mt-5">
          <div className="flex mx-auto">
            <Link to="payments" className="btn btn-link">
              Pay Now
            </Link>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-16">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Enrolled Classes</th>
              <th>Instructor Name</th>
              <th></th>
            </tr>
          </thead>
        </table>

        <p className="text-center p-1">You have no enrolled classes</p>
      </div>
    </div>
  );
};

export default Dashboard;
