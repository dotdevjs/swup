const axios = require('axios');

const fetch = (setOptions, callback = false) => {
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
		.then(function(response) {
			console.log('[axios] success', response);
			callback(response.request);
			//response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'));
		})
		.catch(function(error) {
			console.log('[axios] error', error);
			if (error.response) {
				callback(error.response.request);
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				//   console.log(error.response.data);
				//   console.log(error.response.status);
				//   console.log(error.response.headers);
			} else if (error.request) {
				callback(error.request);
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				//console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message);
			}
		});
	// let request = new XMLHttpRequest();
	// request.timeout = 30000; // time in milliseconds

	// // CUSTOM
	// function abort() {
	// 	request.abort();
	// }

	// if (options.signal) {
	// 	options.signal.addEventListener('abort', abort);
	// }

	// request.onreadystatechange = function() {
	// 	//console.log('onreadystatechange', options.url, request.readyState);
	// 	if (request.readyState === 4) {
	// 		console.log(request);
	// 		// CUSTOM
	// 		options.signal && options.signal.removeEventListener('abort', abort);

	// 		if (request.status !== 500) {
	// 			callback(request);
	// 		} else {
	// 			callback(request);
	// 		}
	// 	}
	// };

	// request.open(options.method, options.url, true);
	// Object.keys(options.headers).forEach((key) => {
	// 	request.setRequestHeader(key, options.headers[key]);
	// });
	// request.send(options.data);
	// return request;
};

export default fetch;
