class CreateRequests < ActiveRecord::Migration
  def change
    create_table :lookup_requests do |t|
      t.float   :latitude
      t.float   :longitude

      t.timestamps
    end
  end
end
