import { LikeMutationHandler } from "../handlers/mutation/LikeMutationHandler";
import LoginMutationHandler from "../handlers/mutation/LoginMutationHandler";
import RecipeMutationHandler from "../handlers/mutation/RecipeMutationHandler";
import RegisterMutationHandler from "../handlers/mutation/RegisterMutationHandler";

const mutationResolver = {
  register: RegisterMutationHandler,
  login: LoginMutationHandler,
  recipe: RecipeMutationHandler,
  like: LikeMutationHandler,
};

export default mutationResolver;
