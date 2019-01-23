class StaticPagesController < ApplicationController
  skip_before_action *ALL_FILTERS
  def embed
  end

  def faq
  end
end
