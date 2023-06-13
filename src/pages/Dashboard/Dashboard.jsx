import useAllDetails from "../../hooks/useAllDetails";
import useConfirmedClasses from "../../hooks/useConfirmedClasses";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [confirmedClasses, refetch] = useConfirmedClasses();
  const [allDetails] = useAllDetails();
  let confirmedClassesDetails = [];
  let idList = [];

  confirmedClasses?.forEach((confirmedClass) => {
    idList = [...idList, confirmedClass.classId];
  });

  idList.forEach((id) => {
    const confirmedClassDetails = allDetails.find(
      (details) => details._id === id
    );

    confirmedClassesDetails = [
      ...confirmedClassesDetails,
      confirmedClassDetails,
    ];
  });

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
        fetch(`http://localhost:5000/confirmedClasses/${classId}`, {
          method: "DELETE",
        })
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

          {confirmedClassesDetails.map((details) => (
            <tbody key={details?._id}>
              <tr className="text-center">
                <th>#</th>
                <td>{details?.className}</td>
                <td>{details?.availableSeats}</td>
                <td>{`$${details?.price}.00`}</td>
                <td>
                  <button className="btn btn-link">Pay Now</button>
                </td>
                <td>
                  <button
                    className="btn btn-xs bg-red-400"
                    onClick={() => handleDelete(details?._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
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
