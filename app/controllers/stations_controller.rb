class StationsController < ApplicationController
  respond_to :json

  def index
    nfa = []
    Station.all.each do |station|
      history = station.station_histories.last
      res = {
        id: station.id,
        name: station.name,
        numBikes: history.nbBikes,
        spacesFree: history.nbEmptyDocks,
        lastUpdate: history.latestUpdateTime,
        latitude: station.latitude,
        longitude: station.longitude
      }
      nfa << res
    end
    
    respond_with nfa.to_json
  end

end