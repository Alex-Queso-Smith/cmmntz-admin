class Api::V1::ArtsController < ApiController
load_and_authorize_resource
  def show
    @art = Art.find(params[:id])
  end

  def update
    respond_to do |format|
      if @art.update(art_params)
        render json: { message: 'updated succesfully' }
      else
        render json: @art.errors, status: :unprocessable_entity
      end
    end
  end

  private
  def art_params
    params.require(:art).permit(:art_type, :topics, :disabled, :deactivated, :disabled_message, :ignore_warning_checker)
  end
end
