import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { RegisterMutationInput } from "../../types/input";
import firebaseAdmin from "../../../../libs/firebaseAdmin";
import firebaseApp from "../../../../libs/firebaseApp";
import ApolloContext from "../../types/context";

const RegisterMutationHandler = async (
  _parent: any,
  { credentials }: RegisterMutationInput,
  ctx: ApolloContext
): Promise<string> => {
  const firebaseCredentials = await createUserWithEmailAndPassword(
    firebaseApp.auth,
    credentials.email,
    credentials.password
  );

  const token = await firebaseAdmin.auth.createCustomToken(
    firebaseCredentials.user.uid
  );

  await ctx.prisma.user.create({
    data: {
      username: credentials.username,
      id: firebaseCredentials.user.uid,
    },
  });

  return token;
};

export default RegisterMutationHandler;
