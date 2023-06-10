import { Link } from "react-router-dom";
import useAllDetails from "../../hooks/useAllDetails";

const Instructors = () => {
  const [allDetails] = useAllDetails();

  return (
    <div className="container mx-auto min-h-screen">
      <div className="overflow-x-auto">
        <table className="table mt-24">
          <thead>
            <tr>
              <th>Instructor</th>
              <th>Email</th>
              <th>Name of the Class</th>
              <th></th>
            </tr>
          </thead>

          {allDetails.map((details) => (
            <tbody key={details._id}>
              <tr>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask rounded-full w-16 h-16">
                        <img
                          src={details.instructorImage}
                          alt="Instructor Image"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="font-bold">{details.instructorName}</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>

                <td>
                  {details.instructorEmail}
                  <br />
                  <span className="badge badge-ghost badge-sm">Expertised</span>
                </td>

                <td>{details.className}</td>

                <th>
                  <Link className="btn btn-ghost btn-xs">See Classes</Link>
                </th>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Instructors;
