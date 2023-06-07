import { Link } from "react-router-dom";
import bg from "../../assets/404_Error.jpg";

const Error_404 = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-3xl lg:text-5xl text-black font-bold">
            Page Not Found
          </h1>

          <Link to="/" className="btn bg-black text-white hover:text-black">
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error_404;
