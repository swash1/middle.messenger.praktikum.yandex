export const queryStringify = (data: Record<string, string | number>) => {
    let string = '?';
    const entries = Object.entries(data);
    entries.forEach(([key, value], index) => {
        string += `${key}=${value}`;
        if (index + 1 !== entries.length) {
            string += '&';
        }
    });
    return string;
};
