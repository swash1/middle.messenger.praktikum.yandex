import { Input } from '../../common-components';

interface Params {
    inputs: Input[];
    formSelector: string;
    extraValidationFunc?: (formData: FormData) => boolean;
    validationFailureCallback?: () => void;
    onSuccess?: (response: any) => void;
    onError?: (error: any) => void;
    api: (data: string) => Promise<any>;
}

export const sendForm = async ({
    inputs,
    formSelector,
    extraValidationFunc,
    validationFailureCallback,
    onSuccess,
    onError,
    api,
}: Params) => {
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

    let data;
    try {
        data = JSON.stringify(formDataObj);
    } catch {
        throw Error('Error while parsing form data');
    }

    api(data)
        .then((response) => {
            if (onSuccess) {
                onSuccess(response);
            }
        })
        .catch((error) => {
            if (onError) {
                onError(error);
            }
        });
};
