import { Link } from "react-router-dom";

const PopularInstructorCard = ({ details }) => {
  return (
    <div className="flex mx-auto">
      <div className="flex flex-col sm:flex-row justify-center items-center h-96">
        <figure>
          <img
            src={details.instructorImage}
            alt="Class's Image"
            className="w-72 h-72 rounded-full mt-24 sm:mt-0"
          />
        </figure>

        <div className="card-body pl-7 pt-5">
          <h2 className="card-title">{details.instructorName}</h2>
          <p className="font-semibold">Class Name: {details.className}</p>

          <Link to="/instructorDetails" className="link link-hover">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopularInstructorCard;
