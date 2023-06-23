String.prototype.format = function() {
  var formatted = this;
  for (var i = 0; i < arguments.length; i++) {
    var regexp = new RegExp("\\{" + i + "\\}", "gi");
    formatted = formatted.replace(regexp, arguments[i]);
  }
  return formatted;
};

const i18n = {
  fr: {
    level: "niveau",
    time: "horaire",
    map: "carte",
    credits: "crédits",
    now: "à {0} la mer est à {1} mètres",
  },
  en: {
    level: "level",
    time: "time",
    map: "map",
    credits: "crédits",
    now: "at {0} the sea is {1} meters away",
  },
  de: {
    level: "Höhe",
    time: "Zeitplan",
    map: "karte",
    credits: "crédits",
    now: "um {0} Uhr ist das Meer {1} Meter entfernt",
  },
  es: {
    level: "nivel",
    time: "horario",
    map: "mapa",
    credits: "creditos",
    now: "a las {0} el mar está a {1} metros",
  },
};
var locales,
  locale = localStorage.getItem("locale") || "fr";

document.addEventListener("DOMContentLoaded", () => {
  locales = document.querySelector("nav#locales ul");
  locales.addEventListener("click", (event) => {
    changeLang(event.target.getAttribute("id"));
  });
  changeLang(locale);
});
const changeLang = (lang) => {
  locale = lang;
  locales.querySelectorAll(".active").forEach((lang) => lang.classList.remove("active"));
  locales.querySelector("#" + locale).classList.add("active");
  localStorage.setItem("locale", locale);
  translate();
};
const translate = () => {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const translation = i18n[locale][key];
    element.innerText = translation;
  });
  document.querySelectorAll("[data-i18n-dyn]").forEach((element) => {
    const values = element.getAttribute("data-values");
    if (values) {
      const key = element.getAttribute("data-i18n-dyn");
      const translation = i18n[locale][key];
      element.innerText = translation.format(...values.split(","));
    }
  });
};
