class StationsController < ApplicationController
  respond_to :json

  def index
    nfa = []
    Station.all.each {|station| nfa << station.getInfo}
    LookupRequest.create(:latitude => params[:latitude], :longitude => params[:longitude])

    respond_with nfa.to_json
  end

  def findBikes
    nfa = []
    cur_loc = LookupRequest.create(:latitude => params[:latitude], :longitude => params[:longitude])
    fakey = Station.new(:latitude => cur_loc.latitude, :longitude => cur_loc.longitude)
    fakey.nearbys(0.3).each {|station| nfa << station.getInfo if station.latestHasBikes}

    respond_with nfa.to_json
  end

  def findSpaces
    nfa = []
    cur_loc = LookupRequest.create(:latitude => params[:latitude], :longitude => params[:longitude])
    fakey = Station.new(:latitude => cur_loc.latitude, :longitude => cur_loc.longitude)
    fakey.nearbys(0.3).each {|station| nfa << station.getInfo if station.latestHasSpaces}

    respond_with nfa.to_json
  end

end