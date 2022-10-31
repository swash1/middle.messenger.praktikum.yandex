const createValidationFunc = (regExp: RegExp) => {
    return (stringToValidate: string) => {
        return regExp.test(stringToValidate);
    };
};

const validationRegExps = {
    email: new RegExp(/^\S+@\S+\.\S+$/),
    login: new RegExp(/^[a-zA-Z\_\-]{2,20}$/),
    name: new RegExp(/^[A-ZА-Я][a-zA-Zа-яА-Я\-]+$/),
    phone: new RegExp(/^\+?\d{9,15}$/),
    password: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
};

export const validateEmail = createValidationFunc(validationRegExps.email);

export const validateLogin = createValidationFunc(validationRegExps.login);

export const validateName = createValidationFunc(validationRegExps.name);

export const validatePhone = createValidationFunc(validationRegExps.phone);

export const validatePassword = createValidationFunc(validationRegExps.password);
