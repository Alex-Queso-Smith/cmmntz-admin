class Api::V1::UserGalleryModeratorsController < ApiController
  load_and_authorize_resource
  def index
    @user_gallery_moderators = @user_gallery_moderators.includes(:user)
  end

  def create
    user = User.find_by user_name: params[:user_name]
    if user
      current_gallery.user_gallery_moderators << user
        render json: { message: "User has been granted moderator status" }
    else
        render json: { errors: "User does not exist" }
    end
  end

end
