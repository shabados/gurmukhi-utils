# rubocop:disable Metrics/BlockLength
# frozen_string_literal: true

require 'spec_helper'
require 'gurmukhi_utils'

def triple_unicode(string)
  return GurmukhiUtils.unicode(GurmukhiUtils.unicode(GurmukhiUtils.unicode(string)))
end

RSpec.describe GurmukhiUtils do
  describe '.unicode' do
    it 'converts the input correctly' do
      assertions = {
        '123' => '੧੨੩',
        '<> > <' => 'ੴ ☬ ੴ',
        'gurU' => 'ਗੁਰੂ'
      }

      assertions.each do |key, value|
        expect(triple_unicode(key)).to eq(value)
      end
    end

    it 'converts the input with diacritics correctly' do
      assertions = {
        'kRwN' => 'ਕ੍ਰਾਂ',
        'sÍwNiq' => 'ਸ੍ਵਾਂਤਿ',
        'iBRMg' => 'ਭ੍ਰਿੰਗ',
        'inR`qy' => 'ਨ੍ਰਿੱਤੇ',
        'ik®`sM' => 'ਕ੍ਰਿੱਸੰ',
        'AMimR`q' => 'ਅੰਮ੍ਰਿੱਤ',
        'Qwin´M' => 'ਥਾਨੵਿੰ',
        'kRwNq' => 'ਕ੍ਰਾਂਤ',
        'k®ü`D' => 'ਕ੍ਰੁੱਧ',
        'ijnHYN' => 'ਜਿਨ੍ਹੈਂ',
        'hÍüYbo' => 'ਹ੍ਵੈੁਬੋ',
        'nUµ' => 'ਨੂੰ',
        '^u`d' => 'ਖ਼ੁੱਦ',
        'PzUM' => 'ਫਜ਼ੂੰ',
        'kwrmu`l-k`rwm' => 'ਕਾਰਮੁੱਲ-ਕੱਰਾਮ',
        '&ru¤^y' => 'ਫ਼ਰੁੱਖ਼ੇ',
        '^u¤ro' => 'ਖ਼ੁੱਰੋ',
        'duoAwlY' => 'ਦੋੁਆਲੈ',
        'idRV@IAw' => 'ਦ੍ਰਿੜੑੀਆ',
        'kwn@ü' => 'ਕਾਨੑੁ',
        'ijMn@I' => 'ਜਿੰਨੑੀ',
        'El@w' => 'ਓਲੑਾ',
        'swm@Y' => 'ਸਾਮੑੈ',
        'kqybhuˆ' => 'ਕਤੇਬਹੁਂ'
      }

      assertions.each do |key, value|
        expect(triple_unicode(key)).to eq(value)
      end
    end
  end
end

# rubocop:enable Metrics/BlockLength
