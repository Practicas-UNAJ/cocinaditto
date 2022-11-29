import { User } from "@prisma/client";
import { getAuth } from "firebase-admin/auth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../libs/prisma";
import ApolloContext from "./types/context";

export const createContext = async ({
  req,
  _,
}: {
  req: NextApiRequest;
  _: NextApiResponse;
}): Promise<ApolloContext> => {
  const regex = /Bearer (.+)/i;
  let user: User | null = null;

  if (req.headers.authorization) {
    const { authorization, ...headers } = req.headers;
    const idToken = authorization.match(regex)?.[1];

    if (idToken) {
      const token = await getAuth().verifyIdToken(idToken);

      user = await prisma.user.findUnique({
        where: {
          id: token.uid,
        },
      });
    }
  }
  return {
    prisma,
    user,
  };
};
