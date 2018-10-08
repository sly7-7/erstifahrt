class AddDepartureAtToTrips < ActiveRecord::Migration[5.2]
  def change
    add_column :trips, :departure_at, :datetime
  end
end
