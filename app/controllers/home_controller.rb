require 'csv'
class HomeController < ApplicationController
  before_action :getfile, only: [:drawLineChart, :uploadCSVFile]

  @@FileDataCache = FileDataCache.instance

  def index
  end

  def display
  end

  def chloropleth
    render 'chloropleth'
  end

  def linechart
    # @@FileDataCache.filename = nil
    # @@FileDataCache.file_data = nil
    @@FileDataCache.destroy
  end

  def drawLineChart
    # byebug
    @term1 = params[:term1]
    @term2 = params[:term2]
    @filename = @@FileDataCache.filename
    @theta = calculateTheta(@@FileDataCache.file_data)
    render :linechart
  end

  def uploadCSVFile
    if @file
      csv_text = File.read(@file.path)
      @file_data = CSV.parse(csv_text, :headers => true)
      @@FileDataCache.file_data = @file_data
      @@FileDataCache.filename = @file.original_filename
      render :linechart
    end
  end

  private

  def calculateTheta(fileData)
    x = []
    y = []
    fileData.each do |row|
      x << row[params[:term1]].to_i
      y << row[params[:term2]].to_i
    end

    up = UniPre.new(x, y)
    up.n
    up.theta
  end

  def getfile
    @file = params[:file]
  end

end
