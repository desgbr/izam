'use client'
import { createContext, useContext, useState } from 'react';
const AppContext = createContext();

export const useOpenSidenav = () => {
  const ctx = useContext(AppContext);
  return ctx ? ctx : null;
};

export default function AppProvider({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <AppContext.Provider value={{ open, setOpen }}>
      {children}
    </AppContext.Provider>
  );
}
