export type NodeType =
  // STATEMENTS
  | "Program"
  | "VarDeclaration"

  // EXPRESSIONS
  | "AssignmentExpr"

  // Literals
  | "Property"
  | "ObjectLiteral"
  | "NumericListeral"
  | "Identifier"
  | "BinaryExpr";
//   | "CallExpr"
//   | "UnaryExpr"
//   | "FunctionDeclaration";

export interface Stmt {
  kind: NodeType;
}

export interface Program extends Stmt {
  kind: "Program";
  body: Stmt[];
}

export interface VarDeclaration extends Stmt {
  kind: "VarDeclaration";
  constant: boolean;
  identifier: string;
  value?: Expr;
}

export interface Expr extends Stmt {}

export interface AssignmentExpr extends Expr {
  kind: "AssignmentExpr";
  assigne: Expr;
  value: Expr;
}

export interface BinaryExpr extends Expr {
  kind: "BinaryExpr";
  left: Expr;
  right: Expr;
  operator: string;
}

export interface Identifier extends Expr {
  kind: "Identifier";
  symbol: string;
}

export interface NumericListeral extends Expr {
  kind: "NumericListeral";
  value: number;
}

export interface Property extends Expr {
  kind: "Property";
  key: string;
  value?: Expr;
}

export interface ObjectLiteral extends Expr {
  kind: "ObjectLiteral";
  properties: Property[];
}
