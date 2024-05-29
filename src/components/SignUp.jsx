import { useForm } from "react-hook-form";
import { Input, Button } from "./index";
import { useState } from "react";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/features/authSlice";

function SignUp() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const create = async (data) => {
    setError("");
    console.log(data);

    try {
      const userAccount = await authService.createAccount(data);

      if (userAccount) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(login(userData));

          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="p-8 md:p-12 lg:p-16 xl:p-24">
      <div className="flex flex-col md:w-1/2 xl:w-[35vw] items-center justify-center mx-auto p-4 border rounded shadow">
        <h2 className="text-xl md:text-2xl xl:text-3xl font-bold text-blue-800">
          Sign Up
        </h2>

        <p className="mt-2 text-sm md:text-base xl:text-lg">
          Already have an account?&nbsp;
          <Link to={"/login"} className="font-semibold underline">
            Sign In
          </Link>
        </p>

        {error && (
          <p className="mt-2 text-sm md:text-base xl:text-lg text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(create)} className="w-full mt-2 px-2">
          <Input
            label="Full Name:"
            placeholder="Enter your full name"
            className="w-full rounded"
            {...register("name", { required: true })}
          />

          <Input
            label="Email:"
            type="email"
            placeholder="example@email.com"
            className="w-full rounded"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />

          <Input
            label="Password:"
            type="password"
            placeholder="Enter your password"
            className="w-full rounded"
            {...register("password", { required: true })}
          />

          <Button
            type="submit"
            className="block mx-auto mt-5 lg:mt-7 xl:mt-8 text-sm md:text-base xl:text-xl"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
