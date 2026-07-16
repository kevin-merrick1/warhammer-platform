/*
========================================
File:
components.js

Purpose:
Creates and loads reusable site components, including
the shared header and footer.
========================================
*/

/**
 * Builds the shared site header.
 *
 * @param {string} activePage - The identifier of the current page.
 * @returns {string} The generated header HTML.
 */
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

/**
 * Builds the shared site footer.
 *
 * @returns {string} The generated footer HTML.
 */
function createFooter() {
    const currentYear = new Date().getFullYear();

    return `
        <footer>
            <p>&copy; ${currentYear} Warhammer Platform</p>
        </footer>
    `;
}

/**
 * Loads the shared site components into the current page.
 */
export function loadSharedComponents() {
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