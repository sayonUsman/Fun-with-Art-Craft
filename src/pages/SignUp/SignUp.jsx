import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/Fc";
import { IconContext } from "react-icons";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../authProvider/AuthProvider";
import { getAuth, updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const SignUp = () => {
  const { createNewUser, loginWithGoogle } = useContext(AuthContext);
  const auth = getAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (newUser) => {
    setErrorMessage("");

    if (newUser.password !== newUser.confirm_pass) {
      setErrorMessage("Your password did not match with the confirm password");
      return;
    }

    createNewUser(newUser.email, newUser.password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: newUser.name,
          photoURL: newUser.url,
        })
          .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "New user has been successfully created.",
              showConfirmButton: true,
            });

            navigate("/");
          })
          .catch((error) => {
            setErrorMessage(error.message);
          });
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
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logged in has been done successfully.",
          showConfirmButton: true,
        });

        navigate("/");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col">
        <div className="card rounded-md shadow-md w-96 xl:w-full shadow-zinc-800 mt-20 xl:mt-0">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="xl:flex">
                <div className="form-control xl:w-72 xl:mr-7">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>

                  <input
                    type="text"
                    placeholder="name"
                    className="input input-bordered"
                    {...register("name", { required: true })}
                  />

                  {errors.name && (
                    <span className="text-red-500 pt-1 pl-1">
                      Name is required.
                    </span>
                  )}
                </div>

                <div className="form-control xl:w-72">
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
              </div>

              <div className="xl:flex xl:mt-4">
                <div className="form-control xl:w-72 xl:mr-7">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>

                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      pattern: /(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                    })}
                  />

                  {errors.password?.type === "required" && (
                    <span className="text-red-500 pt-1 pl-1">
                      Password is required.
                    </span>
                  )}

                  {errors.password?.type === "minLength" && (
                    <span className="text-red-500 pt-1 pl-1">
                      Password must be six characters.
                    </span>
                  )}

                  {errors.password?.type === "pattern" && (
                    <span className="text-red-500 pt-1 pl-1">
                      Password must have at least one capital letter and one
                      special character.
                    </span>
                  )}
                </div>

                <div className="form-control xl:w-72">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>

                  <input
                    type="password"
                    placeholder="confirm password"
                    className="input input-bordered"
                    {...register("confirm_pass", { required: true })}
                  />

                  {errors.confirm_pass && (
                    <span className="text-red-500 pt-1 pl-1">
                      Confirm Password is required.
                    </span>
                  )}
                </div>
              </div>

              <div className="form-control xl:mt-4">
                <label className="label">
                  <span className="label-text">Profile Picture URL</span>
                </label>

                <input
                  type="url"
                  placeholder="photo url"
                  className="input input-bordered"
                  {...register("url", { required: true })}
                />

                {errors.url && (
                  <span className="text-red-500 pt-1 pl-1">
                    Profile Picture URL is required.
                  </span>
                )}
              </div>

              <div className="form-control xl:flex xl:mx-auto xl:w-72 mt-10">
                <input
                  type="submit"
                  value="Sign Up"
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
              Already registered?{" "}
              <span>
                <Link to="/login" className="link link-hover">
                  Go to the Login
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

export default SignUp;
