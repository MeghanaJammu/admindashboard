import { useEffect, useState } from "react";

export default function ThemeToggler() {
  const [dark, setDark] = useState(
    () =>
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [dark]);

  return (
    <button onClick={() => setDark(!dark)} className="p-2 border rounded">
      {dark ? "🌙" : "☀️"}
    </button>
  );
}
