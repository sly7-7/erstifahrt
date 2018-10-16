require 'jsonapi/deserializable'

module Erstifahrt::Api
  module Deserializer
    class StudentDeserializer < JSONAPI::Deserializable::Resource
      attributes(
        :comment,
        :councillor,
        :email,
        :date_of_birth,
        :first_name,
        :last_name,
        :has_payed,
        :is_canceled,
        :is_booked,
        :is_on_waiting_list,
        :nutrition,
        :subject
      )

      attribute :email do |email, key|
        email += "@hhu.de" unless email.match(/@/)
        { email: email.gsub(/uni\-duesseldorf\.de$/, "hhu.de") }
      end

      has_one do |_, id, type, key|
        { "#{key.to_sym}_id" => id }
      end
    end
  end
end
