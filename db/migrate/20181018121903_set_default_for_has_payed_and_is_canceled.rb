class SetDefaultForHasPayedAndIsCanceled < ActiveRecord::Migration[5.2]
  def change
    change_column_default :students, :has_payed, false
    change_column_default :students, :is_canceled, false
  end
end
