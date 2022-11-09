import { EModals } from "../enums/modals";
import { UserCredential } from "firebase/auth";
import { IUser } from "./user";

export interface IModalContext {
  modal: EModals | null;
  unsetModal: () => void;
  setModal: (modal: EModals) => void;
}

export interface IAuthContext {
  currentUser: IUser | null;
  signIn: (token: string) => Promise<UserCredential>;
  signOut: () => any;
  signUp: (token: string) => Promise<UserCredential>;
  fetch: () => Promise<void>;
}
