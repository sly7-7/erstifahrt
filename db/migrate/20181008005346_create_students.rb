class CreateStudents < ActiveRecord::Migration[5.2]
  def change
    create_table :students, id: :string do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :nutrition
      t.string :subject
      t.text :comment
      t.string :councillor
      t.integer :registration_number
      t.boolean :has_payed
      t.boolean :is_booked
      t.boolean :is_canceled
      t.date :date_of_birth
      t.belongs_to :trip

      t.timestamps
    end
  end
end
