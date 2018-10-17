FactoryBot.define do
  factory :trip do
    sequence(:title) { |n| "Erstifahrt #{2018 + n - 1}" }
    sequence(:departure_at) { |n| DateTime.new 2018 + n - 1, 11, 1, 16 }
    fee { (15..30).to_a.sample }
    max_students { (60..100).to_a.sample }
  end
end
