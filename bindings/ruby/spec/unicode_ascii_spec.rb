# frozen_string_literal: true

require 'minitest/autorun'
require 'gurmukhi_utils'
require_relative 'guut'

def a2a(string)
  GurmukhiUtils.ascii(GurmukhiUtils.unicode(string, "Sant Lipi"))
end

class UnicodeAsciiTest < Minitest::Test
  Guut.guut('toUnicodeAscii', { 'a2a' => method(:a2a) }, self)
end
