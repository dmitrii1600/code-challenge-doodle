export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    const formatter = new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: false,
    });

    return formatter.format(date).replace(',', '');
};