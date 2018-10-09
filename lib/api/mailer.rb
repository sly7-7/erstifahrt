require 'sinatra/base'
require 'action_mailer'

module Sinatra
  module Mailer
    class ApiMailer < ActionMailer::Base
      default from: 'InPhiMa <fscs@hhu.de>',
        template_path: 'api/mailer'

      def welcome student, app
        @student = student
        @app = app
        mail subject: "Erstifahrtanmeldung von #{@student.first_name} #{@student.last_name}",
          to: @student.email
      end
    end

    def welcome student
      ApiMailer.welcome(student, self).deliver_now
    end
  end

  helpers Mailer
end
