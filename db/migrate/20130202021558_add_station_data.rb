class AddStationData < ActiveRecord::Migration
  def up
    create_table :station do |s|
      s.integer :bixi_id
      s.string :name
      s.string :terminalName
      s.integer :lat
      s.integer :long
      s.integer :installDate
      s.integer :removalDate

      s.timestamps
    end

    create_table :station_history do |h|
      h.integer :lastCommWithServer
      h.boolean :installed
      h.boolean :locked
      h.boolean :temporary
      h.boolean :public
      h.integer :nbBikes
      h.integer :nbEmptyDocks
      h.integer :latestUpdateTime

      h.timestamps
    end
  end

  def down
    drop_table :station_history
    drop_table :station
  end
end
