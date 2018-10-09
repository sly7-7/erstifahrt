require 'pry'

module Erstifahrt
end

require_relative './app'

map '/api' do
  run Erstifahrt::Api::App
end

map '/' do
  run Erstifahrt::Assets::App
end
