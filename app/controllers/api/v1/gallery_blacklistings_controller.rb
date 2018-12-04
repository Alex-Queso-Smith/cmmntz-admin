class Api::V1::GalleryBlacklistingsController < ApiController
  load_and_authorize_resource

  def create
    get_user
    current_gallery.gallery_blacklistings << @user
  end

  private

  def get_user
    @user = User.find(params[:user_id])
  end

end
