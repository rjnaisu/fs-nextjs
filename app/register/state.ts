export type RegisterUserState = {
  errors: {
    username?: string;
    name?: string;
    password?: string;
    passwordConfirm?: string;
  };
  values: {
    username: string;
    name: string;
  };
};

export const initialRegisterUserState: RegisterUserState = {
  errors: {},
  values: {
    username: "",
    name: "",
  },
};
