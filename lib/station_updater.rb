require 'open-uri'
require 'nokogiri'

class StationUpdater

  def refreshInfo
    info = Nokogiri::HTML(open('https://toronto.bixi.com/data/bikeStations.xml'))
    info.station.each do |station|
      # Station.find_or_create(station.id)
      puts station.id
    end
  end

end