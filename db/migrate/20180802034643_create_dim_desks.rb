class CreateDimDesks < ActiveRecord::Migration[5.2]
  def self.up
    create_table :dim_desks do |t|
      t.string :name
      t.string :code

      t.timestamps
    end
  end
  def self.down
    drop_table :dim_desks
  end
end
