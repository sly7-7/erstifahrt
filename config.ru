require 'pry' if ENV['RACK_ENV'] != 'production'

module Erstifahrt
end

require_relative './app'
require_relative './lib/api/pdf_maker/middleware'
require_relative './lib/api/activator/middleware'

map '/api' do
  run Erstifahrt::Api::App
end

map '/' do
  use Erstifahrt::Api::PDFMaker::Middleware
  use Erstifahrt::Api::Activator::Middleware

  run Erstifahrt::Assets::App
end
