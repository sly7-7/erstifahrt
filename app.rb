require 'sinatra'
require 'sinatra/reloader' if development?

set :bind, '0.0.0.0'

get '*' do
  send_file File.join settings.public_folder, 'index.html'
end
