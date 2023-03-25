import { env } from "@/env.mjs";
import jwt from "jsonwebtoken";

export const signToken = (id: string, email: string, name: string) => {
  return jwt.sign(
    {
      id,
      email,
      name,
    },
    env.JWT_SECRET_SEED,
    { expiresIn: "30d" }
  );
};

export const isValid = (token: string): Promise<string> => {
  if (token.length < 10) {
    return Promise.reject("Token is not valid");
  }
  return new Promise((resolve, reject) => {
    try {
        jwt.verify(token, env.JWT_SECRET_SEED, (err,decoded)=> {
            if(err) reject('jwt token is not valid');
            const { id } = decoded as { id: string};
            return resolve(id);
        })
    } catch (error) {
        return reject('jwt token is not valid');
    }
  });
};
