/*
========================================
File:
main.js

Purpose:
Initialises the website by loading shared
components and page-specific functionality.
========================================
*/

import { loadSharedComponents } from "./components.js";
import { loadJourneyEngine } from "./journey-engine.js";

/**
 * Initialises the website once the page has loaded.
 */
function initialiseSite() {
    loadSharedComponents();
    loadJourneyEngine();
}

document.addEventListener("DOMContentLoaded", initialiseSite);