# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = 'gurmukhi_utils'
  spec.version       = '0.0.3'
  spec.authors       = ['Dilraj Singh Somel (dsomel21)']
  spec.email         = ['dsomel21@gmail.com']

  spec.summary       = 'A utility gem for converting, analyzing, and testing Gurmukhi strings.'
  spec.description   = 'Library for working with Gurmukhi text, providing various operations like unicode conversion, ascii conversion, and more.'
  spec.homepage      = 'https://github.com/ShabadOS/gurmukhi-utils/tree/main/ruby'
  spec.license       = 'MIT'

  spec.required_ruby_version = '>= 2.5.0'

  spec.files = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec)/}) }
  spec.require_paths = ['lib']

  spec.metadata['rubygems_mfa_required'] = 'true'
end
