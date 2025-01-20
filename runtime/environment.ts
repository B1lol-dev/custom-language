import { RuntimeVal } from "./values.ts";

export default class Enviroment {
  private parent?: Enviroment;
  private variables: Map<string, RuntimeVal> = new Map();
  private constants: Set<string>;

  constructor(parentENV?: Enviroment) {
    this.parent = parentENV;
    this.variables = new Map();
    this.constants = new Set();
  }

  /**
   * method to declare a variable
   */
  public declareVar(
    varName: string,
    value: RuntimeVal,
    constant: boolean
  ): RuntimeVal {
    if (this.variables.has(varName)) {
      throw `Cannot declate variable ${varName}. As it's already is defined`;
    }

    this.variables.set(varName, value);

    if (constant) this.constants.add(varName);

    return value;
  }

  /**
   * method to assign a variable
   */
  public assignVar(varName: string, value: RuntimeVal): RuntimeVal {
    const env = this.resolve(varName);

    // Cannot assign a value to constant
    if (env.constants.has(varName)) {
      throw `Cannot assign variable ${varName} as it was declared constant.`;
    }
    env.variables.set(varName, value);
    return value;
  }

  public lookupVar(varName: string): RuntimeVal {
    const env = this.resolve(varName);
    return env.variables.get(varName) as RuntimeVal;
  }

  public resolve(varName: string): Enviroment {
    if (this.variables.has(varName)) return this;
    if (this.parent == undefined)
      throw `Cannot resolve variable ${varName} as it does not exists`;
    return this.parent.resolve(varName);
  }
}
