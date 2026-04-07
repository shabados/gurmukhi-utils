# Gurmukhi Utils (Ruby)

Ruby library for converting, analyzing, and testing Gurmukhi strings.

## Prerequisites

Ruby `2.5.0` or later is required to use this gem.

## Installation

You can install the GurmukhiUtils gem from [RubyGems.org](https://rubygems.org/gems/gurmukhi_utils) directly into your system:

```bash
gem install gurmukhi_utils
```

**Or** you can add it to your Gemfile:

```ruby
gem 'gurmukhi_utils'
```

Then run `bundle install`.

## Usage

You can use the GurmukhiUtils gem to perform conversions between Gurmukhi script and ASCII.

```ruby
irb
2.5.0 :001 > require 'gurmukhi_utils'
 => true
2.5.0 :002 > GurmukhiUtils.unicode('<> siqgur pRswid ]')
 => "ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥"
```

**ASCII**

```ruby
GurmukhiUtils.ascii('ੴ ਸਤਿ ਨਾਮੁ')
# => "<> siq nwmu"

GurmukhiUtils.ascii('ਏਕੁੰਕਾਰਾ ਸਤਿਗੁਰੂ ਤਿਹਿ ਪ੍ਰਸਾਦਿ ਸਚੁ ਹੋਇ ।')
# => "eykuMkwrw siqgurU iqih pRswid scu hoie ["

GurmukhiUtils.ascii('ਸ੍ਰੀ ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਹ ॥')
# => "sRI vwihgurU jI kI Pqh ]\n"
```

**Unicode**

```ruby
GurmukhiUtils.unicode('vwihgurU')
# => "ਵਾਹਿਗੁਰੂ"

GurmukhiUtils.unicode('sRI mwXw lCmI jI shwie')
# => "ਸ੍ਰੀ ਮਾਯਾ ਲਛਮੀ ਜੀ ਸਹਾਇ"

GurmukhiUtils.unicode('<> siqgur pRswid ]')
# => "ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥"
```

## Contribute

If you want to help, please get started with the [CONTRIBUTING.md](CONTRIBUTING.md) doc

## Related

Gurmukhi Utils comes in many programming languages. [Use the Gurmukhi Utils library in another language](/README.md).
