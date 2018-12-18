class Api::V1::MassManageCommentsController < ApiController
  load_and_authorize_resource :art

  def create
    @mass_manage_comment = MassManageComment.new(mass_manage_comment_params.merge(art: @art, customer: current_customer))
    if @mass_manage_comment.valid?
      render json: { message: "Changes successful" }
    else
      render json: { errors: @mass_manage_comment.errors, status: :unprocessable_entity }
    end
  end

  private

  def mass_manage_comment_params
    params.require(:mass_manage_comment).permit(
      :action,
      :comment_ids
    )
  end

end
