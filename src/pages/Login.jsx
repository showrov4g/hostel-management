import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
// image hosting secret
const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const axiosPublic = UseAxiosPublic();
  const [displayURL, setDisplayURL] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [states, setStates] = useState("Login");
  const { createUser, loginUser, loginWithGoogle, updateUserProfile } =
    useContext(AuthContext);

  //   account create and login functions
  const onSubmit = async (data) => {
    const { name, email, password, photo } = data;
    const imageList = { image: photo?.[0] };

    {
      states === "sign up"
        ? axiosPublic
            .post(imageHostingApi, imageList, {
              headers: {
                "content-type": "multipart/form-data",
              },
            })
            .then((res) => (setDisplayURL(res.data.data.display_url)))
        : "";
    }

    const usersInfo = {
      name,
      email,
      displayURL,
      role: "user",
      subscription: "Bronze",
    };

    {
      states === "sign up"
        ? createUser(email, password)
            .then(
              (res) => (
                updateUserProfile({
                  displayName: name,
                  photoURL: displayURL,
                }),
                axiosPublic.post("/users", usersInfo).then((res) => {
                  navigate(location?.state ? location.state : "/");
                  if (res.data.insertedId) {
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Your account create successfully",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }
                })
              )
            )
            .catch((err) => toast.error(err.message))
        : loginUser(email, password)
            .then((res) => {
              navigate(location?.state ? location.state : "/");
              toast.success("You have successfully login");
              
            })
            .catch((err) => toast.error(err.message));
    }
  };

  //   login with google

  const handleGoogleLOgin = () => {
    loginWithGoogle()
      .then((res) => {
        navigate("/");
        const usersInfo = {
          name: res.user.displayName,
          email: res.user.email,
          profilePhoto: res.user.photoURL,
          role: "user",
          subscription: "Bronze",
        };

        if (res.user) {
          axiosPublic.patch("/users", usersInfo).then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your account create successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        }
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-h-[80vh] flex items-center"
      >
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg ">
          <p className="text-2xl font-semibold">
            {states === "sign up" ? "Create an Account" : "Login now"}
          </p>
          {/* name input field  */}
          {states === "sign up" ? (
            <div className="w-full">
              <p>Your Name</p>
              <input
                className="border border-x-zinc-300 rounded w-full p-2 mt-1"
                type="text"
                placeholder="Inter your name"
                {...register("name", { required: true })}
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name?.type === "required" && (
                <p role="alert" className="text-red-600">
                  Name is required
                </p>
              )}
            </div>
          ) : (
            ""
          )}
          {states === "sign up" ? (
            <div className="w-full">
              <p>Your Name</p>
              <input
                className="border border-x-zinc-300 rounded w-full p-2 mt-1"
                type="file"
                placeholder="Inter your name"
                {...register("photo", { required: true })}
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.photo?.type === "required" && (
                <p role="alert" className="text-red-600">
                  profile image is require
                </p>
              )}
            </div>
          ) : (
            ""
          )}
          {/* email input field  */}
          <div className="w-full">
            <p>Your Email</p>
            <input
              className="border border-x-zinc-300 rounded w-full p-2 mt-1"
              type="email"
              placeholder="Inter your email"
              {...register("email", { required: true })}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email?.type === "required" && (
              <p role="alert" className="text-red-600">
                Email is required
              </p>
            )}
          </div>
          {/* password input field  */}
          <div className="w-full">
            <p> Password</p>
            <input
              className="border border-x-zinc-300 rounded w-full p-2 mt-1"
              type="password"
              placeholder="Inter your password"
              {...register("password", { required: true, maxLength: 20 })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password?.type === "required" && (
              <p role="alert" className="text-red-600">
                Password is required
              </p>
            )}
          </div>
          <button className="bg-primary text-white w-full py-2 rounded-md text-base ">
            {states === "sign up" ? <p>Create Account</p> : <p>Login</p>}
          </button>
          {states === "sign up" ? (
            <p>
              Already have an account?
              <span
                onClick={() => setStates("Login")}
                className="text-primary underline cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create a new account?{" "}
              <span
                onClick={() => setStates("sign up")}
                className="text-primary underline cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
          {/* social media login  */}
          <a
            onClick={handleGoogleLOgin}
            className="flex items-center justify-center gap-4 bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer text-center"
          >
            <FaGoogle className="text-2xl" /> GOOGLE
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
