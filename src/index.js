"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const referenceFilePath = path_1.default.join(process.cwd(), require.resolve("./layout.json"));
const referenceFile = require(referenceFilePath);
var Key;
(function (Key) {
    Key["LEFT"] = "L";
    Key["RIGHT"] = "R";
    Key["NOTHING"] = "_";
})(Key || (Key = {}));
const findLongestToken = function (rawKeymap) {
    const keymapTokens = Array.from(rawKeymap).reduce(({ list, parenStack, currentToken }, currentValue) => {
        if (currentValue === "(") {
            return { list, parenStack: [...parenStack, "("], currentToken: (currentToken + currentValue) };
        }
        else if (currentValue === ")") {
            parenStack.pop();
            return { list, parenStack: [...parenStack], currentToken: (currentToken + currentValue) };
        }
        else if (currentValue === "," && parenStack.length === 0) {
            return { list: [...list, currentToken], parenStack: [], currentToken: "" };
        }
        else {
            return { list: [...list], parenStack: parenStack, currentToken: (currentToken + currentValue) };
        }
    }, { list: [], parenStack: [], currentToken: "" });
    return keymapTokens.list.reduce(({ longestToken }, token) => (token.length > longestToken.length) ? { longestToken: token } : { longestToken }, { longestToken: "" });
};
const convertRawConfigLayout = function (config) {
    const { layout } = config;
    const numberOfColumns = layout[0].length;
    const numberOfOffendingColumns = layout.filter(row => row.length !== numberOfColumns);
    if (numberOfOffendingColumns.length > 0) {
        throw new Error(`The configuration you supplied was incorrect. Every row must have the same number of columns.`);
    }
    const incorrectLetters = Array.from(layout.join('')).filter(letter => !(letter in Key));
    if (incorrectLetters.length > 0) {
        throw new Error(`The configuration you supplied was incorrect. The keymap can only contain ${Key}`);
    }
};
//# sourceMappingURL=index.js.map