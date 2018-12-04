json.art do
  json.id @art.id
  json.comments @comments do |comment|
    json.id comment.id
    json.text comment.text
    json.user_name comment_user_user_name(comment)
    json.user_id comment_user_user_id(comment)
    json.date_posted display_date(comment.created_at)
  end
end
