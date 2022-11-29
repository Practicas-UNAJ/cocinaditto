import ApolloContext from "../types/context";

const Union = {
  RecipeMutationResult: {
    __resolveType(_parent: any, _: ApolloContext, __: any) {
      if (_parent.deleted) return "DeleteResult";
      if (_parent.edited) return "EditResult";

      return "CreateResult";
    },
  },
};

export default Union;
