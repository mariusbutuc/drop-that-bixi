# == Schema Information
#
# Table name: stations
#
#  id           :integer          not null, primary key
#  bixi_id      :integer
#  name         :string(255)
#  terminalName :string(255)
#  latitude     :float
#  longitude    :float
#  installDate  :integer
#  removalDate  :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Station < ActiveRecord::Base
  attr_accessible :bixi_id, :name, :terminalName, :latitude, :longitude, :installDate, :removalDate
  GHETTO_ATTRS = ['name', 'terminalName', 'installDate', 'removalDate']

  reverse_geocoded_by :latitude, :longitude

  has_many :station_histories

  def getInfo
    history = station_histories.last
    res = {
      id: id,
      name: name,
      numBikes: history.nbBikes,
      spacesFree: history.nbEmptyDocks,
      lastUpdate: history.lastCommWithServer,
      latitude: latitude,
      longitude: longitude
    }
    res
  end

  def latestHasBikes
    return station_histories.last.nbBikes > 0
  end

  def latestHasSpaces
    return station_histories.last.nbEmptyDocks > 0
  end

end
