// React Native entry point. Hand-maintained (listed in ubrn.config.yaml noOverwrite).
//
// Presents the same public surface as the wasm bindings (generated/wasm/gurmukhi.d.ts):
// string-literal enums rather than the numeric TS enums ubrn generates. The two entry
// points must stay interchangeable — `import { toUnicode } from "gurmukhi"` behaves
// identically under Metro (this file) and every other bundler (wasm entry).
import installer from './NativeGurmukhi';
import * as gen from './generated/gurmukhi';

// Register the Rust crate with Hermes and run uniffi checksum initialization.
// Guarded so Metro dev reloads don't re-install.
let installed = false;
if (!installed) {
  installer.installRustCrate();
  gen.default.initialize();
  installed = true;
}

export type Feature =
  | 'VishramHeavy'
  | 'VishramMedium'
  | 'VishramLight'
  | 'RahaoEnding'
  | 'NumberedEnding'
  | 'BareEnding'
  | 'VowelSign'
  | 'VowelCarrier'
  | 'Nukta'
  | 'Adhak'
  | 'Nasal'
  | 'Accent'
  | 'Visarga';
export type Script = 'Devanagari' | 'Latin' | 'LatinScholar';
export type UnicodeStandard = 'UnicodeConsortium' | 'SantLipi';
export interface FeatureMatch {
  feature: Feature;
  start: bigint;
  end: bigint;
}

const toFeature = (f: gen.Feature): Feature => gen.Feature[f] as Feature;
const fromFeature = (f: Feature): gen.Feature => gen.Feature[f];
const toFeatures = (fs: gen.Feature[]): Feature[] => fs.map(toFeature);
const fromFeatures = (fs: Feature[]): gen.Feature[] => fs.map(fromFeature);

export const toAscii = (input: string): string => gen.toAscii(input);
export const toUnicode = (input: string, standard: UnicodeStandard): string =>
  gen.toUnicode(input, gen.UnicodeStandard[standard]);
export const normalizeUnicode = (input: string): string => gen.normalizeUnicode(input);
export const transcribe = (input: string, script: Script): string =>
  gen.transcribe(input, gen.Script[script]);
export const remove = (input: string, features: Feature[]): string =>
  gen.remove(input, fromFeatures(features));
export const detect = (input: string, features: Feature[]): FeatureMatch[] =>
  gen.detect(input, fromFeatures(features)).map((m) => ({
    feature: toFeature(m.feature),
    start: m.start,
    end: m.end,
  }));
export const featureChars = (feature: Feature): string[] =>
  gen.featureChars(fromFeature(feature));

export const allFeatures = (): Feature[] => toFeatures(gen.allFeatures());
export const lineEndings = (): Feature[] => toFeatures(gen.lineEndings());
export const modifiers = (): Feature[] => toFeatures(gen.modifiers());
export const vishraams = (): Feature[] => toFeatures(gen.vishraams());
export const vowels = (): Feature[] => toFeatures(gen.vowels());
