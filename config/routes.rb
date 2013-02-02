DropThatBixi::Application.routes.draw do
  get "stations", to: "stations#index", as: "stations"
  root to: 'home#index'
end
