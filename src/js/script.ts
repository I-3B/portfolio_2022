const body = document.body;
const toggleThemeCheckbox = document.querySelector(".toggle-theme-checkbox");
const preferenceQuery = window.matchMedia("(prefers-color-scheme: dark)");
const addDarkMode = () => {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
};

const addLightMode = () => {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
};

const toggleTheme = () => (!body.classList.contains("dark-mode") ? addDarkMode() : addLightMode());

const checkPreference = () => (preferenceQuery.matches ? addDarkMode() : addLightMode());

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
