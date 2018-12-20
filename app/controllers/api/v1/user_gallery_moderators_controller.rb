class Api::V1::UserGalleryModeratorsController < ApiController
  load_and_authorize_resource
  def index
    @user_gallery_moderators = @user_gallery_moderators.includes(:user)
  end

  def create
    user = User.find_by user_name: params[:user_name]
    if user
      current_gallery.user_gallery_moderators << user
      message = "User has been granted moderator status"
    else
      message = "User does not exist"
    end

    render json: { message: message }
  end

  def destroy
    user = User.find_by user_name: params[:user_name]
    if user
      current_gallery.user_gallery_moderators.delete(user)
      message = "User has been removed from moderators"
    else
      message "User Does not exist"
    end

    render json: { message: message }
  end

end
