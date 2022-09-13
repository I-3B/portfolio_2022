var body = document.body;
var toggleThemeCheckbox = document.querySelector(".toggle-theme-checkbox");
var preferenceQuery = window.matchMedia("(prefers-color-scheme: dark)");
var addDarkMode = function () {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
};
var addLightMode = function () {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
};
var toggleTheme = function () { return (!body.classList.contains("dark-mode") ? addDarkMode() : addLightMode()); };
var checkPreference = function () { return (preferenceQuery.matches ? addDarkMode() : addLightMode()); };
toggleThemeCheckbox.addEventListener("change", toggleTheme);
preferenceQuery.addEventListener("change", checkPreference);
window.addEventListener("DOMContentLoaded", checkPreference);
