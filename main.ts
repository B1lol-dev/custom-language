import Parser from "./frontend/parser.ts";
import Enviroment from "./runtime/environment.ts";
import { evaluate } from "./runtime/interpreter.ts";
import {
  MAKE_BOOL,
  MAKE_NULL,
  MAKE_NUM,
  MAKE_UNDEFINED,
  NumberVal,
} from "./runtime/values.ts";
import { Matem } from "./runtime/math.ts";
repl();

function repl() {
  const parser = new Parser();
  const env = new Enviroment();

  // creating dafailt global envoirement
  env.declareVar("false", MAKE_BOOL(false), true);
  env.declareVar("true", MAKE_BOOL(true), true);
  env.declareVar("null", MAKE_NULL(), true);
  env.declareVar("undefined", MAKE_UNDEFINED(), true);

  console.log("Custom Language v0.1");
  while (true) {
    const input = prompt("> ");

    // checks for no user input or exit keyword
    if (!input || input.includes("exit")) {
      Deno.exit(1);
    }

    const program = parser.produceAST(input);

    const result = evaluate(program, env);
    console.log(result);
  }
}
