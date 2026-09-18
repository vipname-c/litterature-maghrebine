"use strict";

/* =========================================================
   CINEMATIC INTRO
   ========================================================= */

const cinematicIntro = document.querySelector(".cinematic-intro");

if (cinematicIntro) {

    window.setTimeout(() => {

        cinematicIntro.remove();

    }, 2400);

}

/* =========================================================
   AUTHOR DATA
   ========================================================= */

const authors = [
    {
        country: "MAROC",
        name: "Ahmed Sefrioui",
        work: "La Boîte à merveilles",
        description: [
            "Ahmed Sefrioui est un écrivain marocain d’expression française. Son œuvre met notamment en valeur la culture, les traditions et la vie quotidienne marocaines.",
            "Son roman le plus célèbre, La Boîte à merveilles, publié en 1954, raconte l’enfance de Sidi Mohammed dans la médina de Fès."
        ]
    },

    {
        country: "MAROC",
        name: "Tahar Ben Jelloun",
        work: "L’Enfant de sable",
        description: [
            "Tahar Ben Jelloun est un écrivain marocain d’expression française. Son œuvre aborde notamment l’identité, la société marocaine et les rapports entre tradition et modernité.",
            "Parmi ses œuvres les plus connues figure L’Enfant de sable."
        ]
    },

    {
        country: "ALGÉRIE",
        name: "Assia Djebar",
        work: "L’Amour, la Fantasia",
        description: [
            "Assia Djebar est une écrivaine algérienne d’expression française. Son œuvre s’intéresse notamment à la mémoire, à l’histoire de l’Algérie et à la condition des femmes.",
            "Parmi ses œuvres importantes figure L’Amour, la Fantasia."
        ]
    },

    {
        country: "ALGÉRIE",
        name: "Kateb Yacine",
        work: "Nedjma",
        description: [
            "Kateb Yacine est un écrivain et poète algérien d’expression française. Son œuvre est fortement marquée par l’histoire et la question de l’identité algérienne.",
            "Son roman le plus célèbre est Nedjma."
        ]
    }
];


/* =========================================================
   AUTHOR INTERACTION
   ========================================================= */

const authorButtons = document.querySelectorAll(".author-button");

const authorIndex = document.querySelector(".author-feature-index");
const authorCountry = document.querySelector(".author-feature-country");
const authorName = document.querySelector(".author-feature-name");
const authorWork = document.querySelector(".author-feature-work");
const authorDescription = document.querySelector(".author-description");


function updateAuthor(index) {

    const author = authors[index];

    if (!author) return;

    authorIndex.textContent = String(index + 1).padStart(2, "0");

    authorCountry.textContent = author.country;

    authorName.textContent = author.name;

    authorWork.textContent = author.work;

    authorDescription.innerHTML = `
        <p>${author.description[0]}</p>
        <p>${author.description[1]}</p>
    `;

    authorButtons.forEach((button, buttonIndex) => {
        button.classList.toggle(
            "is-active",
            buttonIndex === index
        );
    });
}


authorButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const index = Number(button.dataset.author);

        updateAuthor(index);

    });

});


/* =========================================================
   NAVIGATION MENU
   ========================================================= */

const menuButton = document.querySelector(".menu-button");
const navigationMenu = document.querySelector(".navigation-menu");
const navigationClose = document.querySelector(".navigation-close");
const navigationLinks = document.querySelectorAll(".navigation-links a");


function openMenu() {

    navigationMenu.classList.add("is-open");

    menuButton.setAttribute("aria-expanded", "true");

    navigationMenu.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
}


function closeMenu() {

    navigationMenu.classList.remove("is-open");

    menuButton.setAttribute("aria-expanded", "false");

    navigationMenu.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}


menuButton.addEventListener("click", openMenu);

navigationClose.addEventListener("click", closeMenu);


navigationLinks.forEach((link) => {

    link.addEventListener("click", closeMenu);

});


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".introduction-body, " +
    ".definition-formula, " +
    ".definition-explanation, " +
    ".characteristics-list, " +
    ".authors-exhibition, " +
    ".conclusion-body"
);


revealElements.forEach((element) => {

    element.classList.add("reveal");

});


const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");

            observer.unobserve(entry.target);

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================================
   HERO MOUSE MOVEMENT
   ========================================================= */

const hero = document.querySelector(".hero");
const heroContent = document.querySelector(".hero-content");
const heroVisual = document.querySelector(".hero-visual");


if (hero && heroContent && heroVisual) {

    hero.addEventListener("mousemove", (event) => {

        const rect = hero.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const moveX = (x / rect.width - 0.5) * 10;
        const moveY = (y / rect.height - 0.5) * 10;

        heroContent.style.transform =
            `translate(${moveX}px, ${moveY}px)`;

        heroVisual.style.transform =
            `translate(${moveX * -0.5}px, calc(-50% + ${moveY * -0.5}px))`;

    });


    hero.addEventListener("mouseleave", () => {

        heroContent.style.transform = "translate(0, 0)";

        heroVisual.style.transform =
            "translate(0, -50%)";

    });

}


/* =========================================================
   SECTION PROGRESS
   ========================================================= */

const sections = document.querySelectorAll(
    "#introduction, " +
    "#definition, " +
    "#characteristics, " +
    "#authors, " +
    "#conclusion"
);

const progressCurrent = document.querySelector(
    ".nav-progress-current"
);


const progressObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            const index =
                Array.from(sections).indexOf(entry.target) + 1;

            progressCurrent.textContent =
                String(index).padStart(2, "0");

        });

    },
    {
        rootMargin: "-35% 0px -55% 0px"
    }
);


sections.forEach((section) => {

    progressObserver.observe(section);

});


/* =========================================================
   INITIAL STATE
   ========================================================= */

updateAuthor(0);