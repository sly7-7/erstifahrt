class AddMaxStudentsToTrips < ActiveRecord::Migration[5.2]
  def change
    add_column :trips, :max_students, :integer, default: 0
  end
end
