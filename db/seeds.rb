require 'date'

require_relative '../lib/api/models/student'
require_relative '../lib/api/models/trip'

Trip.delete_all
trip = Trip.create title: 'Erstifahrt 2018', fee: 25, departure_at: DateTime.new(2018, 11, 9, 16)

Student.delete_all
Student.create({
  email: "max.mustereinhorn@hhu.de",
  first_name: "Max",
  last_name: "Mustereinhorn",
  nutrition: "Omnivor",
  subject: "Informatik",
  trip: trip,
  date_of_birth: Time.new(1999, 10, 1)
})
