import * as fs from "fs";

interface IConvertedKeyMapRow {
  remainingTokens: string[];
  convertedRow: string[];
}

interface ILayout {
  keyMatrix: string[];
  indent?: number;
}

enum Annotation {
  START = "@kbd-prettier:start",
  END = "@kbd-prettier:end"
}

// Keys that can be given in a raw keymap
enum Key {
  NOTHING = "_"
}

/**
 * Read the raw form of the keymap configuration to make sure that it matches the right format.
 *
 * @param config
 */
// const checkConfigFile: (config: ConfigLayout) => void = function (config: ConfigLayout): void {
//     const {layout} = config;
//
//     const numberOfColumns = layout[0].length;
//     const numberOfOffendingColumns = layout.filter(row => row.length !== numberOfColumns);
//
//     if (numberOfOffendingColumns.length > 0) {
//         throw new Error(`The configuration you supplied was incorrect. Every row must have the same number of columns.`);
//     }
//
//     const incorrectLetters = Array.from(layout.join('')).filter(letter => !(letter in Key));
//
//     if (incorrectLetters.length > 0) {
//         throw new Error(`The configuration you supplied was incorrect. The keymap can only contain ${Key}`);
//     }
// };

/**
 *
 * @param rawKeymap
 */
export function parseRawKeyMap(rawKeymap: string): string[] {
  const parsedKeyMap = Array.from(rawKeymap).reduce(
    // tslint:disable-next-line
    ({ tokens, parenStack, currentToken }, currentValue) => {
      /**
       * We need to make sure that we don't count commas within a grouping of parens.
       * Leave the tokens alone, add the paren to the stack and include the open paren in the token that's being
       * built
       */
      if (currentValue === "(") {
        return {
          currentToken: currentToken + currentValue,
          parenStack: [...parenStack, "("],
          tokens
        };
        /**
         * At this point we're still building up a token we've made it through a grouping of parens. This is needed
         * in order to ignore terminating on a paren that is in a function call. So, keep the tokens as is,
         * return remove a grouping off of the paren stack and update the current token to include the
         * right hand paren
         */
      } else if (currentValue === ")") {
        parenStack.pop();
        return {
          currentToken: currentToken + currentValue,
          parenStack: [...parenStack],
          tokens
        };
        // At this point we've hit the end of the token, add the token to the tokens, reset the parenStack, reset the currentToken
      } else if (currentValue === "," && parenStack.length === 0) {
        return {
          currentToken: "",
          parenStack: [],
          tokens: [...tokens, currentToken]
        };
      } else {
        /**
         * At this point we're not in a paren grouping and we're just building the token. Keep the tokens the same,
         * keep the parenStack the same, update the token that we're building.
         */
        return {
          currentToken: currentToken + currentValue,
          parenStack,
          tokens: [...tokens]
        };
      }
    },
    { tokens: [], parenStack: [], currentToken: "" }
  );

  const { tokens, currentToken } = parsedKeyMap;

  // If the final value has a comma then just return tokens, otherwise if it doesn't return all tokens including the final token that was parsed
  return Array.from(rawKeymap).pop() === ","
    ? tokens
    : [...tokens, currentToken];
}

/**
 *
 * @param layoutRow
 * @param keymapTokens
 * @param keyLength
 */
export function convertKeyMapRowFromLayout(
  layoutRow: string,
  keymapTokens: string[],
  keyLength: number
): IConvertedKeyMapRow {
  // Just create padded tokens
  return Array.from(layoutRow).reduce(
    ({ remainingTokens, convertedRow }, currentKey) => {
      const [currentToken, ...tail] = remainingTokens;

      // If the current key is nothing, add whitespace
      if (currentKey === Key.NOTHING) {
        // note for the whitespaces we're adding keyLength and one additional space to account for other
        // rows that include the comma as a separator
        const numSpacesToAdd = keyLength + 1;
        return {
          convertedRow: [...convertedRow, " ".repeat(numSpacesToAdd)],
          remainingTokens
        };
      } else {
        // Remove whitespace
        const cleanedCurrentToken = currentToken.trim();
        // compute the difference between the length of the current token and the max token length
        const numSpacesToAdd = keyLength - cleanedCurrentToken.length;
        // used to pad the right hand side of the token with space so all tokens column widths are the same
        const spacesToAdd =
          numSpacesToAdd === 0 ? "" : " ".repeat(numSpacesToAdd);
        const separator = tail.length === 0 ? "" : ",";
        const paddedToken = `${cleanedCurrentToken}${spacesToAdd}${separator}`;

        return {
          convertedRow: [...convertedRow, paddedToken],
          remainingTokens: tail
        };
      }
    },
    { remainingTokens: keymapTokens, convertedRow: [] }
  );
}

