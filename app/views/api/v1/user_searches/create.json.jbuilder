json.users @users do |user|
  json.id user.id
  json.user_name user.display_user_name
  json.email user.display_email
  json.registered_at display_date user.created_at
  json.article_views user.user_article_views.size
  json.tutorial_opened user.user_video_clicks.size > 0 ? "Y" : "N"
  json.geo_coordinates user.geo_coordinates
  json.age_range user.age_range_display
  json.gender user.gender_display
  json.login_count user.login_count
  json.failed_login_count user.failed_login_count
  json.last_action_at display_date user.last_request_at
  json.current_login_at display_date user.current_login_at
  json.last_login_at display_date user.last_login_at
  json.current_login_ip user.current_login_ip
  json.last_login_ip user.last_login_ip
end
