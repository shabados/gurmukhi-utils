import 'dart:convert';
import 'dart:io';
import 'package:test/test.dart';
import 'package:path/path.dart' as path;
import 'package:gurmukhi_utils/gurmukhi_utils.dart';

typedef _TestFunc = String Function(String);

class _TestHelper {
  final String name;
  final Iterable<String> functions;
  final String type;
  final Map<String, String> assertions;

  _TestHelper.fromJson(Map<String, dynamic> json)
      : name = json['name'],
        functions = (json['functions'] as List).map((e) => e as String),
        type = json['type'],
        assertions = (json['assertions'] as Map).cast<String, String>();

  static void runTests(String filename, Map<String, _TestFunc> functions) {
    final file = File(path.join('..', 'test', filename));
    final json = jsonDecode(file.readAsStringSync()) as Map<String, dynamic>;
    final list = (json['tests'] as List).map((e) => _TestHelper.fromJson(e));

    for (final item in list) {
      test(item.name, () {
        for (final func in item.functions) {
          for (final entry in item.assertions.entries) {
            expect(
              functions[func]!(entry.key),
              entry.value,
              reason: 'Function: $func',
            );
          }
        }
      });
    }
  }
}

void main() {
  group('conversion (ascii to gurmukhi):', () {
    String unicode(String text) => asciiToGurmukhi(text);
    String unicode3(String text) => unicode(unicode(unicode(text)));
    String santlipi(String text) => asciiToGurmukhi(text, extensions: true);
    String santlipi3(String text) => santlipi(santlipi(santlipi(text)));
    String unisant(String text) => unicode(santlipi(text));
    String unisant2(String text) => unisant(unisant(text));

    _TestHelper.runTests('toUnicode.json', {
      'unicode': unicode,
      'unicode3': unicode3,
      'santlipi': santlipi,
      'santlipi3': santlipi3,
      'unisant': unisant,
      'unisant2': unisant2,
    });
  });
}
