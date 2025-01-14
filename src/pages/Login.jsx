import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [state, setState] = useState("sign up");
  const { createUser, loginUser,loginWithGoogle } = useContext(AuthContext);

  //   account create and login functions
  const onSubmit = (data) => {
    const { name, email, password } = data;

    {
      state === "sign up"
        ? createUser(email, password)
            .then((res) => toast.success("your account create successfully"))
            .catch((err) => toast.error(err.message))
        : loginUser(email, password)
            .then((res) => toast.success("You have successfully login"))
            .catch((err) => toast.error(err.message));
    }
  };
//   login with google 

const handleGoogleLOgin =()=>{
    loginWithGoogle()
    .then(res=>toast.success("You have Successfully Login"))
    .catch(err=>toast.error(err.message))
}


  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-h-[80vh] flex items-center"
      >
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg ">
          <p className="text-2xl font-semibold">
            {state === "sign up" ? "Create an Account" : "Login now"}
          </p>
          {/* name input field  */}
          {state === "sign up" ? (
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
            {state === "sign up" ? <p>Create Account</p> : <p>Login</p>}
          </button>
          {state === "sign up" ? (
            <p>
              Already have an account?
              <span
                onClick={() => setState("Login")}
                className="text-primary underline cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create a new account?{" "}
              <span
                onClick={() => setState("sign up")}
                className="text-primary underline cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
          {/* social media login  */}
          <a onClick={handleGoogleLOgin} className="bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer text-center">
            GOOGLE
          </a>
        </div>
      </form>

    </div>
  );
};

export default Login;
