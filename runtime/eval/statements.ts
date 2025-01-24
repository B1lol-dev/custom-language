import { Program, VarDeclaration } from "../../frontend/ast.ts";
import Enviroment from "../environment.ts";
import { evaluate } from "../interpreter.ts";
import { RuntimeVal, MAKE_UNDEFINED } from "../values.ts";

export function eval_program(program: Program, env: Enviroment): RuntimeVal {
  let lastEvaluated: RuntimeVal = MAKE_UNDEFINED();

  for (const statement of program.body) {
    lastEvaluated = evaluate(statement, env);
  }

  return lastEvaluated;
}

export function eval_var_decloration(
  declaration: VarDeclaration,
  env: Enviroment
): RuntimeVal {
  const value = declaration.value
    ? evaluate(declaration.value, env)
    : MAKE_UNDEFINED();
  return env.declareVar(declaration.identifier, value, declaration.constant);
}
