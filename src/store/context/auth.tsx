import { FC, createContext, useState } from "react";

interface AuthContextType {
  email: string;
  password: string;
  otp: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setOtp: (otp: string) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  email: "",
  password: "",
  otp: "",
  setEmail: () => {},
  setPassword: () => {},
  setOtp: () => {},
});

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const authContextValue: AuthContextType = {
    email,
    password,
    otp,
    setEmail,
    setPassword,
    setOtp,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
