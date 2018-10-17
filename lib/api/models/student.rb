require 'securerandom'

class Student < ActiveRecord::Base
  belongs_to :trip

  before_save :generate_uuid, :generate_waiting_list_number

  validates :first_name, :last_name, :email, :date_of_birth, :subject, :nutrition, :trip, presence: {
    message: 'Alle Pflichtfelder müssen ausgefüllt werden'
  }

  validates :email, {
    uniqueness: { scope: :trip_id, message: "Du darfst dich nur einmal anmelden" },
    format: { with: /@hhu\.de\z/, message: "Du musst deine Uni-E-Mail-Adresse verwenden" }
  }

  validate :is_18_at_departure

  def activation_path
    "/anmeldung/#{id}/aktivierung"
  end

  def registration_sheet_path
    "/anmeldung/#{id}/anmeldeformular.pdf" 
  end

  def age_in_years_at_departure
    departure = trip.departure_at.to_time
    ((departure - date_of_birth.to_time) / 31556952).floor  # length of a gregorian year (365.2425 days)
  end

  private

  def generate_waiting_list_number
    if is_on_waiting_list and self.number_on_waiting_list == 0
      self.number_on_waiting_list = trip.students.maximum(:number_on_waiting_list).to_i + 1
    end
  end

  def generate_uuid
    self.id ||= SecureRandom.uuid
  end

  def is_18_at_departure
    if age_in_years_at_departure < 18 then
      errors.add(:date_of_birth, "Du musst zu Beginn der Fahrt min. 18 Jahre alt sein")
    end
  end
end
