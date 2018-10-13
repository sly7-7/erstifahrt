require 'prawn'
require 'sinatra/base'

require_relative './api/models/student'
require_relative './api/models/trip'
require_relative './api/resources/student'
require_relative './api/resources/trip'

require_relative './api/mailer'

module Erstifahrt::Api
  class App < Sinatra::Base
    register Sinatra::Config

    helpers Sinatra::Mailer

    app_config

    set :serializer, {
      Student: Erstifahrt::Api::Serializers::SerializableStudent,
      Trip: Erstifahrt::Api::Serializers::SerializableTrip
    }

    get '/trips' do
      trip = Trip.first
      render_jsonapi trip
    end

    get '/students/:id' do
      render_jsonapi Student.find params[:id]
    end

    post '/students' do
      payload = JSON.parse(request.body.read)["data"]
      serialized = Deserializer::StudentDeserializer.call(payload)
      student = Student.create! serialized
      welcome student
      render_jsonapi student
    end

    private

    def render_jsonapi model, options: {}
      options[:class] ||= settings.serializer
      options[:expose] = { app: self }.merge(options[:expose] || {})
      renderer.render(model, options).to_json
    end

    def renderer
      settings.renderer
    end
  end
end
