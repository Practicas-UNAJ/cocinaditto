import { EModals } from "../enums/modals";
import { UserCredential } from "firebase/auth";
import { IUser } from "./user";
import { EToasts } from "../enums/toasts";

export interface IModalContext {
  modal: EModals | null;
  unsetModal: () => void;
  setModal: (ev: any, modal: EModals) => void;
}

export interface IAuthContext {
  currentUser: IUser | null;
  signIn: (token: string) => Promise<UserCredential>;
  signOut: () => any;
  signUp: (token: string) => Promise<UserCredential>;
  fetch: () => Promise<void>;
}

export interface IToastContext {
  showToast: (toast: EToasts, message: string) => void;
}
