class ArtsController < ApplicationController
  load_and_authorize_resource
  
  def index
    @arts = Art.for_gallery_id(current_gallery.id)
  end
end
