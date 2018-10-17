FactoryBot.define do
  factory :user do
    sequence(:ident) { |n| "baboh#{n + 100}" }
  end
end
