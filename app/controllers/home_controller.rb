class HomeController < ApplicationController
  def index
  end

  def display
    params[:term1]
    params[:term2]
  end
end
