require 'date'

require_relative '../lib/api/models/student'
require_relative '../lib/api/models/trip'

Trip.delete_all
trip = Trip.create title: 'Erstifahrt 2018', fee: 25, departure_at: DateTime.new(Date.today.year, 11, Random.new.rand(1..30), 16)

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
