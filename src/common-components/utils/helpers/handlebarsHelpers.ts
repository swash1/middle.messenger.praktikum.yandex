export const isYouSender = (sender?: string) => sender === 'you';

export const arrayIsNotEmpty = (array: any[]) => {
    console.log(array);

    return Boolean(array.length);
};
