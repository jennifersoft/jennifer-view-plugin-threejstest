module.exports = {
    "verbose": true,
    "transform": {
        "^.+\\.js$": "babel-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?)$",
    "moduleFileExtensions": [
        "js"
    ],
    "moduleNameMapper": {
        "@/(.*)$": "<rootDir>/src/main/client/$1"
    },
    "transformIgnorePatterns": []
}