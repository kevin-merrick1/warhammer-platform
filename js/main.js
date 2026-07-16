function createHeader(activePage) {
    const navigationItems = [
        { name: "Home", page: "home", href: "index.html" },
        { name: "Journey", page: "journey", href: "journey.html" },
        { name: "Factions", page: "factions", href: "factions.html" },
        { name: "Tools", page: "tools", href: "tools.html" },
        { name: "Resources", page: "resources", href: "resources.html" },
        { name: "Events", page: "events", href: "events.html" }
    ];

    const navigationLinks = navigationItems.map(function (item) {
        const activeClass = item.page === activePage ? "active" : "";

        return `
            <li>
                <a class="${activeClass}" href="${item.href}">${item.name}</a>
            </li>
        `;
    }).join("");

    return `
        <header>
            <nav>
                <a class="logo" href="index.html">Warhammer Platform</a>
                <ul>
                    ${navigationLinks}
                </ul>
            </nav>
        </header>
    `;
}

function createFooter() {
    const currentYear = new Date().getFullYear();

    return `
        <footer>
            <p>&copy; ${currentYear} Warhammer Platform</p>
        </footer>
    `;
}

function loadSharedComponents() {
    const activePage = document.body.dataset.page;
    const headerContainer = document.getElementById("site-header");
    const footerContainer = document.getElementById("site-footer");

    if (headerContainer) {
        headerContainer.innerHTML = createHeader(activePage);
    }

    if (footerContainer) {
        footerContainer.innerHTML = createFooter();
    }
}

function renderJourneyStep(journeyData, stepId) {
    const step = journeyData.steps[stepId];
    const titleElement = document.getElementById("journey-title");
    const descriptionElement = document.getElementById("journey-description");
    const optionsElement = document.getElementById("journey-options");

    if (!step || !titleElement || !descriptionElement || !optionsElement) {
        return;
    }

    titleElement.textContent = step.title;
    descriptionElement.textContent = step.description;
    optionsElement.innerHTML = "";

    if (step.options) {
        step.options.forEach(function (option) {
            const button = document.createElement("button");

            button.type = "button";
            button.textContent = option.label;
            button.addEventListener("click", function () {
                renderJourneyStep(journeyData, option.nextStep);
            });

            optionsElement.appendChild(button);
        });

        return;
    }

    if (step.nextAction) {
        const actionParagraph = document.createElement("p");

        actionParagraph.textContent = step.nextAction;
        optionsElement.appendChild(actionParagraph);
    }

    if (step.nextStep) {
        const continueButton = document.createElement("button");

        continueButton.type = "button";
        continueButton.textContent = "Continue";
        continueButton.addEventListener("click", function () {
            renderJourneyStep(journeyData, step.nextStep);
        });

        optionsElement.appendChild(continueButton);
    }
}

function loadJourneyEngine() {
    const journeyContainer = document.getElementById("journey-content");

    if (!journeyContainer) {
        return;
    }

    fetch("data/journeys/40k-beginner.json")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Journey data could not be loaded.");
            }

            return response.json();
        })
        .then(function (journeyData) {
            renderJourneyStep(journeyData, journeyData.startStep);
        })
        .catch(function (error) {
            journeyContainer.innerHTML = `<p>${error.message}</p>`;
        });
}

function initialiseSite() {
    loadSharedComponents();
    loadJourneyEngine();
}

document.addEventListener("DOMContentLoaded", initialiseSite);