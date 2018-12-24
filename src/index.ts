import path from "path";

interface Layout {
    keyMatrix: Array<Array<String>>
}

// TODO: (bdietz) - support any file path
const referenceFilePath = path.join(process.cwd(), require.resolve("./layout.json"));
const referenceFile = require(referenceFilePath);

interface ConfigLayout {
    layout: Array<string>
    name?: string
}

// Keys that can be given in a raw keymap
enum Key {
    LEFT = "L",
    RIGHT = "R",
    NOTHING = "_"
}

// const convertRawLayoutRow = (row: string) => {

// };


