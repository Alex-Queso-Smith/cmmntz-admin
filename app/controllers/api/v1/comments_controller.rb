class Api::V1::CommentsController < ApiController
  load_and_authorize_resource 

  def destroy
    if @comment.update(comment_params)
      render json: { message: "Destroy successfull" }
    else
      render json: { errors: @comment.errors, status: :unprocessable_entity }
    end
  end

  def comment_params
    params.require(:comment).permit(
      :deleted
    )
  end

end
