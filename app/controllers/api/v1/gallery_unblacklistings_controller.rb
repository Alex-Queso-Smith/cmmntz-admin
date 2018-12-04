class Api::V1::GalleryUnblacklistingsController < ApiController
  load_and_authorize_resource :gallery_blacklistings

  def create
    get_user
    current_gallery.blacklisted_users.delete(@user)
    render json: { message: "Success" }
  end

  private

  def get_user
    @user = User.find(params[:user_id])
  end

end
