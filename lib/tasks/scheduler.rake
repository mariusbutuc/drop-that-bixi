desc "This task is called by Heroku scheduler"

task :fetch_station_data => :environment do
  puts "Getting latest bixi info"
  StationUpdater.refreshInfo
  puts "Update done"
end