import { EModals } from "../enums/modals";

export interface IModalContext {
  modal: EModals | null;
  unsetModal: () => void;
  setModal: (modal: EModals) => void;
}
