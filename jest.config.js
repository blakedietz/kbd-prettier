module.exports = {
    "roots": [
        "<rootDir>/src",
        "<rootDir>/bin"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "js",
        "json",
        "node"
    ],
};