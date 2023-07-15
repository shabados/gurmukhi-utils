# frozen_string_literal: true

# Copied from https://github.com/shabados/gurmukhiutils/blob/b7a1ca9f0d341b64715158893afb93675c773823/gurmukhiutils/unicode.py
require 'strscan'

module GurmukhiUtils
  UNICODE_STANDARDS = ['Unicode Consortium', 'Sant Lipi'].freeze

  ASCII_TO_SL_TRANSLATION = {
    'a'.ord => 'ੳ',
    'b'.ord => 'ਬ',
    'c'.ord => 'ਚ',
    'd'.ord => 'ਦ',
    'e'.ord => 'ੲ',
    'f'.ord => 'ਡ',
    'g'.ord => 'ਗ',
    'h'.ord => 'ਹ',
    'i'.ord => 'ਿ',
    'j'.ord => 'ਜ',
    'k'.ord => 'ਕ',
    'l'.ord => 'ਲ',
    'm'.ord => 'ਮ',
    'n'.ord => 'ਨ',
    'o'.ord => 'ੋ',
    'p'.ord => 'ਪ',
    'q'.ord => 'ਤ',
    'r'.ord => 'ਰ',
    's'.ord => 'ਸ',
    't'.ord => 'ਟ',
    'u'.ord => 'ੁ',
    'v'.ord => 'ਵ',
    'w'.ord => 'ਾ',
    'x'.ord => 'ਣ',
    'y'.ord => 'ੇ',
    'z'.ord => 'ਜ਼',
    'A'.ord => 'ਅ',
    'B'.ord => 'ਭ',
    'C'.ord => 'ਛ',
    'D'.ord => 'ਧ',
    'E'.ord => 'ਓ',
    'F'.ord => 'ਢ',
    'G'.ord => 'ਘ',
    'H'.ord => '੍ਹ',
    'I'.ord => 'ੀ',
    'J'.ord => 'ਝ',
    'K'.ord => 'ਖ',
    'L'.ord => 'ਲ਼',
    'M'.ord => 'ੰ',
    'N'.ord => 'ਂ',
    'O'.ord => 'ੌ',
    'P'.ord => 'ਫ',
    'Q'.ord => 'ਥ',
    'R'.ord => '੍ਰ',
    'S'.ord => 'ਸ਼',
    'T'.ord => 'ਠ',
    'U'.ord => 'ੂ',
    'V'.ord => 'ੜ',
    'W'.ord => 'ਾਂ',
    'X'.ord => 'ਯ',
    'Y'.ord => 'ੈ',
    'Z'.ord => 'ਗ਼',
    '0'.ord => '੦',
    '1'.ord => '੧',
    '2'.ord => '੨',
    '3'.ord => '੩',
    '4'.ord => '੪',
    '5'.ord => '੫',
    '6'.ord => '੬',
    '7'.ord => '੭',
    '8'.ord => '੮',
    '9'.ord => '੯',
    '['.ord => '।',
    ']'.ord => '॥',
    '\\'.ord => 'ਞ',
    '|'.ord => 'ਙ',
    '`'.ord => 'ੱ',
    '~'.ord => 'ੱ',
    '@'.ord => 'ੑ',
    '^'.ord => 'ਖ਼',
    '&'.ord => 'ਫ਼',
    '†'.ord => '੍ਟ', # dagger symbol
    'ü'.ord => 'ੁ',  # u-diaeresis letter
    '®'.ord => '੍ਰ', # registered symbol
    "\u00b4".ord => 'ੵ', # acute accent (´)
    "\u00a8".ord => 'ੂ',  # diaeresis accent (¨)
    'µ'.ord => 'ੰ',       # mu letter
    'æ'.ord => '਼',
    "\u00a1".ord => 'ੴ',  # inverted exclamation (¡)
    'ƒ'.ord => 'ਨੂੰ',     # florin symbol
    'œ'.ord => '੍ਤ',
    'Í'.ord => '੍ਵ',      # capital i-acute letter
    'Î'.ord => '੍ਯ',      # capital i-circumflex letter
    'Ï'.ord => 'ੵ',       # capital i-diaeresis letter
    'Ò'.ord => '॥',       # capital o-grave letter
    'Ú'.ord => 'ਃ',       # capital u-acute letter
    "\u02c6".ord => 'ਂ',  # circumflex accent (ˆ)
    "\u02dc".ord => '੍ਨ',  # small tilde (˜)
    '§'.ord => '੍ਹੂ',      # section symbol
    '¤'.ord => 'ੱ',       # currency symbol
    'ç'.ord => '੍ਚ',      # c-cedilla letter
    'Ç'.ord => '☬',       # khanda instead of california state symbol
    "\u201a".ord => '❁',  # single low-9 quotation (‚) mark
    'Æ'.ord => nil,
    'Ø'.ord => nil,       # This is a topline / shirorekha (शिरोरेखा) extender
    'ÿ'.ord => nil,       # This is the author Kulbir S Thind's stamp
    'Œ'.ord => nil,       # Box drawing left flower
    '‰'.ord => nil,       # Box drawing right flower
    'Ó'.ord => nil,       # Box drawing top flower
    'Ô'.ord => nil,       # Box drawing bottom flower
    'Î'.ord => '꠳ਯ',      # half-yayya
    'ï'.ord => '꠴ਯ',      # open-top yayya
    'î'.ord => '꠵ਯ'       # open-top half-yayya
  }.freeze

  ASCII_TO_SL_REPLACEMENTS = {
    'ˆØI' => 'ੀਁ', # Handle pre-bihari-bindi with unused adakbindi
    '<>' => 'ੴ', # AnmolLipi/GurbaniAkhar variant
    '<' => 'ੴ',  # GurbaniLipi variant
    '>' => '☬',  # GurbaniLipi variant
    'Åå' => 'ੴ', # AnmolLipi/GurbaniAkhar variant
    'Å' => 'ੴ', # GurbaniLipi variant
    'å' => 'ੴ' # GurbaniLipi variant
  }.freeze

  UNICODE_TO_SL_REPLACEMENTS = {
    '੍ਯ' => '꠳ਯ' # replace unicode half-yayya with Sant Lipi ligature (north indic one-sixteenth fraction + yayya)
  }.freeze

  SL_TO_UNICODE_REPLACEMENTS = {
    '꠳ਯ' => '੍ਯ',
    '꠴ਯ' => 'ਯ',
    '꠵ਯ' => '੍ਯ',
    'ਁ' => 'ਂ' # pre-bihari-bindi
  }.freeze

  ##
  # Converts any ASCII Gurmukhi characters and sanitizes to Unicode Gurmukhi.
  # Note:
  #   Converting yayya (ਯ) variants with an open top using the Unicode Consortium standard is considered destructive.
  #   This function will substitute the original with its shirorekha/top-line equivalent.
  #
  #   Many fonts and text shaping engines fail to render half-yayya (੍ਯ) correctly. Regardless of the standard used,
  #   it is recommended to use the Sant Lipi font mentioned below.
  #
  # @param string [String] The string to affect.
  # @param unicode_standard [String] The mapping system to use. The default is Unicode compliant and can render
  #   99% of the Shabad OS Database. The other option "Sant Lipi" is intended for a custom Unicode font bearing the
  #   same name (see: https://github.com/shabados/SantLipi). Defaults to "Unicode Consortium".
  # @return [String] A string whose Gurmukhi is normalized to a Unicode standard.
  #
  # @example
  #   unicode("123")
  #   #=> "੧੨੩"
  #   unicode("<> > <")
  #   #=> "ੴ ☬ ੴ"
  #   unicode("gurU")
  #   #=> "ਗੁਰੂ"
  ##
  def self.unicode(string, unicode_standard = 'Unicode Consortium')
    # Move ASCII sihari before mapping to unicode
    ascii_base_letters = '\\a-zA-Z|^&Îîï'
    ascii_sihari_pattern = Regexp.new("(i)([#{ascii_base_letters}])")
    string = string.gsub(ascii_sihari_pattern, '\2\1')

    # Map any ASCII / Unicode Gurmukhi to Sant Lipi format
    ASCII_TO_SL_REPLACEMENTS.each do |key, value|
      string.gsub!(key, value)
    end

    UNICODE_TO_SL_REPLACEMENTS.each do |key, value|
      string.gsub!(key, value)
    end

    string = string.chars.map { |c| ASCII_TO_SL_TRANSLATION[c.ord] || c }.join

    string = unicode_normalize(string)

    if unicode_standard == 'Unicode Consortium'
      SL_TO_UNICODE_REPLACEMENTS.each do |key, value|
        string.gsub!(key, value)
      end
    end

    return string
  end

  ##
  # Normalizes Gurmukhi according to Unicode Standards.
  # @param string [String] The string to affect.
  # @return [String] A string containing normalized Gurmukhi.
  #
  # @example
  #   unicode_normalize("Hello ਜੀ")
  #   #=> "Hello ਜੀ"
  ##
  def self.unicode_normalize(string)
    string = sort_diacritics(string)
    return sanitize_unicode(string)
  end

  ##
  # Gurmukhi script, some common diacritics include vowel signs (matras), such as:
  #  ੁ (u), ੀ (ī), or ੋ (ō), and other marks like bindi (ਂ), tippi (ੰ), and nukta (਼).
  #
  # @brief Orders the Gurmukhi diacritics in a string according to Unicode standards.
  # Not intended for base letters with multiple subjoined letters.
  # @param string [String] The string to affect.
  # @return [String] The same string with Gurmukhi diacritics arranged in a sorted manner.
  #
  # @example
  #   sort_diacritics("\u0a41\u0a4b") # => "\u0a4b\u0a41" # ੁੋ vs  ੋੁ
  ##
  def self.sort_diacritics(string)
    # Nukta is essential to form a new base letter and must be ordered first.
    # Udaat, Yakash, and subjoined letters should follow.
    # Subjoined letters are constructed (they are not single char), so they cannot be used
    # in the same regex group pattern. See further below for subjoined letters.
    base_letter_modifiers = ['਼', 'ੑ', 'ੵ']

    # More generally, when a consonant or independent vowel is modified by multiple vowel signs, the sequence of the vowel signs in the underlying representation of the text should be: left, top, bottom, right.
    # p. 491 of The Unicode® Standard Version 14.0 – Core Specification
    # https://www.unicode.org/versions/Unicode14.0.0/ch12.pdf
    vowel_order = ['ਿ', 'ੇ', 'ੈ', 'ੋ', 'ੌ', 'ੁ', 'ੂ', 'ਾ', 'ੀ']

    # The remaining diacritics are to be sorted at the end according to the following order
    remaining_modifier_order = ['ਁ', 'ੱ', 'ਂ', 'ੰ', 'ਃ']

    generated_marks = (base_letter_modifiers + vowel_order + remaining_modifier_order).join
    mark_pattern = Regexp.new("([#{generated_marks}]*)")

    virama = '੍'
    below_base_letters = 'ਹਰਵਟਤਨਚ'
    below_base_pattern = Regexp.new("(#{virama}[#{below_base_letters}])?")

    regex_match_pattern = Regexp.new("#{mark_pattern}#{below_base_pattern}#{mark_pattern}")

    generated_match_order = (base_letter_modifiers + [virama] + below_base_letters.chars + vowel_order + remaining_modifier_order).join

    string.gsub(regex_match_pattern) do |match|
      match_chars = match.chars
      match_chars.sort_by! { |e| generated_match_order.index(e) }
      match_chars.join
    end
  end

  def self.sanitize_unicode(string)
    unicode_sanitization_map = {
      "\u0a73\u0a4b" => "\u0a13", # ਓ
      "\u0a05\u0a3e" => "\u0a06",  # ਅ + ਾ = ਆ
      "\u0a72\u0a3f" => "\u0a07",  # ਇ
      "\u0a72\u0a40" => "\u0a08",  # ਈ
      "\u0a73\u0a41" => "\u0a09",  # ਉ
      "\u0a73\u0a42" => "\u0a0a",  # ਊ
      "\u0a72\u0a47" => "\u0a0f",  # ਏ
      "\u0a05\u0a48" => "\u0a10",  # ਐ
      "\u0a05\u0a4c" => "\u0a14",  # ਔ
      "\u0a32\u0a3c" => "\u0a33",  # ਲ਼
      "\u0a38\u0a3c" => "\u0a36",  # ਸ਼
      "\u0a16\u0a3c" => "\u0a59",  # ਖ਼
      "\u0a17\u0a3c" => "\u0a5a",  # ਗ਼
      "\u0a1c\u0a3c" => "\u0a5b",  # ਜ਼
      "\u0a2b\u0a3c" => "\u0a5e",  # ਫ਼
      "\u0a71\u0a02" => "\u0a01" # ਁ adak bindi (quite literally never used today or in the Shabad OS Database, only included for parity with the Unicode block)
    }

    unicode_sanitization_map.each do |key, value|
      string.gsub!(key, value)
    end

    return string
  end

  ##
  # Takes a string and returns a list of keys and values of each character and its corresponding code point.
  # @param string [String] the string to affect
  # @return [Array<Hash{String => String}>] a list of each character and its corresponding code point
  # @example
  #   decode_unicode("To ਜੀ")
  #   #=> [{"T" => "0054"}, {"o" => "006f"}, {" " => "0020"}, {"ਜ" => "0a1c"}, {"ੀ" => "0a40"}]
  ##
  def self.decode_unicode(string)
    return string.chars.map { |item| { item => format('%04x', item.ord) } }
  end

  ##
  # Takes a string and returns its corresponding unicode character.
  # @param strings [Array<String>] the list containing any strings to encode
  # @return [Array<String>] a list of any corresponding unicode characters
  # @example
  #   encode_unicode(["0054"])
  #   #=> "T"
  #   encode_unicode(["0a1c", "0A40"])
  #   #=> ["ਜ", "ੀ"]
  ##
  def self.encode_unicode(strings)
    return strings.map { |string| string.to_i(16).chr(Encoding::UTF_8) }
  end
end
