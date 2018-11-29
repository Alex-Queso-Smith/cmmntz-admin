class Api::V1::GalleriesController < ApiController
  load_and_authorize_resource

  def show
  end

  def update
    if @gallery.update(gallery_params)
      render json: { message: 'updated succesfully' }
    else
      render json: { errors: @gallery.errors, status: :unproccessable_entity }
    end
  end

  private

  def gallery_params
    params.require(:gallery).permit(
        :name,
        :comments_from,
        :votes_from,
        :filter_list,
        :not_filter_list,
        :sort_dir,
        :sort_type,
        :votes_from,
        :censor,
        :default_art_thread_expiration_days
      )
  end
end
