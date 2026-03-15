export const decodeText = (text: string): string => {
    const doc = new DOMParser().parseFromString(text, 'text/html');
    return doc.documentElement.textContent || text;
};