export function prettifyRawKeymapSectionFromLayout(
  rawKeyMap: string,
  layout: ILayout,
  indent = 0
): string {
  const tokens = parseRawKeyMap(rawKeyMap);
  // Get the longest token from the layout
  const longestToken = tokens
    .map(token => token.trim())
    .reduce(
      (currentLongestToken, token: string) =>
        token.length > currentLongestToken.length ? token : currentLongestToken,
      ""
    );

  const prettyKeyMap = layout.keyMatrix.reduce(
    ({ keymap, remainingTokens }, row: string) => {
      const { convertedRow, ...other } = convertKeyMapRowFromLayout(
        row,
        remainingTokens,
        longestToken.length
      );
      return {
        keymap: [...keymap, convertedRow],
        remainingTokens: other.remainingTokens
      };
    },
    { keymap: [], remainingTokens: tokens }
  );

  return prettyKeyMap.keymap
    .map(row => `${" ".repeat(indent)}${row.join("")}`)
    .join("\n");
}

/**
 *
 * @param file
 * @param layout
 */
export function prettifyKeymap(file: string[], layout: ILayout): string[] {
  const reduced = file.reduce(
    (
      { annotationStart, prettifiedFile, annotationIndent },
      line,
      currentIndex
    ) => {
      if (line.includes(Annotation.START)) {
        // Do nothing with the file until we hit an end
        // TODO: (bdietz) - support multi-line comments
        return {
          // Default to the given layout's indent level, or determine how many
          annotationIndent:
            typeof layout.indent === "number"
              ? layout.indent
              : line.split("//")[0].length,
          annotationStart: currentIndex,
          prettifiedFile: [...prettifiedFile, line]
        };
      } else if (line.includes(Annotation.END)) {
        const unprettifiedSection = file
          .slice(annotationStart + 1, currentIndex)
          .join("");
        const prettifiedSection = prettifyRawKeymapSectionFromLayout(
          unprettifiedSection,
          layout,
          annotationIndent
        );
        return {
          annotationIndent: null,
          annotationStart: null,
          prettifiedFile: [...prettifiedFile, prettifiedSection, line]
        };
      } else if (annotationStart !== null) {
        return { annotationIndent, annotationStart, prettifiedFile };
      } else {
        return {
          annotationIndent,
          annotationStart,
          prettifiedFile: [...prettifiedFile, line]
        };
      }
    },
    {
      annotationIndent: null,
      annotationStart: null,
      prettifiedFile: []
    }
  );

  return reduced.prettifiedFile;
}

export function prettifyKeymapFile(
  keymapFilePath: string,
  configPath?: string
) {
  if (!fs.existsSync(keymapFilePath)) {
    throw new Error(
      `The given keyMapFilePath ${keymapFilePath} does not exist`
    );
  }

  if (!fs.existsSync(configPath)) {
    throw new Error(
      `The given keyMapFilePath ${keymapFilePath} does not exist`
    );
  }

  const file = fs
    .readFileSync(keymapFilePath)
    .toString()
    .split("\n");
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

  let layoutConfigPath = keymapFilePath.replace(config.basePath, "");
  // This could possibly fail for windows... oh well
  layoutConfigPath =
    layoutConfigPath[0] === "/"
      ? layoutConfigPath.slice(1, layoutConfigPath.length)
      : layoutConfigPath;

  const layoutConfig = config.layouts[layoutConfigPath];

  const prettifiedKeymap = prettifyKeymap(file, layoutConfig);

  fs.writeFileSync(keymapFilePath, prettifiedKeymap.join("\n"));
}
