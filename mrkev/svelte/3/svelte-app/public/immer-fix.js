// WORKAROUND for immer.js esm (see https://github.com/immerjs/immer/issues/557)
window.process = {
	env: {
		NODE_ENV: "production"
	}
};

