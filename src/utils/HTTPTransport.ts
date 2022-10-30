import { queryStringify } from './helpers/queryStringify';

export interface RequestProps {
    url: string;
    options?: RequestOptions;
}

interface RequestOptions {
    headers?: Record<string, string>;
    data?: any;
    timeout?: number;
}

interface RequestParams extends RequestProps {
    method: METHODS;
}

export enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

const defaultHeaders = {
    'content-type': 'application/json',
};

export class HTTPTransport {
    static get = <T>({ url, options = {} }: RequestProps): Promise<T> => {
        if (options.data) {
            url = `${url}${queryStringify(options.data)}`;
        }

        return this.request<T>({ url, options, method: METHODS.GET });
    };

    static post = <T>({ url, options = {} }: RequestProps): Promise<T> => {
        return this.request<T>({ url, options, method: METHODS.POST });
    };

    static put = <T>({ url, options = {} }: RequestProps): Promise<T> => {
        return this.request<T>({ url, options, method: METHODS.PUT });
    };

    static delete = <T>({ url, options = {} }: RequestProps): Promise<T> => {
        return this.request<T>({ url, options, method: METHODS.DELETE });
    };

    private static request = <T>({ url, options = {}, method }: RequestParams): Promise<T> => {
        const { headers = defaultHeaders, data, timeout = 5000 } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(method, url);

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = () => {
                if (xhr.status !== 200) {
                    reject(xhr.response);
                } else {
                    resolve(xhr.response);
                }
            };

            xhr.timeout = timeout;

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            xhr.withCredentials = true;

            if (!data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}
