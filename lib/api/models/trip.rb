class Trip < ActiveRecord::Base
  has_many :students

  def places_left
    max_students - students.count
  end
end
