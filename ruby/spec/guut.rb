# frozen_string_literal: true

require 'json'
require 'minitest/autorun'

module Guut
  def self.assert(unit, fn, test_class)
    case unit['type']
    when 'is', 'is not'
      unit['assertions'].each do |input, expected|
        next if expected.nil?
        
        test_method_name = "test_#{input.gsub(/[^a-zA-Z0-9]/, '_')}_#{unit['type']}"
        test_class.define_method(test_method_name) do
          result = fn.call(input)
          if unit['type'] == 'is'
            assert_equal expected, result
          else
            refute_equal expected, result
          end
        end
      end
    when 'is-self'
      unit['assertions'].each do |input, _expected|
        test_method_name = "test_#{input.gsub(/[^a-zA-Z0-9]/, '_')}_is_self"
        test_class.define_method(test_method_name) do
          result = fn.call(input)
          assert_equal input, result
        end
      end
    end
  end

  def self.create_function_test_class(unit_name, func_name, fn, test_params)
    # Create a nested test class for each function
    class_name = "#{unit_name}#{func_name.capitalize}Test"
    
    # Define the test class dynamically
    test_class = Class.new(Minitest::Test) do
      # Add the test methods
      Guut.assert(test_params, fn, self)
    end
    
    # Set the class name for better test output
    test_class.class_eval "def self.name; '#{class_name}'; end"
    
    return test_class
  end

  def self.run(units, functions, parent_class)
    units.each do |unit|
      unit_name = unit['name'].gsub(/[^a-zA-Z0-9]/, '').capitalize
      
      # Create a nested test class for each test group
      group_class = Class.new(Minitest::Test) do
        unit['functions'].each do |func_name|
          fn = functions[func_name]
          test_params = unit.reject { |k, _| %w[name functions].include?(k) }
          
          # Create function-specific test class
          function_class = Guut.create_function_test_class(unit_name, func_name, fn, test_params)
          
          # Add the function test class as a nested class
          const_set("#{func_name.capitalize}Test", function_class)
        end
      end
      
      # Set the group class name
      group_class.class_eval "def self.name; '#{unit_name}Test'; end"
      
      # Add the group class to the parent
      parent_class.const_set("#{unit_name.capitalize}Test", group_class)
    end
  end

  def self.guut(test_name, functions, test_class)
    file_path = File.join(__dir__, '..', '..', 'test', "#{test_name}.json")
    file = File.read(file_path)
    data = JSON.parse(file)
    
    run(data, functions, test_class)
  end
end
