require 'jsonapi/serializable'

module Erstifahrt::Api
  module Serializers
    class SerializableStudent < JSONAPI::Serializable::Resource
      type :students

      attributes(
        :comment,
        :councillor,
        :date_of_birth,
        :email,
        :first_name,
        :has_payed,
        :is_booked,
        :is_canceled,
        :last_name,
        :nutrition,
        :registration_number,
        :subject
      )

      attribute('registration_date') { @object.created_at }
      attribute('registration_sheet_url') { "/anmeldung/#{@object.id}/anmeldeformular.pdf" }
    end
  end
end
