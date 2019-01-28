class Api::V1::ArtsController < ApiController
  load_and_authorize_resource
  def index
      page = params[:page] || 1
    @arts = @arts.search(params[:filters], page)
  end

  def show
    @art = Art.find(params[:id])
  end

  def update
    if @art.update(art_params)
      render json: { message: 'updated succesfully' }
    else
      render json: { errors: @art.errors, status: :unprocessable_entity }
    end
  end

  private
  def art_params
    params.require(:art).permit(:art_type, :topics_list, :disabled, :deactivated, :disabled_message, :ignore_warning_checker)
  end
end
