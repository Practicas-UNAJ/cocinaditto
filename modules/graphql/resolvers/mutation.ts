import { LoginMutationHandler } from "../handlers/mutation/LoginMutationHandler";
import RegisterMutationHandler from "../handlers/mutation/RegisterMutationHandler";

const mutationResolver = {
  register: RegisterMutationHandler,
  login: LoginMutationHandler,
};

export default mutationResolver;
