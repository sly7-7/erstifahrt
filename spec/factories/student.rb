FactoryBot.define do
  factory :student do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.first_name }
    sequence(:email) { |n| "#{Faker::Name.first_name}.#{Faker::Name.last_name}.#{n}@hhu.de" }
    nutrition { %w[Omnivor Vegetarisch Vegan].sample }
    subject { %w[Informatik Physik Mathematik Naturwissenschaften].sample }
    date_of_birth { Faker::Date.birthday }
    trip
  end
end
