var body = document.body;
var toggleThemeCheckbox = document.querySelector(".toggle-theme-checkbox");
var pageHeader = document.querySelector(".page-header");
var headerMenu = document.querySelector("#menu");
var headerMenuCheckBox = document.querySelector("#menuToggle>input");
var preferenceQuery = window.matchMedia("(prefers-color-scheme: dark)");
var themeLS = localStorage.getItem("theme");
var images = document.querySelectorAll("img");
var logoAnchor = document.querySelector(".logo");
var prevScrollPos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    var headerHight = pageHeader.offsetHeight;
    if (prevScrollPos > currentScrollPos) {
        pageHeader.style.top = "0";
    }
    else if (!headerMenuCheckBox.checked) {
        pageHeader.style.top = "-" + (10 + headerHight) + "px";
    }
    prevScrollPos = currentScrollPos;
};
images.forEach(function (img) {
    if (!img.complete) {
        img.style.backgroundImage = "url(/assets/images/loading.svg)";
        img.style.setProperty("object-position", "-99999px 99999px");
    }
    img.onload = function () {
        img.style.setProperty("object-position", "initial");
        img.style.backgroundImage = "";
    };
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
    headerMenuCheckBox.checked = false;
});
logoAnchor.addEventListener("click", function (e) {
    e.preventDefault();
    window.history.replaceState(undefined, undefined, window.location.origin);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
