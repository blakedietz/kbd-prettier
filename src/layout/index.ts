/**
 * Read the raw form of the keymap configuration to make sure that it matches the right format.
 *
 * @param config
 */
const checkConfigFile: (config: ConfigLayout) => void = function (config: ConfigLayout): void {
    const {layout} = config;

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
