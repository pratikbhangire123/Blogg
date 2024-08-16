import { useForm } from "react-hook-form";
import { Input, Button, UserAccountCard } from "./index";
import { useState } from "react";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/features/authSlice";

export default function SignUp() {
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
    <UserAccountCard
      title="Sign Up"
      accountAvailability="Already have an account?"
      linkSlug="/login"
      linkText="Sign In"
      error={error}
      onSubmitHandler={handleSubmit(create)}
    >
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
    </UserAccountCard>
  );
}
