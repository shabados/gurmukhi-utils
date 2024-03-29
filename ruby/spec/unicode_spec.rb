# rubocop:disable Metrics/BlockLength
# frozen_string_literal: true

require 'spec_helper'
require 'gurmukhi_utils'
require 'json'

# test setup and config

fn = 'toUnicode'

def unicode(string)
  return GurmukhiUtils.unicode(string)
end

def unicode3(string)
  return unicode(unicode(unicode(string)))
end

def santlipi(string)
  return GurmukhiUtils.unicode(string, "Sant Lipi")
end

def santlipi3(string)
  return santlipi(santlipi(santlipi(string)))
end

def unisant(string)
  return unicode(santlipi(string))
end

def unisant2(string)
  return unisant(unisant(string))
end

# re-usable code below

file = File.read("../test/#{fn}.json")
data_hash = JSON.parse(file)

RSpec.describe do
  data_hash['tests'].each do |test|
    if test["type"] == "is"
      it test["name"] do
        test["assertions"].each do |a, b|
          if b == nil
            b = a
          end
          test["functions"].each do |f|
            expect(send(f, a)).to eq(b)
          end
        end
      end
    end
  end
end

# rubocop:enable Metrics/BlockLength
