require 'csv'
class HomeController < ApplicationController


  def index
  end

  def display
    @theta = calculateTheta
  end

  def chloropleth
    render 'chloropleth'
  end

  def linechart
    @theta = calculateTheta
  end

  private
  def calculateTheta
    x = []
    y = []
    CSV.foreach("app/assets/csv/food_price.csv", headers: true) do |row|
      x << row["Meat Price Index"].to_i
      y << row["Dairy Price Index"].to_i
      # x << row["graffiti_complaints"].to_i
      # y << row["heating_complaints"].to_i
    end

    up = UniPre.new(x, y)
    up.n
    up.theta
  end

end
