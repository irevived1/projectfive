require 'csv'
class HomeController < ApplicationController
  def index
  end

  def display
    # byebug
  	CSV.foreach("app/assets/csv/master.csv", headers: true) do |row|
  		byebug
  		puts row
		end

		# csv_text = File.read('app/assets/csv/master.csv')
		# byebug
		# csv = CSV.parse(csv_text, :headers => true)
		# csv.each do |row|

		#   puts row
		# end

    # term1 = (Object.const_get params[:term1]).all
    # term2 = (Object.const_get params[:term2]).all
    
  end

  def chloropleth
    render 'chloropleth'
  end

end
