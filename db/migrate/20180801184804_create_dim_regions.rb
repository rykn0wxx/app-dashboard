class CreateDimRegions < ActiveRecord::Migration[5.2]
  def self.up
    create_table :dim_regions do |t|
      t.string :name,        null: false, default: ""
      t.string :full_name,   null: false, default: ""

      t.timestamps
    end
  end
  def self.down
    drop_table :dim_regions
  end
end
