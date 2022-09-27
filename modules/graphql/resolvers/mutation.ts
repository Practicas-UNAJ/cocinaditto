import LoginMutationHandler from "../handlers/mutation/LoginMutationHandler";
import RecipeMutationHandler from "../handlers/mutation/RecipeMutationHandler";
import RegisterMutationHandler from "../handlers/mutation/RegisterMutationHandler";

const mutationResolver = {
  register: RegisterMutationHandler,
  login: LoginMutationHandler,
  recipe: RecipeMutationHandler,
};

export default mutationResolver;
