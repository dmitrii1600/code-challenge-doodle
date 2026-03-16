/**
 * Formats an ISO date string into a highly readable UI format (e.g., "12 Mar 2018 14:38").
 * * Leveraging the browser's native Intl.DateTimeFormat API provides robust,
 * lightweight date formatting without the need for external heavy libraries
 * like moment.js or date-fns.
 *
 * @param dateString - The raw ISO 8601 date string from the backend payload.
 * @returns The formatted date string tailored to match the provided design specs.
 */
export const formatDate = (dateString: string): string => {
    // Parse the incoming string into a native Date object
    const date = new Date(dateString);

    // Configure the formatter for the exact structure: DD MMM YYYY HH:mm
    const formatter = new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',   // e.g., "Mar"
        year: 'numeric',  // e.g., "2018"
        hour: 'numeric',
        minute: '2-digit',
        hour12: false,    // Use 24-hour format
    });

    // Native en-GB formatting usually adds a comma between the date and time.
    // We strip it out here to perfectly match the designer's mockup.
    return formatter.format(date).replace(',', '');
};