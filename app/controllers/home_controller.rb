require 'csv'
class HomeController < ApplicationController


  def index
  end

  def display
     # byebug
    x = []
    y = []
  	CSV.foreach("app/assets/csv/master.csv", headers: true) do |row|
  		x << row[params[:term1]].to_i
  		y << row[params[:term2]].to_i
		end

		up = UniPre.new(x, y)
		up.n
		
    @theta = up.theta
  end

  def chloropleth
    render 'chloropleth'
  end

  def linechart
    
  end

end
