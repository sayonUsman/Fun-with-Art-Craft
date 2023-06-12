import { useContext } from "react";
import { AuthContext } from "../../authProvider/AuthProvider";
import useAllDetails from "../../hooks/useAllDetails";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useConfirmedClasses from "../../hooks/useConfirmedClasses";

const Classes = () => {
  const [allDetails] = useAllDetails();
  const { user, loggedInUser } = useContext(AuthContext);
  const userDetails = loggedInUser();
  const navigate = useNavigate();
  const [, refetch] = useConfirmedClasses();

  const manageEnroll = (event, classId) => {
    if (event.target.checked) {
      if (user) {
        const bookedClass = {
          studentName: userDetails[0],
          studentEmail: userDetails[1],
          classId: classId,
        };

        fetch("http://localhost:5000/confirmedClasses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookedClass),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              refetch(); // To add the class in the navbar cart

              Swal.fire({
                title: "Your selected class has been saved successfully",
                text: "Want to pay now?",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/dashboard");
                }
              });
            }
          });
      } else {
        Swal.fire({
          title: "Oops! You are not login user!!!",
          text: "To ensure the enrollment please login or sign up",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          } else {
            event.target.checked = false;
          }
        });
      }
    }

    if (!event.target.checked) {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to unselect the class!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:5000/confirmedClasses/${classId}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                refetch(); // To remove the class from the navbar cart
                event.target.checked = false;
              }
            });
        } else {
          event.target.checked = true;
        }
      });
    }
  };

  return (
    <div className="min-h-screen mb-24">
      <div className="overflow-x-auto">
        <table className="table mt-24">
          <thead>
            <tr>
              <th>Class</th>
              <th>Instructor Name</th>
              <th>Available Seats</th>
              <th>Course Price</th>
              <th></th>
            </tr>
          </thead>

          {allDetails.map((details) => (
            <tbody
              key={details._id}
              className={
                details.availableSeats == 0 ? "bg-red-300" : "bg-white"
              }
            >
              <tr>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-20 h-20">
                        <img src={details.classImage} alt="Instructor Image" />
                      </div>
                    </div>

                    <div>
                      <div className="font-bold">{details.className}</div>
                      <div className="text-sm opacity-50">
                        Fun with Art & Craft
                      </div>
                    </div>
                  </div>
                </td>

                <td>
                  {details.instructorName}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {details.instructorEmail}
                  </span>
                </td>

                <td>{details.availableSeats}</td>
                <td>${details.price}.00</td>

                <th>
                  <label>
                    <input
                      type="checkbox"
                      onChange={(event) => manageEnroll(event, details._id)}
                      className="checkbox"
                      disabled={details.availableSeats == 0 ? true : false}
                    />
                  </label>
                </th>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Classes;
