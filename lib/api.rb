require 'sinatra/base'
require 'sinatra/activerecord'
require 'jsonapi/serializable/renderer'

require_relative './api/models/student'
require_relative './api/models/trip'
require_relative './api/resources/student'
require_relative './api/resources/trip'

module Erstifahrt::Api
  class App < Sinatra::Base
    register Sinatra::ActiveRecordExtension

    set :database_file, '../config/database.yml'

    set :serializer, {
      Student: Serializers::SerializableStudent,
      Trip: Serializers::SerializableTrip
    }

    set :show_exceptions, :after_handler

    mime_type :json, 'application/vnd.api+json'

    before do
      content_type :json
    end

    not_found do
      { errors: [ title: 'Not found', detail: "Path '#{request.path}' not found" ] }.to_json
    end

    error ActiveRecord::RecordInvalid do
      errors = env['sinatra.error'].record.errors

      [
        422,
        {
          errors: errors.messages.reduce([]) do |errs, (attr, messages)|
            base = { title: 'Attribute invalid', source: { pointer: "/data/attributes/#{attr}" } }
            errs + messages.map { |message| base.merge detail: message }
          end
        }.to_json
      ]
    end

    get '/trips' do
      trip = Trip.first
      render_jsonapi trip
    end

    post '/students' do
      payload = JSON.parse(request.body.read)["data"]
      serialized = Deserializer::StudentDeserializer.call(payload)
      student = Student.create! serialized
      render_jsonapi student
    end

    private

    def render_jsonapi model, options: {}
      options[:class] ||= settings.serializer
      renderer.render(model, options).to_json
    end

    def renderer
      @renderer ||= JSONAPI::Serializable::Renderer.new
    end
  end
end
