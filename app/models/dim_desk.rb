# == Schema Information
#
# Table name: dim_desks
#
#  id         :bigint(8)        not null, primary key
#  code       :string(255)
#  name       :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class DimDesk < ApplicationRecord
  validates :name, :code, presence: true

  has_many :dim_groups
end
