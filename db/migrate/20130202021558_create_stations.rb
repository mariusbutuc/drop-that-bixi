class CreateStations < ActiveRecord::Migration
  def change
    create_table :stations do |t|
      t.integer :bixi_id
      t.string  :name
      t.string  :terminalName
      t.float   :latitude
      t.float   :longitude
      t.string :installDate
      t.string :removalDate

      t.timestamps
    end
  end
end