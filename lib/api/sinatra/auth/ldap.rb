require 'net-ldap'

module Sinatra
  module Auth
    class LDAP
      CONFLUENCE_FSCS_CN="CN=confluence-fscs,OU=Globale Gruppen,OU=Atlassian,OU=Zentrale Services,OU=Heinrich-Heine-Universität,DC=AD,DC=hhu,DC=de"
      CONFLUENCE_FSMATHE_CN="CN=confluence-fsmathe,OU=Globale Gruppen,OU=Atlassian,OU=Zentrale Services,OU=Heinrich-Heine-Universität,DC=AD,DC=hhu,DC=de"
      CONFLUENCE_FSPHYSIK_CN="CN=confluence-fsphysik,OU=Globale Gruppen,OU=Atlassian,OU=Zentrale Services,OU=Heinrich-Heine-Universität,DC=AD,DC=hhu,DC=de"

      USERS_OU="DC=AD,DC=hhu,DC=de"

      ACC_NAME="sAMAccountName"

      def initialize funkident, funkpw, host
        @funkident = funkident
        @funkpw = funkpw
        @host = host
      end

      def authenticate? ident, password
        bound(ident, password) and inphima_member(ident)
      end

      private

      def bound ident, password
        begin
          userident = "#{ident}@ad.hhu.de"
          ldap.bind method: :simple, username: userident, password: password
        rescue Net::LDAP::BindingInformationInvalidError
          false
        end
      end

      def find_user ident
        ldap.search(base: USERS_OU, filter: Net::LDAP::Filter.eq(ACC_NAME, ident))[0]
      end

      def inphima_member ident
        user = find_user ident
        [CONFLUENCE_FSCS_CN, CONFLUENCE_FSMATHE_CN, CONFLUENCE_FSPHYSIK_CN].any? do |cn|
          user.memberOf.include? cn
        end
      end

      def ldap
        unless @_ldap
          @_ldap = Net::LDAP.new host: @host
          @_ldap.auth "#{@funkident}@AD.hhu.de", @funkpw
        end

        @_ldap
      end
    end
  end
end
