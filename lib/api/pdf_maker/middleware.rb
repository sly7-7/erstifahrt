require_relative '../pdf_maker'

module Erstifahrt::Api
  module PDFMaker
    class Middleware
      ANMELDEFORMULAR_ID = %r{/anmeldung/([^/]+)/anmeldeformular.pdf$}
      def initialize app
        @app = app
      end

      def call env
        request = Rack::Request.new env
        id = request.path.match(ANMELDEFORMULAR_ID)

        if id
          pdf = Anmeldeformular.make id[1]
          ['200', { 'Content-Type' => 'application/pdf' }, [pdf.render] ]
        else
          @app.call env
        end
      end
    end
  end
end
