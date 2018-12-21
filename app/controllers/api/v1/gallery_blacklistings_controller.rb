class Api::V1::GalleryBlacklistingsController < ApiController
  load_and_authorize_resource

  def index
    @gallery_blacklistings.includes(:user).order(created_at: :desc)
  end

  def create
    get_user
    dur = params[:dur] || ""
    current_gallery.gallery_blacklistings.create(user: @user, dur: dur)
    render json: { message: "Success" }
  end

  private

  def get_user
    @user = User.find(params[:user_id])
  end

end
