# frozen_string_literal: true

module GurmukhiUtils
  ASCII_TRANSLATION = {
    'ੳ'.ord => 'a',
    'ਅ'.ord => 'A',
    'ੲ'.ord => 'e',
    'ਸ'.ord => 's',
    'ਹ'.ord => 'h',
    'ਕ'.ord => 'k',
    'ਖ'.ord => 'K',
    'ਗ'.ord => 'g',
    'ਘ'.ord => 'G',
    'ਙ'.ord => '|',
    'ਚ'.ord => 'c',
    'ਛ'.ord => 'C',
    'ਜ'.ord => 'j',
    'ਝ'.ord => 'J',
    'ਞ'.ord => '\\',
    'ਟ'.ord => 't',
    'ਠ'.ord => 'T',
    'ਡ'.ord => 'f',
    'ਢ'.ord => 'F',
    'ਣ'.ord => 'x',
    'ਤ'.ord => 'q',
    'ਥ'.ord => 'Q',
    'ਦ'.ord => 'd',
    'ਧ'.ord => 'D',
    'ਨ'.ord => 'n',
    'ਪ'.ord => 'p',
    'ਫ'.ord => 'P',
    'ਬ'.ord => 'b',
    'ਭ'.ord => 'B',
    'ਮ'.ord => 'm',
    'ਯ'.ord => 'X',
    'ਰ'.ord => 'r',
    'ਲ'.ord => 'l',
    'ਵ'.ord => 'v',
    'ੜ'.ord => 'V',
    'ਸ਼'.ord => 'S',
    'ਜ਼'.ord => 'z',
    'ਖ਼'.ord => '^',
    'ਫ਼'.ord => '&',
    'ਗ਼'.ord => 'Z',
    'ਲ਼'.ord => 'L',
    '਼'.ord => 'æ',
    'ੑ'.ord => '@',
    'ੵ'.ord => "\u00b4", # acute accent (´)
    'ਃ'.ord => 'Ú', # capital u-acute letter
    "\u0a13".ord => 'E', # ਓ
    "\u0a06".ord => 'Aw',  # ਆ
    "\u0a07".ord => 'ei',  # ਇ
    "\u0a08".ord => 'eI',  # ਈ
    "\u0a09".ord => 'au',  # ਉ
    "\u0a0a".ord => 'aU',  # ਊ
    "\u0a0f".ord => 'ey',  # ਏ
    "\u0a10".ord => 'AY',  # ਐ
    "\u0a14".ord => 'AO',  # ਔ
    'ਾ'.ord => 'w',
    'ਿ'.ord => 'i',
    'ੀ'.ord => 'I',
    'ੁ'.ord => 'u',
    'ੂ'.ord => 'U',
    'ੇ'.ord => 'y',
    'ੈ'.ord => 'Y',
    'ੋ'.ord => 'o',
    'ੌ'.ord => 'O',
    'ੰ'.ord => 'M',
    'ਂ'.ord => 'N',
    'ੱ'.ord => '~',
    '।'.ord => '[',
    '॥'.ord => ']',
    '੦'.ord => '0',
    '੧'.ord => '1',
    '੨'.ord => '2',
    '੩'.ord => '3',
    '੪'.ord => '4',
    '੫'.ord => '5',
    '੬'.ord => '6',
    '੭'.ord => '7',
    '੮'.ord => '8',
    '੯'.ord => '9',
    'ੴ'.ord => '<>',
    '☬'.ord => 'Ç'
  }.freeze

  ASCII_REPLACEMENTS = {
    "੍ਯ" => "Î",  # half-yayya
    "\ufe00\ufe01ਯ" => "î",  # open-top half-yayya
    "\ufe00ਯ" => "Î",  # sant lipi variation of half-yayya
    "\ufe01ਯ" => "ï",  # open-top yayya
    "ਂ\u200dੀ" => "ˆØI",  # bindi + bihari ligature
    '੍ਰ' => 'R',
    '੍ਵ' => 'Í',  # capital i-acute letter
    '੍ਹ' => 'H',
    '੍ਚ' => 'ç',  # c-cedilla letter
    '੍ਟ' => '†',  # dagger symbol
    '੍ਤ' => 'œ',
    '੍ਨ' => "\u02dc" # small tilde (˜)
  }.freeze

  # TODO: Raise warnings  if incorrect vowel syntax

  def self.ascii(string)
    string = unicode_normalize(string)

    # Perform replacements
    ASCII_REPLACEMENTS.each do |key, value|
      string.gsub!(key, value)
    end

    # Perform translation
    string = string.chars.map { |c| ASCII_TRANSLATION[c.ord] || c }.join

    # Re-arrange sihari
    ascii_base_letters = 'AeshkKgG|cCjJ\\\\tTfFxqQdDnpPbBmXrlvVSz^&ZLÎïî'
    ascii_modifiers = 'æ@´ÚwIuUyYoO`MNRÍHç†œ˜ü¨®µˆW~¤Ï'
    regex = Regexp.new("([#{ascii_base_letters}][#{ascii_modifiers}]*)i([#{ascii_modifiers}]*)")
    string.gsub!(regex, 'i\1\2')

    # Fix below-base-letter + u vowel positioning
    ascii_below_base_letters = 'RÍHç†œ˜´@'
    below_vowel_mappings = {
      'u' => 'ü',
      'U' => '¨'
    }

    below_vowel_mappings.each do |key, value|
      string.gsub!(/([#{ascii_below_base_letters}][#{ascii_modifiers}]*)#{key}([#{ascii_modifiers}]*)/, "\\1#{value}\\2")
    end

    # Fix center-stroke + tippi positioning
    center_stroke_letters = 'nT'
    string.gsub!(/([#{center_stroke_letters}][#{ascii_modifiers}]*)M([#{ascii_modifiers}]*)/, '\\1µ\\2')

    # Fix positioning of bindi/tippi when it is the only above-base-form
    ascii_non_above_modifiers = 'æ@´ÚwuURÍHç†œ˜ü¨®Ï'
    nasalization_mappings = {
      'N' => 'ˆ',
      '~' => '`'
    }
    nasalization_mappings.each do |key, value|
      string.gsub!(/([#{ascii_base_letters}][#{ascii_non_above_modifiers}]*)#{key}([#{ascii_non_above_modifiers}]*)/, "\\1#{value}\\2")
    end

    # Make rendering changes for combos
    ascii_combo_replacements = {
      'IM' => 'µØI',  # tippi + bihari ligature
      'Iµ' => 'µØI',  # tippi + bihari ligature
      'kR' => 'k®', # kakka + pair-rara ligature
      'H¨' => '§',
      'wN' => 'W',  # addhak positioning
      'wˆ' => 'W',  # addhak positioning
      'nUµ' => 'ƒ'
    }
    ascii_combo_replacements.each do |key, value|
      string.gsub!(key, value)
    end
    return string
  end
end
