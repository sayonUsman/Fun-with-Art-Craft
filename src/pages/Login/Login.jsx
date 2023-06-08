import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/Fc";
import { IconContext } from "react-icons";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../authProvider/AuthProvider";

const Login = () => {
  const { loginWithEmailAndPassword, loginWithGoogle } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (user) => {
    loginWithEmailAndPassword(user.email, user.password)
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });

    reset();
  };

  const handleGoogleLogin = () => {
    setErrorMessage("");

    loginWithGoogle()
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col">
        <div className="card rounded-md flex-shrink-0 w-96 shadow-md shadow-zinc-800 mt-20 xl:mt-0">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>

                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email", { required: true })}
                />

                {errors.email && (
                  <span className="text-red-500 pt-1 pl-1">
                    Email is required.
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>

                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password", { required: true })}
                />

                {errors.password && (
                  <span className="text-red-500 pt-1 pl-1">
                    Password is required.
                  </span>
                )}

                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>

              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-outline btn-info"
                />
              </div>
            </form>

            <p className="mt-5 text-center text-xl">
              Or
              <br />
              Continue With
            </p>

            <IconContext.Provider value={{ size: "45px" }}>
              <div className="flex mx-auto mt-3">
                <button
                  className="btn btn-circle bg-white"
                  onClick={handleGoogleLogin}
                >
                  <FcGoogle></FcGoogle>
                </button>
              </div>
            </IconContext.Provider>

            <p className="mt-5 text-center">
              New here?{" "}
              <span>
                <Link to="/signUp" className="link link-hover">
                  Create a New Account
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="toast toast-end">
          <div className="alert alert-error">
            <div>
              <span>{errorMessage}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
