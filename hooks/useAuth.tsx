import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("useAuth can only be used inside AuthProvider");

  return context;
};

export default useAuth;
