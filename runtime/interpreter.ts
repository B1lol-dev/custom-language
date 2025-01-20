import {
  RuntimeVal,
  NumberVal,
  MAKE_NULL,
  MAKE_UNDEFINED,
  MAKE_NUM,
} from "./values.ts";
import {
  BinaryExpr,
  Identifier,
  NumericListeral,
  Program,
  Stmt,
  VarDeclaration,
} from "../frontend/ast.ts";
import Enviroment from "./environment.ts";
import { eval_binary_expr, eval_identifier } from "./eval/expressions.ts";
import { eval_program, eval_var_decloration } from "./eval/statements.ts";

/*
  | "Program"
  | "NumericListeral"
  | "NullLiteral"
  | "Identifier"
  | "BinaryExpr"
  | "UndefinedLiteral";
*/

export function evaluate(astNode: Stmt, env: Enviroment): RuntimeVal {
  switch (astNode.kind) {
    case "NumericListeral":
      return {
        value: (astNode as NumericListeral).value,
        type: "number",
      } as NumberVal;

    case "Identifier":
      return eval_identifier(astNode as Identifier, env);

    case "BinaryExpr":
      return eval_binary_expr(astNode as BinaryExpr, env);

    case "Program":
      return eval_program(astNode as Program, env);

    case "VarDeclaration":
      return eval_var_decloration(astNode as VarDeclaration, env);
    default:
      console.error(
        "This AST Node has not yet been setup for interpretation.",
        astNode
      );
      Deno.exit(1);
  }
}
