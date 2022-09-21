var body = document.body;
var toggleThemeCheckbox = document.querySelector(".toggle-theme-checkbox");
var headerMenu = document.querySelector("#menu");
var headerMenuCheckBox = document.querySelector("#menuToggle>input");
var preferenceQuery = window.matchMedia("(prefers-color-scheme: dark)");
var themeLS = localStorage.getItem("theme");
var images = document.querySelectorAll("img");
images.forEach(function (img) {
    var src = img.src;
    img.src = "/assets/images/loading.svg";
    img.onload = function () { return (img.src = src); };
});
var addDarkMode = function () {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
};
var addLightMode = function () {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    localStorage.setItem("theme", "light");
};
headerMenu.addEventListener("click", function (e) {
    var el = e.target;
    if (el.tagName === "A") {
        headerMenuCheckBox.checked = false;
    }
});
var toggleTheme = function () { return (!body.classList.contains("dark-mode") ? addDarkMode() : addLightMode()); };
var checkPreference = function () {
    return !themeLS ? (preferenceQuery.matches ? addDarkMode() : addLightMode()) : null;
};
var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        entry.target.classList.toggle("show", entry.isIntersecting);
    });
});
var hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach(function (e) {
    observer.observe(e);
});
toggleThemeCheckbox.addEventListener("change", toggleTheme);
preferenceQuery.addEventListener("change", checkPreference);
window.addEventListener("DOMContentLoaded", checkPreference);
if (themeLS === "dark") {
    addDarkMode();
}
else if (themeLS === "light") {
    addLightMode();
}
