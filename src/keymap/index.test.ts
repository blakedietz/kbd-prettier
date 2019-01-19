import {
  parseRawKeyMap,
  convertKeyMapRowFromLayout,
  prettifyRawKeymapSectionFromLayout
} from ".";

export const fixtures = {
  layouts: {
    "handwired/dactyl_manuform/5x6/keymap": {
      keyMatrix: [
        "LLLLLLRRRRRR",
        "LLLLLLRRRRRR",
        "LLLLLLRRRRRR",
        "LLLLLLRRRRRR",
        "__LL____RR__",
        "____LLRR____",
        "____LLRR____",
        "____LLRR____"
      ]
    }
  }
};

const KEYMAP = `KC_EQL,KC_1,KC_2,KC_3,KC_4,KC_5,KC_6,KC_7,KC_8,KC_9,KC_0,KC_MINS,KC_TAB,KC_Q,KC_W,KC_E,KC_R,KC_T,KC_Y,KC_U,KC_I,KC_O,KC_P,KC_BSLS,HPR_ESC,KC_A,KC_S,KC_D,KC_F,KC_G,KC_H,KC_J,KC_K,KC_L,TGL_MEDIA,HPR_QUO, KC_LSFT,CTL_Z,ALT_X,GUI_C,KC_V,KC_B,KC_N,KC_M,GUI_COMM,ALT_DOT,CTL_SLSH,KC_LSFT, KC_LPRN,KC_RPRN,KC_LBRC,KC_RBRC, KC_BSPC,TGL_DEV,TGL_MOUSE,KC_TAB, TO(_BASE),HPR_LEADER,HPR_LEADER,TO(_SYMBOL),KC_BSPC,TO(_BASE),TO(_SYMBOL),KC_LALT `;
const EXPECTED_KEYMAP = [
  "KC_EQL     ,KC_1        ,KC_2       ,KC_3       ,KC_4       ,KC_5       ,KC_6       ,KC_7       ,KC_8       ,KC_9       ,KC_0       ,KC_MINS    ,",
  "KC_TAB     ,KC_Q        ,KC_W       ,KC_E       ,KC_R       ,KC_T       ,KC_Y       ,KC_U       ,KC_I       ,KC_O       ,KC_P       ,KC_BSLS    ,",
  "HPR_ESC    ,KC_A        ,KC_S       ,KC_D       ,KC_F       ,KC_G       ,KC_H       ,KC_J       ,KC_K       ,KC_L       ,TGL_MEDIA  ,HPR_QUO    ,",
  "KC_LSFT    ,CTL_Z       ,ALT_X      ,GUI_C      ,KC_V       ,KC_B       ,KC_N       ,KC_M       ,GUI_COMM   ,ALT_DOT    ,CTL_SLSH   ,KC_LSFT    ,",
  "                         KC_LPRN    ,KC_RPRN    ,                                                KC_LBRC    ,KC_RBRC    ,",
  "                                                 KC_BSPC    ,TGL_DEV    ,TGL_MOUSE  ,KC_TAB     ,",
  "                                                 TO(_BASE)  ,HPR_LEADER ,HPR_LEADER ,TO(_SYMBOL),",
  "                                                 KC_BSPC    ,TO(_BASE)  ,TO(_SYMBOL),KC_LALT     "
];
const LONGEST_TOKEN = "TO(_SYMBOL)";

describe("keymap", () => {
  // TODO: (bdietz) - ignore comments
  // TODO: (bdietz) - don't forget that commas will take up the total size

  test("Convert a single row", () => {
    const [firstRowLayout, ..._] = fixtures.layouts[
      "handwired/dactyl_manuform/5x6/keymap"
    ].keyMatrix;
    const rawKeyMap = `KC_EQL,KC_1,KC_2,KC_3,KC_4,KC_5,KC_6,KC_7,KC_8,KC_9,KC_0,KC_MINS`;
    const firstRowKeymapTokens = parseRawKeyMap(rawKeyMap);
    const paddedRow = convertKeyMapRowFromLayout(
      firstRowLayout,
      firstRowKeymapTokens,
      LONGEST_TOKEN.length
    );
    console.log(paddedRow);
    // FIXME: (bdietz) -
  });

  test("Convert a single row with remaining tokens", () => {
    const layoutRow =
      fixtures.layouts["handwired/dactyl_manuform/5x6/keymap"].keyMatrix[4];
    const rawKeyMap = `KC_LPRN,KC_RPRN,KC_LBRC,KC_RBRC, KC_BSPC,TGL_DEV,TGL_MOUSE,KC_TAB, TO(_BASE),HPR_LEADER,HPR_LEADER,`;
    const firstRowKeymapTokens = parseRawKeyMap(rawKeyMap);
    const paddedRow = convertKeyMapRowFromLayout(
      layoutRow,
      firstRowKeymapTokens,
      LONGEST_TOKEN.length
    );
    console.log(paddedRow);
    // FIXME: (bdietz) -
  });

  test("Can prettify", () => {
    const layout = {
      keyMatrix:
        fixtures.layouts["handwired/dactyl_manuform/5x6/keymap"].keyMatrix
    };
    const prettifiedOutput = prettifyRawKeymapSectionFromLayout(KEYMAP, layout);

    console.log(prettifiedOutput);
    // FIXME: (bdietz) -
  });
});
