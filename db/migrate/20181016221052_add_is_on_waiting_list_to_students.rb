class AddIsOnWaitingListToStudents < ActiveRecord::Migration[5.2]
  def change
    add_column :students, :is_on_waiting_list, :boolean, default: false
  end
end
