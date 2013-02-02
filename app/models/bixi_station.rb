class BixiStation < ActiveRecord::Base
  attr_accessor :id, :name, :lat, :long, :numBikes, :numDocks, :lastComm, :lastUpdate

end