import {
  AssignmentExpr,
  BinaryExpr,
  Identifier,
  ObjectLiteral,
} from "../../frontend/ast.ts";
import Enviroment from "../environment.ts";
import { evaluate } from "../interpreter.ts";
import { RuntimeVal, MAKE_NULL, NumberVal, ObjectVal } from "../values.ts";

function eval_numeric_binary_expr(
  lhs: NumberVal,
  rhs: NumberVal,
  operator: string
): NumberVal {
  let result: number = 0;
  if (operator == "+") {
    result = lhs.value + rhs.value;
  } else if (operator == "-") {
    result = lhs.value - rhs.value;
  } else if (operator == "*") {
    result = lhs.value * rhs.value;
  } else if (operator == "/") {
    if (rhs.value != 0) {
      result = lhs.value / rhs.value;
    } else {
      result = 0;
    }
  } else if (operator == "%") {
    result = lhs.value % rhs.value;
  } else if (operator == "**") {
    result = lhs.value ** rhs.value;
  }
  return { value: result, type: "number" };
}

export function eval_binary_expr(
  binop: BinaryExpr,
  env: Enviroment
): RuntimeVal {
  const lhs = evaluate(binop.left, env); // left hand side
  const rhs = evaluate(binop.right, env); // right hand side

  if (lhs.type == "number" && rhs.type == "number") {
    return eval_numeric_binary_expr(
      lhs as NumberVal,
      rhs as NumberVal,
      binop.operator
    );
  }

  // one or both are null
  return MAKE_NULL();
}

export function eval_identifier(
  ident: Identifier,
  env: Enviroment
): RuntimeVal {
  const val = env.lookupVar(ident.symbol);
  return val;
}

export function eval_assignment(
  node: AssignmentExpr,
  env: Enviroment
): RuntimeVal {
  if (node.assigne.kind !== "Identifier")
    throw `Invalid LHS inaide assignment expr ${JSON.stringify(node.assigne)}`;

  const varname = (node.assigne as Identifier).symbol;
  return env.assignVar(varname, evaluate(node.value, env));
}

export function eval_object_expr(
  obj: ObjectLiteral,
  env: Enviroment
): RuntimeVal {
  const object = { type: "object", properties: new Map() } as ObjectVal;
  for (const { key, value } of obj.properties) {
    const runtimeVal =
      value == undefined ? env.lookupVar(key) : evaluate(value, env);

    object.properties.set(key, runtimeVal);
  }
  return object;
}
