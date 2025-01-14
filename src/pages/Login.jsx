import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [state, setState] = useState("sign up");
  const { createUser, loginUser } = useContext(AuthContext);

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
          {state === "sign up" ? (
            <div className="w-full">
              <p>Your Name</p>
              <input
                className="border border-x-zinc-300 rounded w-full p-2 mt-1"
                type="text"
                placeholder="Inter your name"
                {...register("name", { required: true })}
              />
            </div>
          ) : (
            ""
          )}
          <div className="w-full">
            <p>Your Email</p>
            <input
              className="border border-x-zinc-300 rounded w-full p-2 mt-1"
              type="email"
              placeholder="Inter your email"
              {...register("email", { required: true })}
            />
          </div>
          <div className="w-full">
            <p> Password</p>
            <input
              className="border border-x-zinc-300 rounded w-full p-2 mt-1"
              type="password"
              placeholder="Inter your password"
              {...register("password", { required: true, maxLength: 20 })}
            />
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
        </div>
      </form>
    </div>
  );
};

export default Login;
