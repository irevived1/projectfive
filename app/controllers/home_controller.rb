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

    # @theta = calculateTheta
  end

  def drawLineChart
    # byebug
    @term1 = params[:term1]
    @term2 = params[:term2]
    @theta = calculateTheta
    render :linechart
  end

  private


  def calculateTheta
    x = []
    y = []
    CSV.foreach("app/assets/csv/food_price.csv", headers: true) do |row|
      x << row[params[:term1]].to_i
      y << row[params[:term2]].to_i
      # x << row["Meat Price Index"].to_i
      # y << row["Dairy Price Index"].to_i
    end

    up = UniPre.new(x, y)
    up.n
    up.theta
  end

end
