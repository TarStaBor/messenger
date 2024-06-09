import { API } from '../constants';
import queryString from './queryString';

const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
} as const;

type HTTPMethod = keyof typeof HTTP_METHODS;

type Options = {
    method: HTTPMethod;
    data?: PlainObject | FormData;
    headers?: Record<string, string>;
    timeout?: number;
    withCredentials?: boolean;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

type HTTPTransportMethod = (url: string, options?: OptionsWithoutMethod) => Promise<XMLHttpRequest>;

export default class HTTPTransport {
    private path: string;

    constructor(apiRoute: string) {
        this.path = API + apiRoute;
    }

    get: HTTPTransportMethod = (url, options = {}) => {
        return this.request(
            url,
            { ...options, method: HTTP_METHODS.GET },
            options.timeout,
            options.withCredentials
        );
    };

    post: HTTPTransportMethod = (url, options = {}) => {
        return this.request(
            url,
            { ...options, method: HTTP_METHODS.POST },
            options.timeout,
            options.withCredentials
        );
    };

    put: HTTPTransportMethod = (url, options = {}) => {
        return this.request(
            url,
            { ...options, method: HTTP_METHODS.PUT },
            options.timeout,
            options.withCredentials
        );
    };

    delete: HTTPTransportMethod = (url, options = {}) => {
        return this.request(
            url,
            { ...options, method: HTTP_METHODS.DELETE },
            options.timeout,
            options.withCredentials
        );
    };

    request(
        url: string,
        options: Options = { method: HTTP_METHODS.GET },
        timeout = 5000,
        withCredentials = true
    ): Promise<XMLHttpRequest> {
        const { data, method, headers = {} } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            let urlWithBasepathAndParams = this.path + url;
            if (method === HTTP_METHODS.GET && data && !(data instanceof FormData)) {
                urlWithBasepathAndParams = `${url}${queryString(data)}`;
            }

            xhr.open(method, urlWithBasepathAndParams);

            if (data && !(data instanceof FormData)) {
                headers['Content-Type'] = 'application/json';
            }

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.timeout = timeout;

            xhr.onload = () => {
                resolve(xhr);
            };

            xhr.withCredentials = withCredentials;
            xhr.onabort = reject;
            xhr.onerror = () => reject();
            xhr.ontimeout = reject;

            if (method === HTTP_METHODS.GET || !data) {
                xhr.send();
            } else if ((headers['Content-Type'] === 'application/json')) {
                xhr.send(JSON.stringify(data));
            } else {
                xhr.send(data as FormData);
            }
        });
    }
}
