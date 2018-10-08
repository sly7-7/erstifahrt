require 'date'

require_relative '../lib/api/models/trip'

Trip.delete_all
Trip.create title: 'Erstifahrt 2018', fee: 25, departure_at: DateTime.new(Date.today.year, 11, Random.new.rand(1..30), 16)
