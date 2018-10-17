require 'api'

RSpec.shared_examples "a protected endpoint" do
  it "responds with status 401" do
    response = patch route, { data: payload }.to_json

    expect(response.status).to eq 401
  end
end

RSpec.describe Erstifahrt::Api::App do
  let(:app) { Erstifahrt::Api::App.new }

  describe 'PATCH /students/:id' do
    let(:student) { create :student }

    let :payload do
      { type: 'students', id: student.id, attributes: {} }
    end

    let(:route) { "/students/#{student.id}" }

    context "without authentication" do
      it_behaves_like "a protected endpoint"
    end

    context "with invalid authentication" do
      before do
        header "Authorization", "Bearer abcdefg"
      end

      it_behaves_like "a protected endpoint"
    end

    context "with valid authentication" do
      let(:user) { create :user }

      before do
        user.regenerate_token!
        header "Authorization", "Bearer #{user.token}"
      end

      describe 'with is_on_waiting_list set to true' do
        let :payload do
          {
            type: 'students',
            id: student.id,
            attributes: {
              is_on_waiting_list: true
            }
          }
        end

        before do
          patch route, { data: payload }.to_json
        end

        context "number on waiting list" do
          subject { student.reload.number_on_waiting_list }

          it  { is_expected.to eq 1 }
        end
      end
    end
  end
end
