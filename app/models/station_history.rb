class StationHistory < ActiveRecord::Base
  attr_accessor :lastCommWithServer, :installed, :locked, :temporary, :public, :nbBikes, :nbEmptyDocks, :latestUpdateTime

  belongs_to :station

end