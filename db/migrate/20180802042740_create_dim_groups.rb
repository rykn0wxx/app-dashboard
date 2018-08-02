class CreateDimGroups < ActiveRecord::Migration[5.2]
  def self.up
    create_table :dim_groups do |t|
      t.string :name
      t.references :dim_desk, foreign_key: true
      t.references :dim_region, foreign_key: true

      t.timestamps
    end
  end
  def self.down
    drop_table :dim_groups
  end
  
end
