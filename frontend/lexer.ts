// let x = 15 + (foo * bar)
// [letToken, identifierToken, EqualsToken, NumberToken]

export enum TokenType {
  // literal types
  Number,
  Identifier,

  // grouping + operators
  Equals,
  Semicolon,
  OpenParen,
  CloseParen,
  BinaryOperator,
  Comma,
  Colon,
  OpenBrace, // {
  CloseBrace, // }
  EOF, // signified the end of file

  // keywords
  Let,
  Const,
}

const KEYWORDS: Record<string, TokenType> = {
  let: TokenType.Let,
  const: TokenType.Const,
};

export interface Token {
  value: string;
  type: TokenType;
}

function token(value = "", type: TokenType): Token {
  return { value, type };
}

function isAlpha(src: string): boolean {
  return src.toUpperCase() != src.toLowerCase();
}

function isInt(str: string): boolean {
  const c = str.charCodeAt(0);
  const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)];
  return c >= bounds[0] && c <= bounds[1];
}

function isSkippable(str: string): boolean {
  return str == " " || str == "\n" || str == "\t" || str == "\r";
}

export function tokenize(sourceCode: string): Token[] {
  const tokens = new Array<Token>();
  const src = sourceCode.split("");

  // Build each token until end of file
  while (src.length > 0) {
    if (src[0] == "(") {
      tokens.push(token(src.shift(), TokenType.OpenParen));
    } else if (src[0] == ")") {
      tokens.push(token(src.shift(), TokenType.CloseParen));
    } else if (src[0] == "{") {
      tokens.push(token(src.shift(), TokenType.OpenBrace));
    } else if (src[0] == "}") {
      tokens.push(token(src.shift(), TokenType.CloseBrace));
    } else if (
      src[0] == "+" ||
      src[0] == "-" ||
      src[0] == "*" ||
      src[0] == "/" ||
      src[0] == "%"
    ) {
      tokens.push(token(src.shift(), TokenType.BinaryOperator));
    } else if (src[0] == "=") {
      tokens.push(token(src.shift(), TokenType.Equals));
    } else if (src[0] == ";") {
      tokens.push(token(src.shift(), TokenType.Semicolon));
    } else if (src[0] == ":") {
      tokens.push(token(src.shift(), TokenType.Colon));
    } else if (src[0] == ",") {
      tokens.push(token(src.shift(), TokenType.Comma));
    } else {
      // handle multi=character tokens

      // build number token
      if (isInt(src[0])) {
        let num = "";
        while (src.length > 0 && isInt(src[0])) {
          num += src.shift();
        }

        tokens.push(token(num, TokenType.Number));
      } else if (isAlpha(src[0])) {
        let ident = ""; // foo, let
        while (src.length > 0 && isAlpha(src[0])) {
          ident += src.shift();
        }

        //check for reserved keywords
        const reserved = KEYWORDS[ident];

        if (typeof reserved == "number") {
          tokens.push(token(ident, reserved));
        } else {
          tokens.push(token(ident, TokenType.Identifier));
        }
      } else if (isSkippable(src[0])) {
        src.shift();
      } else {
        console.error("Unrecognized character found in source: ", src[0]);
        Deno.exit(1);
      }
    }
  }

  tokens.push({ type: TokenType.EOF, value: "EndOfFile" });
  return tokens;
}

// const sourceCode = await Deno.readTextFile("./test.gds");
// for (const token of tokenize(sourceCode)) {
// console.log(token);
// }
