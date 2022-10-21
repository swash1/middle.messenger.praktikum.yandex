import { queryStringify } from './queryStringify';

interface RequestProps {
    url: string;
    options: RequestOptions;
}

interface RequestOptions {
    headers?: Record<string, string>;
    data?: any;
    timeout?: number;
}

interface RequestParams extends RequestProps {
    method: METHODS;
}

enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export class HTTPTransport {
    static get = ({ url, options = {} }: RequestProps) => {
        if (options.data) {
            url = `${url}${queryStringify(options.data)}`;
        }

        return this.request({ url, options, method: METHODS.GET });
    };

    static post = ({ url, options = {} }: RequestProps) => {
        return this.request({ url, options, method: METHODS.POST });
    };

    static put = ({ url, options = {} }: RequestProps) => {
        return this.request({ url, options, method: METHODS.PUT });
    };

    static delete = ({ url, options = {} }: RequestProps) => {
        return this.request({ url, options, method: METHODS.DELETE });
    };

    static request = ({ url, options = {}, method }: RequestParams) => {
        const { headers = {}, data, timeout = 5000 } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            const isGetMethod = method === METHODS.GET;

            xhr.open(method, url);

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = () => resolve(xhr);

            xhr.timeout = timeout;

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (isGetMethod || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}
