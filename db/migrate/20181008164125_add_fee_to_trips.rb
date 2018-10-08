class AddFeeToTrips < ActiveRecord::Migration[5.2]
  def change
    add_column :trips, :fee, :decimal, scale: 2, precision: 5
  end
end
