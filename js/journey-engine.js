/*
========================================
File:
journey-engine.js

Purpose:
Loads journey data and renders each step
of the beginner decision engine.
========================================
*/

/**
 * Creates a journey navigation button.
 *
 * @param {string} label - Text displayed on the button.
 * @param {Function} clickHandler - Function run when clicked.
 * @param {string} className - CSS class applied to the button.
 * @returns {HTMLButtonElement} The generated button.
 */
function createJourneyButton(label, clickHandler, className) {
    const button = document.createElement("button");

    button.type = "button";
    button.className = className;
    button.textContent = label;
    button.addEventListener("click", clickHandler);

    return button;
}

/**
 * Creates a labelled list of journey items.
 *
 * @param {string} heading - Heading displayed above the list.
 * @param {string[]} items - Items displayed in the list.
 * @returns {HTMLElement|null} The generated section or null.
 */
function createJourneyList(heading, items) {
    if (!items || items.length === 0) {
        return null;
    }

    const section = document.createElement("div");
    const title = document.createElement("h3");
    const list = document.createElement("ul");

    section.className = "journey-detail";
    title.textContent = heading;

    items.forEach(function (item) {
        const listItem = document.createElement("li");

        listItem.textContent = item;
        list.appendChild(listItem);
    });

    section.appendChild(title);
    section.appendChild(list);

    return section;
}

/**
 * Renders supporting information for a journey step.
 *
 * @param {object} step - Journey step being displayed.
 * @param {HTMLElement} optionsElement - Journey options container.
 */
function renderStepDetails(step, optionsElement) {
    if (step.nextAction) {
        const actionParagraph = document.createElement("p");

        actionParagraph.className = "journey-next-action";
        actionParagraph.textContent = step.nextAction;
        optionsElement.appendChild(actionParagraph);
    }

    if (step.estimatedTime) {
        const timeParagraph = document.createElement("p");

        timeParagraph.className = "journey-estimated-time";
        timeParagraph.textContent = `Estimated time: ${step.estimatedTime}`;
        optionsElement.appendChild(timeParagraph);
    }

    const resourcesList = createJourneyList("Recommended resources", step.resources);
    const toolsList = createJourneyList("Relevant tools", step.tools);

    if (resourcesList) {
        optionsElement.appendChild(resourcesList);
    }

    if (toolsList) {
        optionsElement.appendChild(toolsList);
    }

    if (step.actionLink) {
        const actionLink = document.createElement("a");

        actionLink.className = "journey-action-link";
        actionLink.href = step.actionLink.href;
        actionLink.textContent = step.actionLink.label;
        optionsElement.appendChild(actionLink);
    }
}

/**
 * Renders a journey step on the page.
 *
 * @param {object} journeyData - Complete journey data.
 * @param {string} stepId - Identifier of the step to render.
 */
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
            const optionButton = createJourneyButton(
                option.label,
                function () {
                    renderJourneyStep(journeyData, option.nextStep);
                },
                "journey-option-button"
            );

            optionsElement.appendChild(optionButton);
        });

        return;
    }

    renderStepDetails(step, optionsElement);

    if (step.nextStep) {
        const continueButton = createJourneyButton(
            "Continue",
            function () {
                renderJourneyStep(journeyData, step.nextStep);
            },
            "journey-continue-button"
        );

        optionsElement.appendChild(continueButton);
    }

    const restartButton = createJourneyButton(
        "Start again",
        function () {
            renderJourneyStep(journeyData, journeyData.startStep);
        },
        "journey-restart-button"
    );

    optionsElement.appendChild(restartButton);
}

/**
 * Loads the beginner journey data and starts the decision engine.
 */
export function loadJourneyEngine() {
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