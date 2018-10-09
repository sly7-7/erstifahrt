require 'sinatra/base'
require 'sinatra/activerecord'

require 'action_mailer'

module Sinatra
  module Config
    def app_config
      configure do
        db_config
        jsonapi_config
        mailer_config_common
      end

      configure :development, :test do
        mailer_config_dev
      end

      configure :production do
        mailer_config
      end
    end

    def db_config
      register Sinatra::ActiveRecordExtension

      set :database_file, '../config/database.yml'
    end

    def jsonapi_config
      set :show_exceptions, :after_handler

      set :renderer, JSONAPI::Serializable::Renderer.new

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
    end

    def mailer_config_common
      ActionMailer::Base.view_paths = File.join root, 'views'
    end

    def mailer_config
    end

    def mailer_config_dev
      ActionMailer::Base.delivery_method = :file
      ActionMailer::Base.file_settings = {
        location: File.expand_path("#{root}/../tmp/mails")
      }
    end
  end

  register Config
end
