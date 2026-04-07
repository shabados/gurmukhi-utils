# frozen_string_literal: true

require 'minitest/autorun'
require 'gurmukhi_utils'
require_relative 'guut'

class AsciiTest < Minitest::Test
  Guut.guut('toAscii', { 'ascii' => ->(s) { GurmukhiUtils.to_ascii(s) } }, self)
end
