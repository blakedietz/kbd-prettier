#include QMK_KEYBOARD_H

extern keymap_config_t keymap_config;

#define _BASE 0
#define _SYMBOL 1
#define _NUMBER 2
#define _GAME 3
#define _DEV  4
#define _MEDIA 5
#define _MOUSE 6

#define ALT_DOT     ALT_T(KC_DOT)
#define ALT_X       ALT_T(KC_X)

#define CTL_SLSH    CTL_T(KC_SLSH)
#define CTL_Z       CTL_T(KC_Z)

#define GUI_C       GUI_T(KC_C)
#define GUI_COMM    GUI_T(KC_COMM)

#define HPR_ESC     ALL_T(KC_ESC)
#define HPR_QUO     ALL_T(KC_QUOT)

#define HPR_LEADER  ALL_T(KC_NO)

// Toggle to VIM when left space button is held, emit space keycode when left space is tapped
#define TGL_DEV LT(_DEV, KC_SPC)
// Toggle to MEDIA layer
#define TGL_MEDIA LT(_MEDIA, KC_SCLN)
// Toggle to the mouse layer when the right space button is held and emit enter when right space is tapped
#define TGL_MOUSE LT(_MOUSE, KC_ENT)

#define _______ KC_TRNS

const uint16_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS] = {

  [_BASE] = LAYOUT_5x6(
     // @kbd-prettier:start
     KC_EQL     ,KC_1       ,KC_2       ,KC_3       ,KC_4       ,KC_5       ,KC_6       ,KC_7       ,KC_8       ,KC_9       ,KC_0       ,KC_MINS    ,
     KC_TAB     ,KC_Q       ,KC_W       ,KC_E       ,KC_R       ,KC_T       ,KC_Y       ,KC_U       ,KC_I       ,KC_O       ,KC_P       ,KC_BSLS    ,
     HPR_ESC    ,KC_A       ,KC_S       ,KC_D       ,KC_F       ,KC_G       ,KC_H       ,KC_J       ,KC_K       ,KC_L       ,TGL_MEDIA  ,HPR_QUO    ,
     KC_LSFT    ,CTL_Z      ,ALT_X      ,GUI_C      ,KC_V       ,KC_B       ,KC_N       ,KC_M       ,GUI_COMM   ,ALT_DOT    ,CTL_SLSH   ,KC_LSFT    ,
                             KC_LPRN    ,KC_RPRN    ,                                                KC_LBRC    ,KC_RBRC    ,
                                                     KC_BSPC    ,TGL_DEV    ,TGL_MOUSE  ,KC_TAB     ,
                                                     TO(_BASE)  ,HPR_LEADER ,HPR_LEADER ,TO(_SYMBOL),
                                                     KC_BSPC    ,TO(_BASE)  ,TO(_SYMBOL),KC_LALT
     // @kbd-prettier:end
  ),

  [_SYMBOL] = LAYOUT_5x6(
     // @kbd-prettier:start
     KC_TILD    ,KC_EXLM    ,KC_AT      ,KC_HASH    ,KC_DLR     ,KC_PERC    ,KC_CIRC    ,KC_AMPR    ,KC_ASTR    ,KC_LPRN    ,KC_RPRN    ,KC_DEL     ,
     _______    ,_______    ,_______    ,_______    ,_______    ,_______    ,KC_RBRC    ,KC_UNDS    ,KC_PLUS    ,KC_LCBR    ,KC_RCBR    ,KC_PIPE    ,
     _______    ,_______    ,_______    ,_______    ,_______    ,_______    ,KC_RPRN    ,KC_MINS    ,KC_EQL     ,KC_LBRC    ,KC_RBRC    ,KC_BSLS    ,
     _______    ,_______    ,_______    ,_______    ,_______    ,_______    ,_______    ,_______    ,_______    ,_______    ,_______    ,_______    ,
                             _______    ,_______    ,                                                _______    ,_______    ,
                                                     _______    ,_______    ,_______    ,_______    ,
                                                     _______    ,_______    ,_______    ,_______    ,
                                                     _______    ,TO(_BASE)  ,TO(_NUMBER),_______
     // @kbd-prettier:end
  ),

  [_NUMBER] = LAYOUT_5x6(
     // @kbd-prettier:start
     _______    ,_______    ,_______    ,_______    ,_______    ,_______    ,_______    ,_______    ,_______    ,_______    ,_______    ,_______    ,
     _______    ,KC_1       ,KC_2       ,KC_3       ,KC_4       ,KC_5       ,KC_6       ,KC_7       ,KC_8       ,KC_9       ,KC_0       ,KC_MINS    ,
     _______    ,KC_5       ,KC_6       ,KC_7       ,_______    ,_______    ,_______    ,KC_4       ,KC_5       ,KC_6       ,_______    ,_______    ,
     _______    ,KC_8       ,KC_9       ,KC_0       ,_______    ,_______    ,_______    ,KC_1       ,KC_2       ,KC_3       ,_______    ,_______    ,
                             _______    ,_______    ,                                                _______    ,_______    ,
                                                     _______    ,_______    ,_______    ,_______    ,
                                                     _______    ,_______    ,_______    ,_______    ,
                                                     TO(_SYMBOL),_______    ,TO(_GAME)  ,_______
     // @kbd-prettier:end
  ),

  [_GAME] = LAYOUT_5x6(
     // @kbd-prettier:start
     KC_EQL     ,KC_1       ,KC_2       ,KC_3       ,KC_4       ,KC_5       ,KC_6       ,KC_7       ,KC_8       ,KC_9       ,KC_0       ,KC_MINS    ,
     KC_TAB     ,KC_Q       ,KC_W       ,KC_E       ,KC_R       ,KC_T       ,KC_Y       ,KC_U       ,KC_I       ,KC_O       ,KC_P       ,KC_BSLS    ,
     KC_ESC     ,KC_A       ,KC_S       ,KC_D       ,KC_F       ,KC_G       ,KC_H       ,KC_J       ,KC_K       ,KC_L       ,TGL_MEDIA  ,KC_QUOT    ,
     KC_LSFT    ,KC_Z       ,KC_X       ,KC_C       ,KC_V       ,KC_B       ,KC_N       ,KC_M       ,GUI_COMM   ,ALT_DOT    ,CTL_SLSH   ,KC_LSFT    ,
                             KC_LALT    ,KC_LCTL    ,                                                KC_LBRC    ,KC_RBRC    ,                        
                                                     KC_BSPC    ,KC_SPC     ,KC_ENT     ,_______    ,                                                
                                                     _______    ,_______    ,_______    ,_______    ,                                                
                                                     _______    ,TO(_NUMBER),_______    ,TO(_NUMBER)                                                
     // @kbd-prettier:end
  ),

  [_DEV] = LAYOUT_5x6(
     // @kbd-prettier:start
     KC_EQL  ,KC_1    ,KC_2    ,KC_3    ,KC_4    ,KC_5    ,KC_6    ,KC_7    ,KC_8    ,KC_9    ,KC_0    ,KC_MINS ,
     _______ ,_______ ,_______ ,_______ ,_______ ,_______ ,_______ ,_______ ,_______ ,_______ ,_______ ,RESET   ,
     _______ ,_______ ,_______ ,_______ ,_______ ,_______ ,_______ ,_______ ,_______ ,_______ ,_______ ,_______ ,
     _______ ,KC_F1   ,KC_F2   ,KC_F3   ,KC_F4   ,KC_F5   ,KC_LEFT ,KC_DOWN ,KC_UP   ,KC_RIGHT,_______ ,_______ ,
                       _______ ,KC_F6   ,                                    KC_F7   ,KC_F8   ,                  
                                         KC_F9   ,KC_F10  ,_______ ,_______ ,                                    
                                         _______ ,_______ ,_______ ,_______ ,                                    
                                         _______ ,_______ ,_______ ,_______ ,                                    
     // @kbd-prettier:end
  ),
  ),

  [_MEDIA] = LAYOUT_5x6(
     // @kbd-prettier:start
     _______,_______,_______,_______,_______,_______,_______,_______,_______,_______,_______,_______,
     _______,_______,_______,_______,_______,_______,_______,_______,_______,_______,_______,_______,
     _______,_______,_______,_______,_______,_______,_______,KC_MPRV,KC_MNXT,KC_MPLY,_______,_______,
     _______,_______,_______,_______,_______,_______,_______,KC_VOLD,KC_VOLU,KC_MUTE,_______,_______,
                     _______,_______,                                _______,_______,                
                                     _______,_______,_______,_______,                                
                                     _______,_______,_______,_______,                                
                                     _______,_______,_______,_______                                
     // @kbd-prettier:end
  ),
  ),

  [_MOUSE] = LAYOUT_5x6(
     // @kbd-prettier:start
     _______,_______,_______,_______,_______,_______,_______,_______,_______,_______,_______,_______,
     _______,_______,_______,KC_MS_U,_______,_______,_______,KC_WH_D,KC_WH_U,_______,_______,_______,
     _______,_______,KC_MS_L,KC_MS_D,KC_MS_R,_______,_______,KC_BTN1,KC_BTN2,_______,_______,_______,
     _______,_______,_______,_______,_______,_______,_______,KC_ACL2,KC_ACL1,KC_ACL0,_______,_______,
                     _______,_______,                                _______,_______,                
                                     _______,_______,_______,_______,                                
                                     _______,_______,_______,_______,                                
                                     _______,_______,_______,_______                                
     // @kbd-prettier:end
  )
  /*
  Blank layout for more layers

  [_NEW_LAYOUT] = LAYOUT_5x6(
     _______,_______,_______,_______,_______,_______,                        _______,_______,_______,_______,_______,_______,
     _______,_______,_______,_______,_______,_______,                        _______,_______,_______,_______,_______,_______,
     _______,_______,_______,_______,_______,_______,                        _______,_______,_______,_______,_______,_______,
     _______,_______,_______,_______,_______,_______,                        _______,_______,_______,_______,_______,_______,
                     _______,_______,                                                        _______,_______,
                                             _______,_______,            _______,_______,
                                             _______,_______,            _______,_______,
                                             _______,_______,            _______,_______
  ),*/
};


