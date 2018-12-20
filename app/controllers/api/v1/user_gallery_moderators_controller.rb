class Api::V1::UserGalleryModeratorsController < ApiController
  load_and_authorize_resource
  def index
    @user_gallery_moderators = @user_gallery_moderators.includes(:user)
  end

end
