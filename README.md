# kbd-prettier

## Description

Make your keyboard layouts pretty ⌨️💅✨.

This tool automatically makes your keyboard layout uniform. That's right, no more updating your layouts by hand after you make changes. Just create a layout in the layouts.json file and add the necessary directives to your layout blocks then run the script against the keymap you want to prettify. For an added bonus, add a watcher script to your editor of choice to have the layouts get automatically prettified upon save.

## Installation

```bash
# npm
npm i -g kbd-prettier;

# yarn
yarn add global kbd-prettier;
```

## Usage

1. Install the npm package
1. Create a `layouts.json` file
1. Add your layout to the `layouts.json` file for the keyboard you want to prettify.
1. In the keymap file add the start and stop directives around the layout layer you want to prettiy ![](./docs/images/directive-example.png)
1. Run kbd-prettier

```bash
# Make sure to pass in the absolute paths for the file you ant to prettify and the layout config.
kbd-prettier --file /Users/blakedietz/projects/qmk_firmware/keyboards/ergotravel/keymaps/blakedietz/keymap.c --config /Users/blakedietz/projects/qmk_firmware/layouts.json
```

Upon running the tool your layer's key symbols will be prettified to match the layout specified in the `layouts.json` file. Note that different layers can have different sizes as the layouts are spaced according to the largest key symbol in your layer's layout.

So for example if you have a layout with a layer that has a key symbol that's 6 characters, all keys will be separated by a width of 6.

## layouts.json

layouts.json is the file responsible for configuring what layout you want your board to be printed in. The layout is composed of an array of the following characters:

- L: Represents a key on the left half of the board
- R: Represents a key on the right half of the board
- \_: Represents an empty area

### Keys

| Key           | Required | Type                           | Description                                                                                                                   |
| ------------- | -------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| basePath      | yes      | string                         | The basepath of your project containing the keymaps to prettify                                                               |
| layouts       | yes      | object\<keyboardEntry\>        | An object hash of the layouts, keyed by the subpath of the files for each layout you want to map.                             |
| indent        | no       | number                         | The number spaces by which you want to indent each keymap that is surrounded by a kbd-prettier directive                      |
| keyboardEntry | yes      | { keyMatrix: array\<string\> } | The layout mapping that is used to pretty print your keyboard layout layers that are surrounded by the kbd-prettier directive |

### Example

```json
{
  "basePath": "/Users/blakedietz/projects/kbd-prettier/tests",
  "layouts": {
    "handwired/dactyl_manuform/5x6/keymaps/blakedietz/keymap.c": {
      "keyMatrix": [
        "LLLLLLRRRRRR",
        "LLLLLLRRRRRR",
        "LLLLLLRRRRRR",
        "LLLLLLRRRRRR",
        "__LL____RR__",
        "____LLRR____",
        "____LLRR____",
        "____LLRR____"
      ]
    },
    "ergotravel/keymaps/blakedietz/keymap.c": {
      "keyMatrix": [
        "LLLLLLLRRRRRRR",
        "LLLLLLLRRRRRRR",
        "LLLLLLLRRRRRRR",
        "LLLL_LLRR_RRRR"
      ]
    }
  }
}
```

## Interfaces

This tool supports both a cli and programmatic interface

### CLI

To learn how to use the script, simply run

```bash
kbd-prettier -h
Usage: kbd-prettier [options]

Options:
  -f --file <path>    The file to prettify
  -c --config <path>  The file containing the file and layout mappings
  -h, --help          output usage information
```

### Programmatic interface

// TODO: Add more information about this.

## Known limitations

There are currently known limitations for this tool

- kbd-prettier does not support comments between the directives at this time.
- The cli tool doesn't have very good support for relative paths yet. So make sure to pass in an absolute path to the tool for right now.
