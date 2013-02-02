class StationsController < ApplicationController
  respond_to :json

  def index
    nfa = {}
    Station.select('id, bixi_id, name, latitude, longitude').all.each do |station|
      history = station.station_histories.last
      res = station.to_json
      res.concat(",history:{#{history.to_json}}")
      nfa[station.bixi_id] = res
    end
    render nfa.to_json
  end

end