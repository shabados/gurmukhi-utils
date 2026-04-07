# frozen_string_literal: true

require 'minitest/autorun'
require 'gurmukhi_utils'
require_relative 'guut'

def unicode(string)
  GurmukhiUtils.unicode(string)
end

def unicode3(string)
  unicode(unicode(unicode(string)))
end

def santlipi(string)
  GurmukhiUtils.unicode(string, "Sant Lipi")
end

def santlipi3(string)
  santlipi(santlipi(santlipi(string)))
end

def unisant(string)
  unicode(santlipi(string))
end

def unisant2(string)
  unisant(unisant(string))
end

class UnicodeTest < Minitest::Test
  functions = {
    'unicode' => method(:unicode),
    'unicode3' => method(:unicode3),
    'santlipi' => method(:santlipi),
    'santlipi3' => method(:santlipi3),
    'unisant' => method(:unisant),
    'unisant2' => method(:unisant2)
  }
  
  Guut.guut('toUnicode', functions, self)
end
