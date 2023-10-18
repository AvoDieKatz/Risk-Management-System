const globals = require("globals");
const reactRecommended = require("eslint-plugin-react/configs/recommended");
const reactHooks = require("eslint-plugin-react-hooks");
const js = require("@eslint/js");
const babelParser = require("@babel/eslint-parser");

// 'globals' package that come with eslint have error at "AudioWorkletGlobalScope " (contains whitespace)
// that makes parser failed
// Solution: clone the object and fix "AudioWorkletGlobalScope " field
const fixedGlobals = JSON.parse(JSON.stringify(globals));
fixedGlobals.browser["AudioWorkletGlobalScope"] =
    globals.browser["AudioWorkletGlobalScope "];

delete fixedGlobals.browser["AudioWorkletGlobalScope "];

const jsRecommended = js.configs.recommended;

module.exports = [
    jsRecommended,
    {
        files: ["**/*.js"],
        plugins: {
            jsRecommended,
        },
        languageOptions: {
            parser: babelParser,
            parserOptions: {
                requireConfigFile: false,
                babelOptions: {
                    babelrc: false,
                    configFile: false,
                    presets: ["@babel/preset-react"],
                },
            },
            globals: {
                ...fixedGlobals.browser,
                ...fixedGlobals.node,
                ...fixedGlobals.commonjs,
                MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: "readonly",
                MAIN_WINDOW_WEBPACK_ENTRY: "readonly",
            },
        },
        rules: {
            ...js.configs.recommended.rules,
            "no-unused-vars": "warn",
        },
    },

    reactRecommended,
    {
        files: ["**/*.jsx"],
        plugins: {
            reactRecommended,
        },
        languageOptions: {
            parser: babelParser,
            parserOptions: {
                requireConfigFile: false,
                babelOptions: {
                    babelrc: false,
                    configFile: false,
                    presets: ["@babel/preset-react"],
                },
            },
            globals: {
                ...fixedGlobals.browser,
            },
        },
        rules: {
            ...js.configs.recommended.rules,
            "no-unused-vars": "warn",
        },
    },
    {
        files: ["**/*.jsx"],
        plugins: {
            "react-hooks": reactHooks,
        },
        rules: reactHooks.configs.recommended.rules,
    },
];
