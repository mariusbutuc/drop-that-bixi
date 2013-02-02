class CreateStationHistories < ActiveRecord::Migration
  def change
    create_table :station_histories do |t|
      t.string :lastCommWithServer
      t.boolean :installed
      t.boolean :locked
      t.boolean :temporary
      t.boolean :public
      t.integer :nbBikes
      t.integer :nbEmptyDocks
      t.string :latestUpdateTime
      t.integer :station_id

      t.timestamps
    end
  end
end