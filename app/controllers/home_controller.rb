class HomeController < ApplicationController
  def index
  end

  def display
    term1 = (Object.const_get params[:term1]).all
    term2 = (Object.const_get params[:term2]).all
  end

  def chloropleth
    render 'chloropleth'
  end

end
