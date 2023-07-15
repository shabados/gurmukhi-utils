# frozen_string_literal: true

require 'spec_helper'
require 'gurmukhi_utils'

RSpec.describe GurmukhiUtils do
  describe '.ascii' do
    context 'general cases' do
      let(:assertions) do
        {
          '੧੨੩' => '123',
          'ੴ ☬ ੴ' => '<> Ç <>',
          'ਗੁਰੂ' => 'gurU'
        }
      end

      it 'converts Gurmukhi Unicode to ASCII' do
        assertions.each do |key, value|
          expect(GurmukhiUtils.ascii(key)).to eq(value)
        end
      end
    end

    context 'diacritics' do
      let(:assertions) do
        {
          'ਕ੍ਰਾਂ' => 'k®W',
          'ਸ੍ਵਾਂਤਿ' => 'sÍWiq',
          'ਭ੍ਰਿੰਗ' => 'iBRMg',
          'ਨ੍ਰਿੱਤੇ' => 'inR`qy',
          'ਕ੍ਰਿੱਸੰ' => 'ik®`sM',
          'ਅੰਮ੍ਰਿੱਤ' => 'AMimR`q',
          'ਥਾਨੵਿੰ' => 'Qwin´µ',
          'ਕ੍ਰਾਂਤ' => 'k®Wq',
          'ਕ੍ਰੁੱਧ' => 'k®ü`D',
          'ਜਿਨ੍ਹੈਂ' => 'ijnHYN',
          'ਹ੍ਵੈੁਬੋ' => 'hÍYübo',
          'ਨੂੰ' => 'ƒ',
          'ਖ਼ੁੱਦ' => '^u`d',
          'ਫਜ਼ੂੰ' => 'PzUM',
          'ਕਾਰਮੁੱਲ-ਕੱਰਾਮ' => 'kwrmu`l-k`rwm',
          'ਫ਼ਰੁੱਖ਼ੇ' => '&ru`^y',
          'ਖ਼ੁੱਰੋ' => '^u`ro',
          'ਦੋੁਆਲੈ' => 'douAwlY',
          'ਦ੍ਰਿੜੑੀਆ' => 'idRV@IAw',
          'ਕਾਨੑੁ' => 'kwn@ü',
          'ਜਿੰਨੑੀ' => 'ijMn@I',
          'ਓਲੑਾ' => 'El@w',
          'ਸਾਮੑੈ' => 'swm@Y',
          'ਕਤੇਬਹੁਂ' => 'kqybhuˆ'
        }
      end
      it 'handles vowels and other characters like (ਂ), (ੰ), and nukta (਼) to ASCII' do
        assertions.each do |key, value|
          expect(GurmukhiUtils.ascii(key)).to eq(value)
        end
      end
    end

    context 'yayya' do
      let(:assertions) do
        {
          # Yayya
          'ਯਕੀਂ' => 'XkIN',
          'ਪ੍ਰਿਯ' => 'ipRX',
          # ...
          'ਤ꠳ਯਾਗ꠳ਯੋ' => 'qÎwgÎo',
          'ਜ꠳ਯੋਂ' => 'jÎoN',
          # Open-top Yayya
          'ਨਾਮ꠴ਯ' => 'nwmï',
          # ...
          'ਸ꠴ਯਾਮ' => 'sïwm',
          # Open-top Half-Y
          'ਦਿਤ꠴ਯਾਦਿਤ꠵ਯ' => 'idqïwidqî',
          'ਤ੍ਰਸ꠵ਯੋ' => 'qRsîo'
        }
      end

      it 'handle yayya cases to ASCII' do
        assertions.each do |key, value|
          expect(GurmukhiUtils.ascii(key)).to eq(value)
        end
      end
    end
  end
end
