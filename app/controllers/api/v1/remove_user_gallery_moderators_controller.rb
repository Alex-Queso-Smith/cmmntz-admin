class Api::V1::RemoveUserGalleryModeratorsController < ApiController
  load_and_authorize_resource :user_gallery_moderator

  def create
    user = User.find_by user_name: params[:user_name]
    if user
      current_gallery.user_gallery_moderators.delete(user)
      render json: { message: "User has been removed from moderators" }
    else
      render json: { errors: "User Does not exist" }
    end

  end

end
