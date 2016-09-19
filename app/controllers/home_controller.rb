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
    # term1 = (Object.const_get params[:term1]).all
    # term2 = (Object.const_get params[:term2]).all
  end

  def chloropleth
    render 'chloropleth'
  end

  def splash
    render 'splash'
  end

  def start
    render 'start'
  end 

end
