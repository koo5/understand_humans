// WORKAROUND for immer.js esm (see https://github.com/immerjs/immer/issues/557)
window.process = {
	env: {
		NODE_ENV: "production"
	}
};

import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {

	}
});

export default app;
