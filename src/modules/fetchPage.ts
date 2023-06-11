import Swup from '../Swup.js';
import { fetch } from '../helpers.js';
import { TransitionOptions } from './loadPage.js';
import { PageRecord } from './Cache.js';

declare global {
	interface Window {
		swupAbortController?: any;
	}
}

export function fetchPage(this: Swup, data: TransitionOptions): Promise<PageRecord> {
	const headers = this.options.requestHeaders;
	const { url } = data;

	if (this.cache.exists(url)) {
		this.triggerEvent('pageRetrievedFromCache');
		return Promise.resolve(this.cache.getPage(url));
	}

	// CUSTOM
	window.swupAbortController && window.swupAbortController.abort();
	window.swupAbortController = new AbortController();

	return new Promise((resolve, reject) => {
		fetch({ ...data, headers, signal: window.swupAbortController.signal }, (response) => {
			if (response.status === 500) {
				this.triggerEvent('serverError');
				reject(url);
				return;
			}
			// get json data
			const page = this.getPageData(response);
			if (!page || !page.blocks.length) {
				reject(url);
				return;
			}
			// render page
			const cacheablePageData = { ...page, url };
			this.cache.cacheUrl(cacheablePageData);
			this.triggerEvent('pageLoaded');
			resolve(cacheablePageData);
		});
	});
}
