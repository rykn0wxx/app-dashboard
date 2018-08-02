# == Schema Information
#
# Table name: dim_groups
#
#  id            :bigint(8)        not null, primary key
#  name          :string(255)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  dim_desk_id   :bigint(8)
#  dim_region_id :bigint(8)
#
# Indexes
#
#  index_dim_groups_on_dim_desk_id    (dim_desk_id)
#  index_dim_groups_on_dim_region_id  (dim_region_id)
#
# Foreign Keys
#
#  fk_rails_...  (dim_desk_id => dim_desks.id)
#  fk_rails_...  (dim_region_id => dim_regions.id)
#

class DimGroup < ApplicationRecord
  validates :name, presence: true
  
  belongs_to :dim_desk
  belongs_to :dim_region

end
