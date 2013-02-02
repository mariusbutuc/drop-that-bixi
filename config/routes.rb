DropThatBixi::Application.routes.draw do
  get "stations", to: "stations#index", as: "stations"
  get "stations/findBikes", to: "stations#findBikes", as: "findBikes"
  get "stations/findSpaces", to: "stations#findSpaces", as: "findSpaces"
  root to: 'home#index'
end
