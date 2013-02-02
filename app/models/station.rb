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
  attr_accessor :bixi_id, :name, :terminalName, :lat, :long, :installDate, :removalDate

  has_many :station_histories

end
