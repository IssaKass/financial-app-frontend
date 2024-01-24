import { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const initialState = {
  theme: "system",
  setTimeout: () => null,
};

const ThemeContext = createContext(initialState);

export const ThemeProvider = ({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}) => {
  const [theme, setTheme] = useLocalStorage(storageKey, defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider {...props} value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
