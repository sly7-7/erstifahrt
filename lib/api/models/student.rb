require 'securerandom'

class Student < ActiveRecord::Base
  belongs_to :trip
  before_save :generate_uuid

  def generate_uuid
    self.id ||= SecureRandom.uuid
  end
end
