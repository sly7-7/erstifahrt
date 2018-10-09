require 'jsonapi/serializable'

module Erstifahrt::Api
  module Serializers
    class SerializableTrip < JSONAPI::Serializable::Resource
      type :trips
      attributes :title
    end
  end
end
