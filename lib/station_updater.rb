require 'open-uri'
require 'nokogiri'

class StationUpdater

  def refreshInfo
    info = Hash.from_xml(Nokogiri::XML(open('https://toronto.bixi.com/data/bikeStations.xml')).to_s)

    info['stations']['station'].each do |fresh|
      station = Station.find_or_create_by_bixi_id(fresh['id'])

      if(station.station_histories.last.latestUpdateTime > fresh['latestUpdateTime'])

      end
      # station.update_attributes(fresh)
    end
  end

end