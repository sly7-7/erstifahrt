FactoryBot.define do
  factory :trip do
    sequence(:title) { |n| "Erstifahrt #{2018 + n - 1}" }
    sequence(:departure_at) { |n| DateTime.new 2018 + n - 1, 11, 1, 16 }
    fee { (15..30).to_a.sample }
    max_students { (60..100).to_a.sample }

    factory :trip_with_students do
      transient do
        count { 5 }
      end

      after(:create) do |trip, ev|
        create_list(:student, ev.count, trip: trip)
      end
    end
  end
end
