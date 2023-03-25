import { z } from "zod";
import { api } from "@/utils/api";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Email from "next-auth/providers/email";
import { Input } from "@/components/form";
import Link from "next/link";
import { Button } from "@/components/ui/buttons";

interface UserRegister {
  name: string;
  email: string;
  password: string;
  rePassword: string;
}

const userRegisterSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  rePassword: z.string().min(6),
});

userRegisterSchema.refine((data) => {
  if (data.email !== data.rePassword) return false;
  return true;
});

type Props = {};

const RegisterPage = (props: Props) => {
  const { handleSubmit, register } = useForm<UserRegister>({
    defaultValues: {
      email: "cahuroca.aw@gmail.com",
      name: "Carlos Hugo Rodriguez Calderon",
      password: "pass_good",
      rePassword: "pass_good",
    },
    resolver: zodResolver(userRegisterSchema),
  });
  const { mutateAsync, data, error, isError, isLoading } =
    api.user.register.useMutation();

  const handleRegister = async ({ name, email, password }: UserRegister) => {
    // mutate({ name, email, password });
    const result = await mutateAsync({ name, email, password });
    console.log({ result });
  };

  const onSubmit = (user: UserRegister) => {
    console.log(user);
    handleRegister(user);
  };

  return (
    <div className="grid items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex py-10 w-[90dvw] bg-white max-w-md flex-col gap-3 rounded-2xl px-10 shadow-2xl"
      >
        <h1 className="mb-5 text-4xl text-center text-blue-400">
          Sign up
        </h1>
        {isError && (
          <div className="py-3 bg-red-200 rounded-lg">
            <p className="font-semibold text-center text-red-900 text-md">
              {error?.message}
            </p>
          </div>
        )}

        <Input
          label="Name"
          type="text"
          {...register("name")}
          placeholder="Jhon Doe"
        />
        <Input
          label="Email"
          type="email"
          {...register("email")}
          placeholder="jhondoe@mail.com"
        />
        <Input
          label="Password"
          type="password"
          {...register("password")}
          placeholder="*********"
        />
        <Input
          label="Confirm Password"
          type="password"
          {...register("rePassword")}
          placeholder="*********"
        />
        <div className="my-3">
          <Button
            type="submit"
            color="primary"
            text="Save"
            disabled={isLoading}
          />
        </div>
        <hr />
        <p className="text-center">
          already have an account?{" "}
          <Link className="text-indigo-400" href={"/"}>
            Sign in
          </Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
