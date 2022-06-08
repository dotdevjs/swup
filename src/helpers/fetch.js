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

	let request = new XMLHttpRequest();
	request.timeout = 30000; // time in milliseconds

	// CUSTOM
	function abort() {
		request.abort();
	}

	if (options.signal) {
		options.signal.addEventListener('abort', abort);
	}

	request.onreadystatechange = function() {
		console.log('onreadystatechange', options.url, request.readyState);
		if (request.readyState === 4) {
			// CUSTOM
			options.signal && options.signal.removeEventListener('abort', abort);

			if (request.status !== 500) {
				callback(request);
			} else {
				callback(request);
			}
		}
	};

	request.open(options.method, options.url, true);
	Object.keys(options.headers).forEach((key) => {
		request.setRequestHeader(key, options.headers[key]);
	});
	request.send(options.data);
	return request;
};

export default fetch;
