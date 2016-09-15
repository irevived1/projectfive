class HomeController < ApplicationController
  def index
  end

  def display
    params[:term1].classify.safe_constantize.all
    params[:term2].classify.safe_constantize.all
  end
end
