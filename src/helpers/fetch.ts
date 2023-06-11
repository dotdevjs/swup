import axios from 'axios';

import { AxiosResponse } from 'axios';
import { TransitionOptions } from '../modules/loadPage.js';
import { Options } from '../Swup.js';

type FetchOptionsType = TransitionOptions & { headers: Options['requestHeaders'] } & {
	signal?: AbortController['signal'];
};

export const fetch = (setOptions: FetchOptionsType, callback: (request: any) => void) => {
	let defaults = {
		url: window.location.pathname + window.location.search,
		method: 'GET',
		data: null,
		headers: {}
	};

	let options = {
		...defaults,
		...setOptions
	};

	axios({
		method: options.method,
		url: options.url,
		headers: options.headers,
		data: options.data,
		signal: options.signal
	})
		.then(function (response: AxiosResponse) {
			//console.log('[axios] success', response);
			callback(response.request);
		})
		.catch(function (error) {
			//console.log('[axios] Error', error);
			if (error.response) {
				callback(error.response.request);
			} else if (error.request) {
				callback(error.request);
			}
		});
};

// export const fetchXmlHttp = (
// 	options: TransitionOptions & { headers: Options['requestHeaders'] },
// 	callback: (request: XMLHttpRequest) => void
// ): XMLHttpRequest => {
// 	const defaults = {
// 		url: window.location.pathname + window.location.search,
// 		method: 'GET',
// 		data: null,
// 		headers: {}
// 	};

// 	const { url, method, headers, data } = { ...defaults, ...options };

// 	const request = new XMLHttpRequest();

// 	request.onreadystatechange = function () {
// 		if (request.readyState === 4) {
// 			// if (request.status === 500) {} else {}
// 			callback(request);
// 		}
// 	};

// 	request.open(method, url, true);
// 	Object.entries(headers).forEach(([key, header]) => {
// 		request.setRequestHeader(key, header);
// 	});
// 	request.send(data);

// 	return request;
// };
