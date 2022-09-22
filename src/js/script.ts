const body = document.body;
const toggleThemeCheckbox = document.querySelector(".toggle-theme-checkbox") as HTMLInputElement;
const headerMenu = document.querySelector("#menu");
const headerMenuCheckBox = document.querySelector("#menuToggle>input") as HTMLInputElement;
const preferenceQuery = window.matchMedia("(prefers-color-scheme: dark)");
const themeLS = localStorage.getItem("theme");
const images = document.querySelectorAll("img") as NodeListOf<HTMLImageElement>;
images.forEach((img) => {
    if (!img.complete) {
        img.style.backgroundImage = "url(/assets/images/loading.svg)";
        img.style.setProperty("object-position", "-99999px 99999px");
    }
    img.onload = () => {
        img.style.setProperty("object-position", "initial");
        img.style.backgroundImage = "";
    };
});
const addDarkMode = () => {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
};

const addLightMode = () => {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    localStorage.setItem("theme", "light");
};

headerMenu.addEventListener("click", (e) => {
    const el = e.target as HTMLElement;
    if (el.tagName === "A") {
        headerMenuCheckBox.checked = false;
    }
});
const toggleTheme = () => (!body.classList.contains("dark-mode") ? addDarkMode() : addLightMode());

const checkPreference = () =>
    !themeLS ? (preferenceQuery.matches ? addDarkMode() : addLightMode()) : null;

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        entry.target.classList.toggle("show", entry.isIntersecting);
    });
});
const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((e) => {
    observer.observe(e);
});
toggleThemeCheckbox.addEventListener("change", toggleTheme);
preferenceQuery.addEventListener("change", checkPreference);
window.addEventListener("DOMContentLoaded", checkPreference);
if (themeLS === "dark") {
    addDarkMode();
} else if (themeLS === "light") {
    addLightMode();
}
