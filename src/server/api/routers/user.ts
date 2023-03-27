import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

import { compareSync, hashSync } from "bcryptjs";

import { prisma } from "@/server/db";
import { TRPCError } from "@trpc/server";

const registerInput = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

const registerOutput = z.object({
  success: z.boolean(),
});

const loginInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const loginOutput = z.object({
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
  }),
});

const handleRegistrer = async (
  args: z.infer<typeof registerInput>
): Promise<z.infer<typeof registerOutput>> => {
  const { name, email, password } = args;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new TRPCError({ code: "CONFLICT", message: "User already exists!" });
  }

  const hashedPassword: string = hashSync(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return { success: true };
};

const handleLogin = async (
  args: z.infer<typeof loginInput>
): Promise<z.infer<typeof loginOutput>> => {
  const { email, password } = args;

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (!existingUser) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `User with ${email} not found`,
    });
  }

  if (!compareSync(password, existingUser.password!))
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid Credentials",
    });

  return {
    user: {
      id: existingUser.id,
      email: existingUser.email || "no email",
      name: existingUser.name || "no name",
    },
  };
};

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(registerInput)
    .output(registerOutput)
    .mutation(({ ctx, input }) => {
      return handleRegistrer(input);
    }),
  login: publicProcedure
    .input(loginInput)
    .output(loginOutput)
    .mutation(({ ctx, input }) => {
      return handleLogin(input);
    }),
});