require_relative '../models/student'

module Erstifahrt::Api
  module Activator
    class Middleware
      ACTIVATE_ID = %r{/anmeldung/([^/]+)/aktivierung$}
      def initialize app
        @app = app
      end

      def call env
        request = Rack::Request.new env
        id = request.path.match(ACTIVATE_ID)

        if id
          student = Student.find id[1]
          student.is_active = true
          student.save
          redirect request.path.gsub %r{/aktivierung$}, ''
        else
          @app.call env
        end
      end

      private
      def redirect url
        response = Rack::Response.new
        response.redirect url
        response.finish
      end
    end
  end
end
