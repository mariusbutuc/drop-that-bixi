class Station < ActiveRecord::Base
  attr_accessor :bixi_id, :name, :terminalName, :lat, :long, :installDate, :removalDate

  has_many :station_histories

end