export const isYouSender = (sender?: string) => sender === 'you';

export const arrayIsNotEmpty = (array: unknown[]) => {
    console.log(array);

    return Boolean(array.length);
};
