# == Schema Information
#
# Table name: station_histories
#
#  id                 :integer          not null, primary key
#  lastCommWithServer :integer
#  installed          :boolean
#  locked             :boolean
#  temporary          :boolean
#  public             :boolean
#  nbBikes            :integer
#  nbEmptyDocks       :integer
#  latestUpdateTime   :integer
#  station_id         :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

class StationHistory < ActiveRecord::Base
  attr_accessor :lastCommWithServer, :installed, :locked, :temporary, :public, :nbBikes, :nbEmptyDocks, :latestUpdateTime

  belongs_to :station

end
