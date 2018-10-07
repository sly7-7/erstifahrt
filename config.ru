require 'pry'

require_relative './app'

map '/api' do
  run Erstifahrt::Api
end

map '/' do
  run Erstifahrt::Assets
end
