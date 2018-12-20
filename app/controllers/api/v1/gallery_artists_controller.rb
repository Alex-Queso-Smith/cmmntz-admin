class Api::V1::GalleryArtistsController < ApiController

  def update
    if @gallery_artist.update(gallery_artist_params)
      render json: { message: 'updated succesfully' }
    else
      render json: { errors: @gallery_artist.errors, status: :unproccessable_entity }
    end
  end

  private
  def gallery_artist_params
    params.require(:gallery_artist).permit(:customer_id)
  end

end
