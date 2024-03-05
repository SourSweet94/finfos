import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import Loading from "../components/Loading";

interface AppContextProps {
  children: ReactNode;
}

interface AppProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext<AppProps>({
  loading: false,
  setLoading: () => {},
});

const AppContextProvider = ({ children }: AppContextProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {/* {loading && <Loading />} */}
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
