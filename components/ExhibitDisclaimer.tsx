import { Icon } from "@iconify/react";

const ExhibitDisclaimer = () => (
  <div className="z-20 fixed flex flex-row items-center gap-5 nav-gradient rounded-t-xl bottom-0 left-1/2 -translate-x-1/2 p-4 border-4 border-primary-700 border-b-transparent">
    <Icon icon="akar-icons:info-fill" className="text-white w-8 h-8" />
    <p className="text-white font-bold">
      Esta es una version de prueba, pueden haber fallos y funcionalidades aún
      no implementadas. La cantidad de datos mostrados tambien es limitada
    </p>
  </div>
);
export default ExhibitDisclaimer;
