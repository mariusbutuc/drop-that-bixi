require 'open-uri'
require 'nokogiri'

class StationUpdater

  def self.refreshInfo
    info = Hash.from_xml(Nokogiri::XML(open('https://toronto.bixi.com/data/bikeStations.xml')).to_s)

    info['stations']['station'].each do |fresh|
      station = Station.find_by_bixi_id(fresh['id'])

      if station.nil?
        nfa = {}
        Station::GHETTO_ATTRS.each {|attr| nfa[attr.to_sym] = fresh[attr]}
        nfa[:bixi_id] = fresh['id'].to_i
        nfa[:latitude] = fresh['lat'].to_f
        nfa[:longitude] = fresh['long'].to_f
        station = Station.create(nfa)
        puts nfa
      end

      if(station.station_histories.empty? || station.station_histories.last.latestUpdateTime.to_i < fresh['latestUpdateTime'].to_i)
        nfa = {}
        StationHistory::GHETTO_ATTRS.each {|attr| nfa[attr.to_sym] = fresh[attr]}
        station.station_histories.create(nfa)
      end
    end
  end

end