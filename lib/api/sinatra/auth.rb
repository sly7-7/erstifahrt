require 'sinatra/base'

require_relative './auth/ldap'
require_relative '../models/user'

module Sinatra
  module Auth
    def protect!
      halt 401 unless authorized?
    end

    def authorized?
      header = request.env['HTTP_AUTHORIZATION'] || ''
      user = User.find_by_token header.gsub(/Bearer /, '')

      if user and user.token_is_valid?
        user.update_token_expiration!
        true
      else
        false
      end
    end

    def authenticate? ident, password
      raise "Please export $funkident with the functional ident" unless ENV["ERSTIFAHRT_LDAP_FUNKIDENT"]
      raise "Please export $funkpw with the functional password" unless ENV["ERSTIFAHRT_LDAP_FUNKPW"]
      raise "Please export the ldap host as $ldaphost" unless ENV["ERSTIFAHRT_LDAP_HOST"]

      funkident = ENV["ERSTIFAHRT_LDAP_FUNKIDENT"]
      funkpw = ENV["ERSTIFAHRT_LDAP_FUNKPW"]
      ldaphost = ENV["ERSTIFAHRT_LDAP_HOST"]

      ldap = LDAP.new funkident, funkpw, ldaphost

      ldap.authenticate? ident, password
    end

    def authenticate! ident
      user = User.find_or_create_by ident: ident
      user.regenerate_token!
      user
    end
  end

  helpers Auth
end
