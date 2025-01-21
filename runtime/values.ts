export type ValueTypes = "null" | "undefined" | "number" | "boolean" | "object";

export interface RuntimeVal {
  type: ValueTypes;
}

export interface NullVal extends RuntimeVal {
  type: "null";
  value: null;
}

export function MAKE_NULL(): NullVal {
  return { value: null, type: "null" } as NullVal;
}

export interface NumberVal extends RuntimeVal {
  type: "number";
  value: number;
}

export function MAKE_NUM(num = 0): NumberVal {
  return { value: num, type: "number" } as NumberVal;
}

export interface UndefinedVal extends RuntimeVal {
  type: "undefined";
  value: undefined;
}

export function MAKE_UNDEFINED(): UndefinedVal {
  return { value: undefined, type: "undefined" } as UndefinedVal;
}

export interface BooleanVal extends RuntimeVal {
  type: "boolean";
  value: boolean;
}

export function MAKE_BOOL(bool = true): BooleanVal {
  return { value: bool, type: "boolean" } as BooleanVal;
}

// objects

export interface ObjectVal extends RuntimeVal {
  type: "object";
  properties: Map<string, RuntimeVal>;
}

export function MAKE_OBJECT(): ObjectVal {
  return { type: "object", properties: new Map() } as ObjectVal;
}
