import { useContext, useState, createContext, useMemo } from 'react';

type pageProps = {
  pickingList: number;
  listInquiry: number;
  orderSpreadsheet: number;
};

type AppContextType = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  pageSize: pageProps;
  setPageSize: React.Dispatch<React.SetStateAction<pageProps>>;
  isPartnerDomain: boolean;
};

type AppProviderProps = {
  children: React.ReactNode;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({
  children,
}: AppProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<pageProps>({
    pickingList: 10,
    listInquiry: 10,
    orderSpreadsheet: 10,
  });

  const isPartnerDomain = useMemo(() => {
    return window.location.host === import.meta.env.VITE_PARTNER_DOMAIN;
  }, [window.location.host]);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
        pageSize,
        setPageSize,
        isPartnerDomain,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }

  return context;
};
