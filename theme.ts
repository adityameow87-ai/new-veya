export type ThemePreference = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "veya:theme";

/**
 * Synchronous script executed before first paint (inlined in <body>) so the
 * correct theme attribute exists before the browser renders anything.
 * Preference "system" resolves via prefers-color-scheme.
 */
export const themeInitScript = `(function(){try{var d=document.documentElement;var p="system";try{p=localStorage.getItem("${THEME_STORAGE_KEY}")||"system";}catch(e){}if(p!=="light"&&p!=="dark"&&p!=="system"){p="system";}var m=false;try{m=window.matchMedia("(prefers-color-scheme: dark)").matches;}catch(e){}var r=p==="system"?(m?"dark":"light"):p;d.setAttribute("data-theme",r);d.setAttribute("data-theme-preference",p);d.style.colorScheme=r;}catch(e){}})();`;
