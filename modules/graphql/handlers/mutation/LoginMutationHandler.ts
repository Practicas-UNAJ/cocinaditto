import { signInWithEmailAndPassword } from "firebase/auth";
import { GraphQLError } from "graphql";
import firebaseAdmin from "../../../../libs/firebaseAdmin";
import firebaseApp from "../../../../libs/firebaseApp";
import { formatServerError } from "../../../../utils/formatServerError";
import ApolloContext from "../../types/context";
import { LoginMutationInput } from "../../types/input";

const LoginMutationHandler = async (
  _parent: any,
  { credentials }: LoginMutationInput,
  _: ApolloContext
): Promise<string> => {
  try {
    const firebaseCredentials = await signInWithEmailAndPassword(
      firebaseApp.auth,
      credentials.email,
      credentials.password
    );

    const token = await firebaseAdmin.auth.createCustomToken(
      firebaseCredentials.user.uid
    );

    return token;
  } catch (err) {
    throw new GraphQLError(JSON.stringify(formatServerError(err as Error)));
  }
};

export default LoginMutationHandler;
