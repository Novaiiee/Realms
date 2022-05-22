module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ["plugin:react/recommended", "airbnb", "prettier"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint"],
	rules: {
		"react/react-in-jsx-scope": "off",
		"react/function-component-definition": "off",
		"react/jsx-props-no-spreading": "off",
		"react/jsx-filename-extension": "off",
		"react/button-has-type": "off",
		"import/no-unresolved": "off",
		"import/extensions": "off",
		"jsx-a11y/no-noninteractive-tabindex": "off",
	},
	settings: {
		react: {
			version: "detect",
		},
	},
};
