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