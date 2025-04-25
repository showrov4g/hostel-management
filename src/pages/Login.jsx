import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const onSubmit = async (data) => {
    const { name, email, password, photo } = data;
    const imageList = { image: photo?.[0] };

    if (states === "sign up") {
      await axiosPublic
        .post(imageHostingApi, imageList, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => setDisplayURL(res.data.data.display_url));
    }

    const usersInfo = {
      name,
      email,
      displayURL,
      role: "user",
      subscription: "Bronze",
    };

    if (states === "sign up") {
      createUser(email, password)
        .then(() => {
          updateUserProfile({
            displayName: name,
            photoURL: displayURL,
          });
          axiosPublic.post("/users", usersInfo).then((res) => {
            navigate(location?.state ? location.state : "/");
            if (res.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your account was created successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        })
        .catch((err) => toast.error(err.message));
    } else {
      loginUser(email, password)
        .then(() => {
          navigate(location?.state ? location.state : "/");
          toast.success("You have successfully logged in");
        })
        .catch((err) => toast.error(err.message));
    }
  };

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
                title: "Your account was created successfully",
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
    <div className="bg-[#F9FAFB] min-h-[100vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md text-[#111827]"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          {states === "sign up" ? "Create an Account" : "Login Now"}
        </h2>

        {states === "sign up" && (
          <>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Your Name</label>
              <input
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-[#F43F5E] text-sm mt-1">Name is required</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Profile Image</label>
              <input
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
                type="file"
                {...register("photo", { required: true })}
              />
              {errors.photo && (
                <p className="text-[#F43F5E] text-sm mt-1">
                  Profile image is required
                </p>
              )}
            </div>
          </>
        )}

        <div className="mb-4">
          <label className="block mb-1 font-medium">Your Email</label>
          <input
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-[#F43F5E] text-sm mt-1">Email is required</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Password</label>
          <input
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true, maxLength: 20 })}
          />
          {errors.password && (
            <p className="text-[#F43F5E] text-sm mt-1">Password is required</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#6366F1] text-white py-2 rounded-md text-lg font-semibold hover:bg-[#4F46E5] transition"
        >
          {states === "sign up" ? "Create Account" : "Login"}
        </button>

        <p className="mt-4 text-sm text-center">
          {states === "sign up" ? (
            <>Already have an account?{' '}
              <span
                onClick={() => setStates("Login")}
                className="text-[#6366F1] cursor-pointer underline"
              >
                Login here
              </span>
            </>
          ) : (
            <>Create a new account?{' '}
              <span
                onClick={() => setStates("sign up")}
                className="text-[#6366F1] cursor-pointer underline"
              >
                Click here
              </span>
            </>
          )}
        </p>

        <div className="mt-6">
          <button
            type="button"
            onClick={handleGoogleLOgin}
            className="w-full flex items-center justify-center gap-3 bg-[#06B6D4] text-white py-2 rounded-md hover:bg-[#0891B2] transition"
          >
            <FaGoogle className="text-xl" /> Continue with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
