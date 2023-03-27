import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/forms";
import { Button } from "@/components/ui/buttons";
import Link from "next/link";
import { api } from "@/utils/api";

const registerFormSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(2),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine(
    ({ password, confirmPassword }) => confirmPassword === password,
    (_) => ({
      message: "Passwords must be the same",
      path: ["confirmPassword"],
    })
  );

type RegisterForm = z.infer<typeof registerFormSchema>;

const RegisterPage = () => {
  const { error, isLoading, isError, mutateAsync  } = api.user.register.useMutation();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid, touchedFields },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerFormSchema) });

  const handleOnSubmit = async (data: RegisterForm) => {
    const response = await mutateAsync(data);

    console.log(response);
  };

  return (
    <div className="grid min-h-screen place-content-center bg-gray-50">
      <div className="w-screen max-w-md rounded-xl bg-white p-5 shadow-2xl">
        <h1 className="text-center text-4xl font-semibold">Sign up</h1>
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="mt-5 flex flex-col gap-3"
        >
          <Input
            label="Name"
            type={"text"}
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="Email"
            type={"email"}
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label="Password"
            type={"password"}
            error={errors.password?.message}
            {...register("password")}
          />
          <Input
            label="Confirm Password"
            type={"password"}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          <div className="py-5">
            <Button type="submit" color="primary" text="Register me" />
            <p className="mt-3 text-sm">
              Already have an accout?{" "}
              <Link className="text-blue-400" href="/auth/login">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
