class ArtsController < ApplicationController
  load_and_authorize_resource

  def index
  end

  def edit
  end

  def update
    respond_to do |format|
      if @art.update(art_params)
        format.html { redirect_to arts_path, notice: 'Art was successfully updated.' }
        format.json { render :show, status: :ok, location: @art }
      else
        format.html { render :edit }
        format.json { render json: @art.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def art_params
    params.require(:art).permit(:disabled, :deactivated)
  end
end
