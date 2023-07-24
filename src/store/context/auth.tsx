import { FC, createContext, useState } from "react";

export enum VerificationType {
  ConfirmEmail = "confirmEmail",
  ForgotPassword = "forgotPassword",
}

interface AuthContextType {
  email: string;
  password: string;
  otp: string;
  verificationType: VerificationType;
  message: string;
  modal: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setOtp: (otp: string) => void;
  setVerificationType: (verificationType: VerificationType) => void;
  setMessage: (message: string) => void;
  setModal: (status: boolean) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  email: "",
  password: "",
  otp: "",
  verificationType: VerificationType.ConfirmEmail,
  message: "",
  modal: false,
  setEmail: () => {},
  setPassword: () => {},
  setOtp: () => {},
  setVerificationType: () => {},
  setMessage: () => {},
  setModal: () => {},
});

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationType, setVerificationType] = useState<VerificationType>(
    VerificationType.ConfirmEmail
  );
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(false);

  const authContextValue: AuthContextType = {
    email,
    password,
    otp,
    verificationType,
    message,
    modal,
    setEmail,
    setPassword,
    setOtp,
    setVerificationType,
    setMessage,
    setModal,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
