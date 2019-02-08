if @comments.respond_to?('total_entries')
  json.totalResults  @comments.total_entries
  json.rowsPerPage Comment.per_page
end

json.comments @comments do |comment|
  json.id comment.id
  json.text comment.text
  json.user_name comment_user_user_name(comment)
  json.avatar_base_image comment_user_avatar_image(comment)
  json.user_id comment_user_user_id(comment)
  json.date_posted display_time_ago(comment.created_at)
  json.user_is_mod comment_user_mod(comment)
  json.user_is_admin comment_user_admin(comment)

  json.total_interactions comment.interactions_count

  json.vote_counts do
    Vote::TYPES.each do |type|
      vote = comment.votes.select { |v| v.vote_type == type }
      json.set! type, vote.length
    end
  end

  json.vote_percents do
    Vote::TYPES.each do |type|
      vote = comment.votes.select { |v| v.vote_type == type }
      if comment.interactions_count > 0
        per = ((vote.length.to_f / comment.interactions_count.to_f) * 100).round
      else
        per = 0
      end
      json.set! type, per
    end
  end

end
