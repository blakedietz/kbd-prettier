interface LongestToken {
    longestToken: string
}

export const findLongestToken: (rawKeymap: string) => LongestToken = function (rawKeymap: string): LongestToken {
    const keymapTokens = Array.from(rawKeymap).reduce(({list, parenStack, currentToken}, currentValue) => {
            /**
             * We need to make sure that we don't count commas within a grouping of parens.
             * Leave the list alone, add the paren to the stack and include the open paren in the token that's being
             * built
             */
            if (currentValue === "(") {
                return {list, parenStack: [...parenStack, "("], currentToken: (currentToken + currentValue)};
                /**
                 * At this point we're still building up a token we've made it through a grouping of parens. This is needed
                 * in order to ignore terminating on a paren that is in a function call. So, keep the list as is,
                 * return remove a grouping off of the paren stack and update the current token to include the
                 * right hand paren
                 */
            } else if (currentValue === ")") {
                parenStack.pop();
                return {list, parenStack: [...parenStack], currentToken: (currentToken + currentValue)};
                // At this point we've hit the end of the token, add the token to the list, reset the parenStack, reset the currentToken
            } else if (currentValue === "," && parenStack.length === 0) {
                return {list: [...list, currentToken], parenStack: [], currentToken: ""};
            }
            /**
             * At this point we're not in a paren grouping and we're just building the token. Keep the list the same,
             * keep the parenStack the same, update the token that we're building.
             */
            else {
                return {list: [...list], parenStack: parenStack, currentToken: (currentToken + currentValue)};
            }
        },
        {list: [], parenStack: [], currentToken: ""}
    );

    return keymapTokens.list.reduce(({longestToken}, token: string) => (token.length > longestToken.length) ? {longestToken: token} : {longestToken}, {longestToken: ""});
};
