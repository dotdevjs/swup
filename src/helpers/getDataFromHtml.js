import { queryAll } from '../utils';

const getDataFromHTML = (html, request) => {
	let content = html.replace('<body', '<div id="swupBody"').replace('</body>', '</div>');
	let fakeDom = document.createElement('div');
	fakeDom.innerHTML = content;
	let blocks = [];

	for (let i = 0; i < this.options.elements.length; i++) {
		if (fakeDom.querySelector(this.options.elements[i]) == null) {
			console.warn(`Element ${this.options.elements[i]} is not found in cached page.`);
			return null;
		} else {
			queryAll(this.options.elements[i]).forEach((item, index) => {
				queryAll(this.options.elements[i], fakeDom)[index].dataset.swup = blocks.length;
				blocks.push(queryAll(this.options.elements[i], fakeDom)[index].outerHTML);
			});
		}
	}

	const json = {
		title: fakeDom.querySelector('title').innerText,
		pageClass: fakeDom.querySelector('#swupBody').className,
		originalContent: html,
		blocks: blocks,
		responseURL: request != null ? request.responseURL : window.location.href
	};
	return json;
};

export default getDataFromHTML;