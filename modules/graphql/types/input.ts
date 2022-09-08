export interface RegisterMutationInput {
  credentials: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  };
}

export interface LoginMutationInput {
  credentials: {
    email: string;
    password: string;
  };
}
