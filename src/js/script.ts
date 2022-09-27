const body = document.body;
const toggleThemeCheckbox = document.querySelector(".toggle-theme-checkbox") as HTMLInputElement;
const pageHeader = document.querySelector(".page-header") as HTMLElement;
const headerMenu = document.querySelector("#menu");
const headerMenuCheckBox = document.querySelector("#menuToggle>input") as HTMLInputElement;
const preferenceQuery = window.matchMedia("(prefers-color-scheme: dark)");
const themeLS = localStorage.getItem("theme");
const images = document.querySelectorAll("img") as NodeListOf<HTMLImageElement>;
const logoAnchor = document.querySelector(".logo") as HTMLAnchorElement;
let prevScrollPos = window.pageYOffset;
window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    const headerHight = pageHeader.offsetHeight;
    if (prevScrollPos > currentScrollPos) {
        pageHeader.style.top = "0";
    } else if (!headerMenuCheckBox.checked) {
        pageHeader.style.top = `-${10 + headerHight}px`;
    }
    prevScrollPos = currentScrollPos;
};
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
    headerMenuCheckBox.checked = false;
});
logoAnchor.addEventListener("click", (e) => {
    e.preventDefault();
    window.history.replaceState(undefined, undefined, window.location.origin);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
