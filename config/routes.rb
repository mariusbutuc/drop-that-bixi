DropThatBixi::Application.routes.draw do
  get "home/index"
  get "stations", to: "stations#index", as: "stations"
  root to: 'home#index'

end
