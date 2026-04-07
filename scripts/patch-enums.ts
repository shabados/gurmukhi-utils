import { readFileSync, writeFileSync, renameSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { globSync } from "node:fs";

const DIR = "generated/web";

const toKebabCase = (s: string) =>
  s.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/_/g, "-").toLowerCase();

// --- Rename underscore files to kebab-case ---

const renameFiles = (dir: string) => {
  const underscoreFiles = globSync(join(dir, "*_*.ts"));
  return underscoreFiles.map((file) => {
    const kebab = join(dirname(file), toKebabCase(file.split("/").pop()!));
    renameSync(file, kebab);
    return { from: file, to: kebab };
  });
};

const fixImportPaths = (file: string) => {
  const code = readFileSync(file, "utf8");
  const fixed = code
    .replace(/'\.\/\/gurmukhi_utils'/g, "'./gurmukhi-utils'")
    .replace(/'\.\/\/wasm-bindgen/g, "'./wasm-bindgen");
  writeFileSync(file, fixed);
};

// --- Enum patching ---

interface EnumInfo {
  name: string;
  variants: string[];
}

const parseEnums = (code: string): EnumInfo[] =>
  [...code.matchAll(/export enum (\w+)\s*\{([^}]+)\}/g)].map(
    ([, name, body]) => ({
      name,
      variants: body
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean),
    })
  );

const buildUnionType = (typeName: string, variants: string[]) =>
  `export type ${typeName} = ${variants.map((v) => `"${toKebabCase(v)}"`).join(" | ")};`;

const buildMap = (
  mapName: string,
  typeName: string,
  enumName: string,
  variants: string[]
) =>
  [
    `const ${mapName}: Record<${typeName}, ${enumName}> = {`,
    ...variants.map((v) => `  "${toKebabCase(v)}": ${enumName}.${v},`),
    `};`,
  ].join("\n");

const appendAfterEnum = (code: string, { name, variants }: EnumInfo) => {
  const typeName = `${name}Name`;
  const mapName = `${name}Map`;
  const additions = [
    buildUnionType(typeName, variants),
    "",
    buildMap(mapName, typeName, name, variants),
  ].join("\n");

  return code.replace(
    new RegExp(`(export enum ${name}\\s*\\{[^}]+\\})`),
    `$1\n\n${additions}`
  );
};

const widenFunctionSignatures = (code: string, { name }: EnumInfo) => {
  const typeName = `${name}Name`;
  const mapName = `${name}Map`;

  return code.replace(
    new RegExp(
      `(export function \\w+\\([^)]*\\b(\\w+)):\\s*${name}(\\)[^{]*\\{)`,
      "g"
    ),
    [
      `$1: ${name} | ${typeName}$3`,
      `    if (typeof $2 === "string") $2 = ${mapName}[$2];`,
    ].join("\n")
  );
};

const patchEnum = (code: string, info: EnumInfo) =>
  widenFunctionSignatures(appendAfterEnum(code, info), info);

// --- Run ---

const renamed = renameFiles(DIR);
renamed.forEach(({ from, to }) => console.log(`Renamed ${from} -> ${to}`));

const entrypoint = join(DIR, "index.ts");
fixImportPaths(entrypoint);

const bindingsFile = join(DIR, "gurmukhi-utils.ts");
const code = readFileSync(bindingsFile, "utf8");
const enums = parseEnums(code);
const patched = enums.reduce(patchEnum, code);
writeFileSync(bindingsFile, patched);

console.log(
  `Patched ${enums.length} enum(s): ${enums.map((e) => e.name).join(", ")}`
);
