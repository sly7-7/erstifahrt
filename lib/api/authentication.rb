require_relative './sinatra/auth'

module Erstifahrt::Api
  class Authentication < Sinatra::Base
      helpers Sinatra::Auth

      post '/token' do
        ident = request.params['username']
        password = request.params['password']

        if authenticate? ident, password
          json({
            access_token: authenticate!(ident).token,
            token_type: 'bearer'
          })
        else
          halt 401, { error: 'Login nicht möglich. Bitte kontrolliere deine Login-Daten.' }.to_json
        end
      end
  end
end
