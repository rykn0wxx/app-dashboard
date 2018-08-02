# == Schema Information
#
# Table name: dim_regions
#
#  id         :bigint(8)        not null, primary key
#  full_name  :string(255)      default(""), not null
#  name       :string(255)      default(""), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class DimRegion < ApplicationRecord
  validates :name, :full_name, presence: true

  has_many :dim_groups
end
