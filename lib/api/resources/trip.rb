require 'jsonapi/serializable'

module Erstifahrt::Api
  module Serializers
    class SerializableTrip < JSONAPI::Serializable::Resource
      type :trips
      attributes :title, :fee

      attribute(:departure) { @object.departure_at }
    end
  end
end
