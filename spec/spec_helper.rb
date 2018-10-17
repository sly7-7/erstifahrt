ENV['RACK_ENV'] = 'test'

require 'bundler'
Bundler.require :default, :development, :test

DatabaseCleaner.strategy = :truncation

db_config = YAML.load_file('config/database.yml')['test']

RSpec.configure do |config|
  config.example_status_persistence_file_path = "spec/examples.txt"
  config.expect_with :rspec do |c|
    c.syntax = :expect
  end

  config.before :all do
    ActiveRecord::Base.establish_connection db_config
    DatabaseCleaner.clean
  end

  config.after :each do
    DatabaseCleaner.clean
  end

  config.include FactoryBot::Syntax::Methods
  config.before :suite do
    FactoryBot.find_definitions
  end
end
