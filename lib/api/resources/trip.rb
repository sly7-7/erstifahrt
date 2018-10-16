require 'jsonapi/serializable'

module Erstifahrt::Api
  module Serializers
    class SerializableTrip < JSONAPI::Serializable::Resource
      type :trips
      attributes :title, :fee, :max_students

      attribute(:departure) { @object.departure_at }

      has_many :students
    end
  end
end
