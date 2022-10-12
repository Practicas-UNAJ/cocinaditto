import { createUserWithEmailAndPassword } from "firebase/auth";
import { RegisterMutationInput } from "../../types/input";
import { v4 } from "uuid";
import firebaseAdmin from "../../../../libs/firebaseAdmin";
import firebaseApp from "../../../../libs/firebaseApp";
import ApolloContext from "../../types/context";
import generateImage from "../../../../utils/generateImage";
import uploadImage from "../../../firebase/uploadImage";

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

  const image = generateImage(firebaseCredentials.user.uid);
  const uuid = v4();
  const result = await uploadImage(
    image,
    `users/${firebaseCredentials.user.uid}/${uuid}.png`
  );

  await ctx.prisma.user.create({
    data: {
      username: credentials.username,
      id: firebaseCredentials.user.uid,
      thumbnail: result.downloadUrl,
    },
  });

  return token;
};

export default RegisterMutationHandler;
