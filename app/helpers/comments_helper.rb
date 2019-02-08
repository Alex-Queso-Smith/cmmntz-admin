module CommentsHelper
  def comment_user_user_name comment
    comment.render_anonymously? ? "Anonymous" : comment.user.user_name
  end

  def comment_user_user_id comment
    comment.user_id
  end

  def comment_user_mod comment
    if comment.render_anonymously?
      false
    else
      comment.user.user_gallery_moderator_for?(current_gallery.id)
    end
  end

  def comment_user_admin comment
    if comment.render_anonymously?
      false
    else
      comment.user.customer_for?(current_gallery.id)
    end
  end

  def comment_user_avatar_image comment
    if comment.render_anonymously?
      "anonymous"
    elsif comment.user.base_image == ""
      "goat_956fce_83ddb4"
    else
      comment.user.base_image
    end
  end
end
