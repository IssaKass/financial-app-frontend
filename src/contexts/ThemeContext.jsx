import {
  FINANCIAL_UI_COLOR_MODE_KEY,
  FINANCIAL_UI_THEME_KEY,
} from "@/utils/keys";
import { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/use-local-storage";

export const COLOR_MODES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
};

export const THEMES = {
  DEFAULT: "default",
  SOFT_BLUE: "soft-blue",
  GREEN: "green",
};

const initialState = {
  colorMode: COLOR_MODES.LIGHT,
  theme: THEMES.DEFAULT,
};

const ThemeContext = createContext(initialState);

export const ThemeProvider = ({
  children,
  defaultColorMode = COLOR_MODES.LIGHT,
  defaultTheme = THEMES.DEFAULT,
  ...props
}) => {
  const [colorMode, setColorMode] = useLocalStorage(
    FINANCIAL_UI_COLOR_MODE_KEY,
    defaultColorMode,
  );
  const [theme, setTheme] = useLocalStorage(
    FINANCIAL_UI_THEME_KEY,
    defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (colorMode === "system") {
      const systemColorMode = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemColorMode);
      return;
    }

    root.classList.add(colorMode);
  }, [colorMode]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.dataset.theme = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider
      {...props}
      value={{ colorMode, setColorMode, theme, setTheme }}
    >
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
