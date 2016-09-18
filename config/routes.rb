Rails.application.routes.draw do
  get 'home/index'

  root to: "about#index"
  post 'display' => 'home#display'

  get 'chloropleth', to: "home#chloropleth"
  get 'splash', to: "home#splash"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
