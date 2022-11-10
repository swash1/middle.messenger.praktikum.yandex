import sinon, { SinonFakeXMLHttpRequest } from 'sinon';
import { expect } from 'chai';

import { HTTPTransport } from '../HTTPTransport';

const xhr = sinon.useFakeXMLHttpRequest();

let requests: SinonFakeXMLHttpRequest[] = [];

xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
    requests.push(request);
};

// @ts-ignore
global.XMLHttpRequest = xhr;

describe('Модуль отправки запросов', () => {
    beforeEach(() => {
        requests = [];
    });

    it('Отправляет GET запросы', () => {
        HTTPTransport.get({ url: '/url' });

        const request = requests[0];

        expect(request.method).to.eq('GET');
    });

    it('Отправляет POST запросы', () => {
        HTTPTransport.post({ url: '/url' });

        const request = requests[0];

        expect(request.method).to.eq('POST');
    });

    it('Отправляет PUT запросы', () => {
        HTTPTransport.put({ url: '/url' });

        const request = requests[0];

        expect(request.method).to.eq('PUT');
    });

    it('Отправляет DELETE запросы', () => {
        HTTPTransport.delete({ url: '/url' });

        const request = requests[0];

        expect(request.method).to.eq('DELETE');
    });

    it('Корректно формирует тело POST запроса', () => {
        HTTPTransport.post({ url: '/url', options: { data: { param: 'value' } } });

        const request = requests[0];

        expect(request.requestBody).to.eq('{"param":"value"}');
    });

    it('Корректно формирует тело PUT запроса', () => {
        HTTPTransport.put({ url: '/url', options: { data: { param: 'value' } } });

        const request = requests[0];

        expect(request.requestBody).to.eq('{"param":"value"}');
    });

    it('Корректно формирует тело DELETE запроса', () => {
        HTTPTransport.delete({ url: '/url', options: { data: { param: 'value' } } });

        const request = requests[0];

        expect(request.requestBody).to.eq('{"param":"value"}');
    });

    it('Корректно формирует URL GET запроса по переданным параметрам', () => {
        HTTPTransport.get({
            url: '/url',
            options: {
                data: {
                    param: 'value',
                    param2: 'value2',
                },
            },
        });

        const request = requests[0];

        expect(request.url).to.eq('/url?param=value&param2=value2');
    });
});
