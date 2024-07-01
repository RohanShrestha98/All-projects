import { createContext, useState, useContext, type ReactNode } from "react";

const initialState = {
  show: false,
  message: "",
  type: null as "success" | "warning" | "error" | "info" | null,
};

const ToastContext = createContext({
  toast: initialState,
  updateToast: (
    _message: string,
    _type: "success" | "warning" | "error" | "info"
  ) => {},
  setOpen: (_open: boolean) => {},
});

let timerId: ReturnType<typeof setTimeout> | null = null;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState(initialState);

  const updateToast = (
    message: string,
    type: "success" | "warning" | "error" | "info"
  ) => {
    setToast({ show: false, message, type });
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      setToast({ show: true, message, type });
    }, 100);
  };

  const setOpen = (open: boolean) =>
    setToast((toast) => ({ ...toast, show: open }));

  return (
    <ToastContext.Provider value={{ toast, updateToast, setOpen }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
