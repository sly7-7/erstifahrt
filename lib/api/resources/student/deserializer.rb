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
        :nutrition,
        :subject
      )
    end
  end
end
