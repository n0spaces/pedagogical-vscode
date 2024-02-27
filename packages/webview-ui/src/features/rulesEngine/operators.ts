// Custom operators to use with json-rules-engine conditions
import { Operator } from "json-rules-engine";
import { RegExpParams } from "shared/src/rules";

function not(fn: (a: any, b: any) => boolean) {
  return (a: any, b: any) => !fn(a, b);
}

function matchesRegExpEval(factValue: unknown, params: RegExpParams): boolean {
  const factString = String(factValue);
  const regexp = RegExp(params.pattern, params.flags);
  return regexp.test(factString);
}

function startsWithEval(factValue: unknown, searchString: string) {
  return String(factValue).startsWith(searchString);
}

function endsWithEval(factValue: unknown, searchString: string) {
  return String(factValue).endsWith(searchString);
}

function defined(factValue: unknown, _jsonValue: unknown) {
  return factValue !== undefined;
}

export const operators = [
  new Operator("matchesRegExp", matchesRegExpEval),
  new Operator("notMatchesRegExp", not(matchesRegExpEval)),
  new Operator("startsWith", startsWithEval),
  new Operator("notStartsWith", not(startsWithEval)),
  new Operator("endsWith", endsWithEval),
  new Operator("notEndsWith", not(endsWithEval)),
  new Operator("defined", defined),
  new Operator("undefined", not(defined)),
];