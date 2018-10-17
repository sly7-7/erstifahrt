class AddNumberOnWaitingListToStudents < ActiveRecord::Migration[5.2]
  def change
    add_column :students, :number_on_waiting_list, :integer, default: 0
  end
end
