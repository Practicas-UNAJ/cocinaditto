import { EModals } from "../enums/modals";
import { UserCredential } from "firebase/auth";
import { IUser } from "./user";
import { EToasts } from "../enums/toasts";
import { createContext, Dispatch, SetStateAction } from "react";
import { RecipeQuerySortBy, RecipeQuerySortOrder } from "../apollo/enum";
import { ModalsProps } from "../components/Modal";

export interface IModalContext {
  modal: EModals | null;
  unsetModal: () => void;
  setModal: (ev: any, modal: EModals, props: ModalsProps) => void;
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

export interface ISortModifier {
  sortBy: RecipeQuerySortBy;
  sortOrder: RecipeQuerySortOrder;
}

export const SortContext = createContext<
  [ISortModifier, Dispatch<SetStateAction<ISortModifier>>] | null
>(null);
