# frozen_string_literal: true

require 'minitest/autorun'
require 'gurmukhi_utils'
require_relative 'guut'

class UnicodeAsciiTest < Minitest::Test
  Guut.guut('toUnicodeAscii', {
    'a2a' => ->(s) { GurmukhiUtils.to_ascii(GurmukhiUtils.to_unicode(s, GurmukhiUtils::UnicodeStandard::SANT_LIPI)) },
  }, self)
end
