require 'sinatra/base'
require 'sinatra/activerecord'

module Erstifahrt
  class Api < Sinatra::Base
    register Sinatra::ActiveRecordExtension

    set :database_file, '../config/database.yml'

    before do
      content_type :json
    end

    not_found do
      halt 404, {
        errors: [
          title: 'Not found', detail: "Path '#{request.path}' not found"
        ]
      }.to_json
    end
  end
end
