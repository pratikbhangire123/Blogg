import { Button, Input, UserAccountCard } from "./index";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { login as authLogin } from "../redux/features/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function Login() {
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
    <UserAccountCard
      title="Sign In"
      accountAvailability="Don't have an account?"
      linkSlug="/signup"
      linkText="Sign Up"
      error={error}
      onSubmitHandler={handleSubmit(login)}
    >
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
    </UserAccountCard>
  );
}
