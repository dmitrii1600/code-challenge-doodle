/**
 * Safely decodes HTML entities (e.g., &#39; to ') received from the backend.
 * * By leveraging the browser's native DOMParser, this utility converts entities
 * back to readable characters without executing any potential malicious scripts.
 * This is a secure alternative to React's `dangerouslySetInnerHTML`,
 * ensuring XSS (Cross-Site Scripting) protection.
 *
 * @param text - The raw string from the API, potentially containing HTML entities.
 * @returns The decoded, safe plain text string ready for UI rendering.
 */
export const decodeText = (text: string): string => {
    // Parse the string into a temporary, isolated HTML document in memory
    const doc = new DOMParser().parseFromString(text, 'text/html');

    // Extract only the safe text content, stripping any hidden HTML tags,
    // or fallback to the original text if parsing fails
    return doc.documentElement.textContent || text;
};