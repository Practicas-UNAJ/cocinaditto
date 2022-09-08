import { signInWithEmailAndPassword } from "firebase/auth";
import firebaseAdmin from "../../../../libs/firebaseAdmin";
import firebaseApp from "../../../../libs/firebaseApp";
import ApolloContext from "../../types/context";
import { LoginMutationInput } from "../../types/input";

export const LoginMutationHandler = async (
  _parent: any,
  { credentials }: LoginMutationInput,
  _: ApolloContext
): Promise<string> => {
  const firebaseCredentials = await signInWithEmailAndPassword(
    firebaseApp.auth,
    credentials.email,
    credentials.password
  );

  const token = await firebaseAdmin.auth.createCustomToken(
    firebaseCredentials.user.uid
  );

  return token;
};
