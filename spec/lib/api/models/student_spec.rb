require 'api/models/student'
require 'api/models/trip'

RSpec.describe Student do
  it { is_expected.to respond_to :first_name, :last_name, :email, :nutrition, :subject, :comment,
       :councillor, :has_payed, :is_booked, :is_canceled, :date_of_birth, :trip_id, :created_at,
       :updated_at, :is_active, :is_on_waiting_list, :number_on_waiting_list }

  context 'saved with minimum required attributes' do
    subject { create :student }
    let :default_attributes do
      { has_payed: false, is_active: false, is_canceled: false, is_on_waiting_list: false }
    end

    it { is_expected.to have_attributes default_attributes }
  end

  describe 'number_on_waiting_list' do
    subject(:trip) { create :trip_with_students, count: 3 }
    let(:students) { trip.students }

    context 'with one student put on waiting list' do
      subject { students[0].number_on_waiting_list }
      before { students[0].update! is_on_waiting_list: true }
      it { is_expected.to eq 1 }
    end

    context 'with more than one student on waiting list' do
      before do
        students[2].update! is_on_waiting_list: true
        students[0].update! is_on_waiting_list: true
        students[1].update! is_on_waiting_list: true
      end

      describe 'the students order' do
        subject { students.sort_by {|s| s.number_on_waiting_list } }

        it { is_expected.to eq [students[2], students[0], students[1]] }
      end
    end
  end
end
