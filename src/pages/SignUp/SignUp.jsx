import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/Fc";
import { IconContext } from "react-icons";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
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
                    {...register("password", { required: true })}
                  />

                  {errors.password && (
                    <span className="text-red-500 pt-1 pl-1">
                      Password is required.
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
                <button className="btn btn-circle bg-white">
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
    </div>
  );
};

export default SignUp;
