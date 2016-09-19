Rails.application.routes.draw do
  get 'home/index'

  root to: "home#splash"
  post 'display' => 'home#display'
	get 'linechart' => 'home#linechart'
	post 'linechart' => 'home#drawLineChart'
	post 'uploadfile' => 'home#uploadCSVFile'
  post 'homeUploadCSV' => 'home#homeUploadCSV'
  get 'splash', to: "home#splash"
  get 'start', to: 'home#start'
  get 'bargraph', to: 'home#bargraph'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
