# frozen_string_literal: true

require 'spec_helper'
require 'gurmukhi_utils'
require 'json'

# test setup and config

fn = 'toAscii'

def ascii(string)
  return GurmukhiUtils.ascii(string)
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
