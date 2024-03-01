# rubocop:disable Metrics/BlockLength
# frozen_string_literal: true

require 'spec_helper'
require 'gurmukhi_utils'
require 'json'

# test setup and config

fn = 'toUnicodeAscii'

def a2a(string)
  return GurmukhiUtils.ascii(GurmukhiUtils.unicode(string, "Sant Lipi"))
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
