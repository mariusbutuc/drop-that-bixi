desc "This task is called by Heroku scheduler"

task :update_bixi_stations => environment do
  puts "Getting latest bixi info"
  BixiStationHandler.refreshInfo
  puts "Update done"
end