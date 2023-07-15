# frozen_string_literal: true

require_relative 'lib/version'

Gem::Specification.new do |spec|
  spec.name          = 'gurmukhi_utils'
  spec.version       = '0.0.1'
  spec.authors       = ['Dilraj Singh Somel (dsomel21)']
  spec.email         = ['dsomel21@gmail.com']

  spec.summary       = 'A utility gem for converting, analyzing, and testing Gurmukhi strings.'
  spec.description   = 'Library for working with Gurmukhi text, providing various operations like unicode conversion, ascii conversion, and more.'
  spec.homepage      = 'https://github.com/shabados/gurmukhi_utils'
  spec.license       = 'MIT'

  spec.required_ruby_version = '3.2.1'
  spec.files = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec)/}) }
  spec.executables = ['gurmukhi_utils']
  spec.require_paths = ['lib']
  spec.metadata['rubygems_mfa_required'] = 'true'
end
