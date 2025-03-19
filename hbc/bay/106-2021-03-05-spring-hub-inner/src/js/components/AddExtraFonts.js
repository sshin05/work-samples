export default class AddExtraFonts{
	constructor(){
	}

	addFontsToHead(){
		let linkEl = document.createElement("link");
		linkEl.rel="stylesheet";
		linkEl.href="https://content-edit-assets.s3.amazonaws.com/bay/editorial/106-2021-03-15-spring-hub-inner/bay-spring-hub-inner-2021-03-15-main-3.0.0.css";
		document.head.appendChild(linkEl);
	}
}