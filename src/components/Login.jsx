import { Button, Input } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { login as authLogin } from "../redux/features/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (data) => {
    setError("");

    try {
      const session = await authService.login(data);

      if (session) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(authLogin(userData));

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
          Sign In
        </h2>

        <p className="mt-2 text-sm md:text-base xl:text-lg">
          Don&apos;t have an account?&nbsp;
          <Link to={"/signup"} className="font-semibold underline">
            Sign Up
          </Link>
        </p>

        {error && (
          <p className="mt-2 text-sm md:text-base xl:text-lg text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(login)} className="w-full mt-2 px-2">
          <Input
            label="Email:"
            type="email"
            placeholder="example@email.com"
            className="w-full rounded"
            {...register("email", {
              required: true,
              /*TODO: Validation*/
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
            Sign In
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Login;
