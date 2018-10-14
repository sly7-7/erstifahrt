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
        :is_active,
        :is_canceled,
        :last_name,
        :nutrition,
        :registration_number,
        :subject
      )

      has_one :trip

      attribute('registration_date') { @object.created_at }
      attribute('registration_sheet_url') { @app.url @object.registration_sheet_path, true, false }
    end
  end
end
