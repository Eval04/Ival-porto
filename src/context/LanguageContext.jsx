import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "./translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    // 1. Check local storage
    const saved = localStorage.getItem("lang");
    if (saved === "id" || saved === "en") return saved;

    // 2. Detect browser preference
    const isIndo = navigator.languages
      ? navigator.languages.some(l => l.toLowerCase().startsWith("id"))
      : (navigator.language || "").toLowerCase().startsWith("id");

    return isIndo ? "id" : "en";
  });

  useEffect(() => {
    // Update lang attribute on html tag
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
  };

  const t = (path) =>
    path.split(".").reduce((res, key) => (res && res[key] !== undefined ? res[key] : null), translations[lang]) ?? path;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
