# frozen_string_literal: true

module GurmukhiUtils
  # Removes substrings from the string.
  #
  # @param string [String] The string to affect.
  # @param removals [Array<String>] Any substring to remove.
  # @return [String] The string without any substrings.
  #
  # @example
  #   remove("ਸਬਦ. ਸਬਦ, ਸਬਦ; ਸਬਦ", [".", ","])
  #   # => "ਸਬਦ ਸਬਦ ਸਬਦ; ਸਬਦ"
  #   remove("ਸਬਦ. ਸਬਦ, ਸਬਦ; ਸਬਦ", GurmukhiUtils::Constants::VISHRAMS)
  #   # => "ਸਬਦ ਸਬਦ ਸਬਦ ਸਬਦ"
  def remove(string, removals)
    removals.each { |removal| string.gsub!(removal, '') }
    string
  end

  # Removes regex patterns from the string.
  #
  # Note:
  #   Also removes duplicate space characters from the string.
  #
  # @param string [String] The string to affect.
  # @param patterns [Array<String>] Any pattern to remove.
  # @return [String] The string without any matching patterns, duplicate spaces, or leading/trailing spaces.
  #
  # @example
  #   remove_regex("ਸਬਦ. ਸਬਦ, ਸਬਦ; ਸਬਦ", [".+\\s"])
  #   # => "ਸਬਦ"
  def remove_regex(string, patterns)
    patterns.each { |pattern| string.gsub!(Regexp.new(pattern), '') }
    string.squeeze!(' ').strip!
    string
  end

  # Attempts to remove line endings as best as possible.
  #
  # @param string [String] The unicode Gurmukhi, Hindi, or English translation/transliteration to affect.
  # @return [String] The string without line endings.
  #
  # @example
  #   remove_line_endings("ਸਬਦ ॥ ਸਬਦ ॥੧॥ ਰਹਾਉ ॥")
  #   # => "ਸਬਦ ਸਬਦ"
  def remove_line_endings(string)
    line_ending_patterns = [
      '[।॥] *(ਰਹਾਉ|रहाउ).*',
      '[|] *Pause.*',
      '[|] *(rahaau|rahau|rahao).*',
      '[।॥][੦-੯|०-९].*',
      '[|]\\d.*',
      '[।॥|]'
    ]

    remove_regex(string, line_ending_patterns)
  end

  # Removes all vishram characters.
  #
  # @param string [String] The string to affect.
  # @return [String] The string without vishrams.
  #
  # @example
  #   remove_vishrams("ਸਬਦ. ਸਬਦ, ਸਬਦ; ਸਬਦ ॥")
  #   # => "ਸਬਦ ਸਬਦ ਸਬਦ ਸਬਦ ॥"
  def remove_vishrams(string)
    remove(string, GurmukhiUtils::Constants::VISHRAMS)
  end
end
