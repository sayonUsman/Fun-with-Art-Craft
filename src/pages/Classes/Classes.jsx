import useAllDetails from "../../hooks/useAllDetails";

const Classes = () => {
  const [allDetails] = useAllDetails();

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
