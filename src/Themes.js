
import React, { createContext, useState, useEffect } from "react";

const themes = {
  dark: {
    primary: "#dddddd",
    separatorColor: "rgba(255,255,255,0.20)",
    textColor: "white",
    backgroundColor: "#121212",
    buttonColor: "rgba(255,255,255,0.05)",
    blockquoteColor: "rgba(255,255,255,0.20)",
    icon: "white"
  },
  light: {
    primary: "#999999",
    separatorColor: "rgba(0,0,0,0.08)",
    textColor: "black",
    backgroundColor: "white",
    buttonColor: "#f6f6f6",
    blockquoteColor: "rgba(0,0,0,0.80)",
    icon: "#121212"
  }
};

const setCSSVariables = theme => {
  for (const value in theme) {
    console.log(value);
    document.documentElement.style.setProperty(`--${value}`, theme[value]);
  }
};

export const ThemeSelectorContext = createContext({
  themeName: "dark",
  toggleTheme: () => {}
});

export default ({ children }) => {
  const [themeName, setThemeName] = useState("dark");
  const [theme, setTheme] = useState(themes[themeName]);

  const toggleTheme = () => {
    if (theme === themes.dark) {
      setTheme(themes.light);
      setThemeName("light");
    } else {
      setTheme(themes.dark);
      setThemeName("dark");
    }
  };

  useEffect(() => {
    setCSSVariables(theme);
  });

  return (
    <ThemeSelectorContext.Provider value={{ themeName, toggleTheme }}>
      {children}
    </ThemeSelectorContext.Provider>
  );
};
