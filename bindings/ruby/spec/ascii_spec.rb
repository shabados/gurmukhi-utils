# frozen_string_literal: true

require 'minitest/autorun'
require 'gurmukhi_utils'
require_relative 'guut'

def ascii(string)
  GurmukhiUtils.ascii(string)
end

class AsciiTest < Minitest::Test
  Guut.guut('toAscii', { 'ascii' => method(:ascii) }, self)
end
