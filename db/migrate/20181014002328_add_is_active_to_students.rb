class AddIsActiveToStudents < ActiveRecord::Migration[5.2]
  def change
    add_column :students, :is_active, :boolean, default: false
  end
end
