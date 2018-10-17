require 'api/models/student'
require 'api/models/trip'

RSpec.describe Student do
  it { is_expected.to respond_to :first_name, :last_name, :email, :nutrition, :subject, :comment,
       :councillor, :registration_number, :has_payed, :is_booked, :is_canceled, :date_of_birth,
       :trip_id, :created_at, :updated_at, :is_active, :is_on_waiting_list }

  context 'saved with minimum required attributes' do
    subject { create :student }
    let :default_attributes do
      { has_payed: false, is_active: false, is_canceled: false, is_on_waiting_list: false }
    end

    it { is_expected.to have_attributes default_attributes }
  end

  describe 'waiting list order' do
    subject { create :student }

    it "will be set correctly for booked students"
    it "will be set correctly for students put on waiting list"
  end
end
