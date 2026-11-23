// Shared helpers used by every page.

const API_URL = '/api';

/**
 * Sends a request to the REST API and returns the parsed JSON response.
 * Throws an Error with a readable message when the server responds with an error.
 */
async function apiRequest(path, options = {}) {
    const response = await fetch(API_URL + path, {
        headers: { 'Content-Type': 'application/json' },
        ...options
    });

    if (!response.ok) {
        throw new Error(await readErrorMessage(response));
    }

    // 204 No Content (e.g. after DELETE) has no body
    return response.status === 204 ? null : response.json();
}

/** Builds a readable error message from a Spring Boot error response. */
async function readErrorMessage(response) {
    try {
        const body = await response.json();
        if (body.errors && body.errors.length > 0) {
            return body.errors
                .map(error => `${error.field}: ${error.defaultMessage}`)
                .join('\n');
        }
        return body.message || `Request failed (${response.status})`;
    } catch {
        return `Request failed (${response.status})`;
    }
}

/** Escapes text before inserting it into HTML, so user input cannot inject markup. */
function escapeHtml(text) {
    const element = document.createElement('div');
    element.textContent = text ?? '';
    return element.innerHTML;
}

/** Reads a parameter from the page address, e.g. ?id=5 */
function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
}

/** Shows a success or error message in the given element. */
function showMessage(element, text, type) {
    element.textContent = text;
    element.className = `message ${type}`;
    element.hidden = false;
}