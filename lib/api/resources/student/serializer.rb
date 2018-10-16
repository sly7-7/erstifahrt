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
        :is_on_waiting_list,
        :last_name,
        :nutrition,
        :registration_number,
        :subject
      )

      attribute(:age) { @object.age_in_years_at_departure }
      attribute('registration_date') { @object.created_at }
      attribute('registration_sheet_url') { @app.url @object.registration_sheet_path, true, false }

      has_one :trip
    end
  end
end
