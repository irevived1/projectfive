require 'csv'
class HomeController < ApplicationController
  before_action :getfile, only: [:drawLineChart, :uploadCSVFile, :homeUploadCSV]

  @@FileDataCache = FileDataCache.instance

  def bargraph
    @filename = @@FileDataCache.filename
    render 'bargraph'
  end  
  def index
    @filename = @@FileDataCache.filename
  end

  def display
  end

  def chloropleth
    render 'chloropleth'
  end

  def linechart
    FileDataCache.instance.hideAbout = false;
    @headers = @@FileDataCache.headers if @@FileDataCache.headers
    # @@FileDataCache.destroy
  end

  def drawLineChart
    FileDataCache.instance.hideAbout = true;
    @term1 = params[:term1]
    @term2 = params[:term2]
    @filename = @@FileDataCache.filename
    @theta = calculateTheta(@@FileDataCache.file_data)
    @headers = @@FileDataCache.headers
    render :linechart
  end

  def uploadCSVFile
    if @file
      csv_text = File.read(@file.path)
      @file_data = CSV.parse(csv_text, :headers => true)

      @headers = @file_data.headers.map.with_index do |h, i|
        [h] if h.nil? == false && h.blank? == false && h.empty? == false && h != 'nil'
      end

      @@FileDataCache.file_data = @file_data
      @@FileDataCache.filename = @file.original_filename
      @@FileDataCache.headers = @headers

      File.open("app/assets/csv/" + @file.original_filename, 'w+') do |f|
        f.write(csv_text)
      end
      render :linechart
    end
  end

  def homeUploadCSV

    if @file
      csv_text = File.read(@file.path)
      @file_data = CSV.parse(csv_text, :headers => true)

      @headers = @file_data.headers.map.with_index do |h, i|
        [h] if h.nil? == false && h.blank? == false && h.empty? == false && h != 'nil'
      end

      @@FileDataCache.file_data = @file_data
      @@FileDataCache.filename = @file.original_filename
      @@FileDataCache.headers = @headers

      File.open("app/assets/csv/" + @file.original_filename, 'w+') do |f|
        f.write(csv_text)
      end
      #redirect_to :start
      render :start
    end
  end


  def bargraph
    @filename = @@FileDataCache.filename
    render 'bargraph'
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

  def splash
    render 'splash'
  end

  def start
    @@FileDataCache.destroy
    render 'start'
  end


end
