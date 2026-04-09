# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = 'gurmukhi'
  spec.version       = '1.0.0'
  spec.authors       = ['Shabad OS']
  spec.email         = ['team@shabados.com']

  spec.summary       = 'A utility gem for converting, analyzing, and testing Gurmukhi strings.'
  spec.description   = 'Library for working with Gurmukhi text, providing various operations like unicode conversion, ascii conversion, and more. Powered by Rust via UniFFI.'
  spec.homepage      = 'https://github.com/shabados/gurmukhi-utils'
  spec.license       = 'MIT'

  spec.required_ruby_version = '>= 3.0.0'

  spec.files = Dir['lib/**/*.rb'] + Dir['lib/gurmukhi/libgurmukhi.{so,dylib}'] + Dir['lib/gurmukhi/gurmukhi.dll']
  spec.require_paths = ['lib']

  spec.add_dependency 'ffi', '~> 1.0'

  spec.metadata['rubygems_mfa_required'] = 'true'
end
