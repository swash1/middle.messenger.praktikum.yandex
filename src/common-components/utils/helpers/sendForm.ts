import { Input } from '../../components/input/input';

interface Params {
    inputs: Input[];
    formSelector: string;
    extraValidationFunc?: (formData: FormData) => boolean;
    validationFailureCallback?: () => void;
}

export const sendForm = ({ inputs, formSelector, extraValidationFunc, validationFailureCallback }: Params) => {
    const form: HTMLFormElement | null = document.querySelector(formSelector);

    if (!form) {
        throw `Form node by selector ${formSelector} wasn't found!`;
    }

    const formData = new FormData(form);

    let formIsValid = true;
    for (const input of inputs) {
        const inputIsValid = input.validate();

        if (!formIsValid) {
            continue;
        }

        formIsValid = inputIsValid;
    }

    if (extraValidationFunc) {
        formIsValid = extraValidationFunc(formData);
    }

    if (!formIsValid) {
        if (validationFailureCallback) {
            validationFailureCallback();
        }
        return;
    }

    const formDataObj = {} as Record<string | number, any>;
    formData.forEach((value, key) => (formDataObj[key] = value));

    console.log(formDataObj);
};
