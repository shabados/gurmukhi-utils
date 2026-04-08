$LOAD_PATH.unshift(File.expand_path("lib", __dir__))
require "gurmukhi/gurmukhi"

result = Gurmukhi.to_unicode("gurU", Gurmukhi::UnicodeStandard::SANT_LIPI)
raise "FAIL: expected 'ਗੁਰੂ', got '#{result}'" unless result == "ਗੁਰੂ"
puts "PASS: Ruby"
