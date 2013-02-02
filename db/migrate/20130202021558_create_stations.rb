class CreateStations < ActiveRecord::Migration
  def change
    create_table :stations do |t|
      t.integer :bixi_id
      t.string  :name
      t.string  :terminalName
      t.float   :latitude
      t.float   :longitude
      t.integer :installDate
      t.integer :removalDate

      t.timestamps
    end
  end
end