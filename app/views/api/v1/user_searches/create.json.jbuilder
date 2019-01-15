json.users @users do |user|
  json.id user.id
  json.user_name user.display_user_name
  json.age_range user.age_range_display
  json.geo_coordinates user.geo_coordinates
  json.gender user.gender_display
  json.email user.display_email
  json.votes_count user.votes.size
  json.comments_count user.comments.select {|c| c.parent_id.blank? }.size
  json.repies_count user.comments.select {|c| !c.parent_id.blank? }.size
  json.friends_count user.followings.size
  json.blocks_count user.blockings.size
  json.anons_count user.comments.select {|c| c.anonymous? }.size
  feedbacks = user.user_feedbacks.select {|f| f.type == "Feedback"}
  json.feedbacks_count feedbacks ? feedbacks.size : 0
  bugs = user.user_feedbacks.select {|f| f.type == "Bug"}
  json.bugs_count bugs ? bugs.size : 0
  json.custom_settings user.settings_updated? ? "Y" : "N"
  json.tutorial_opened user.user_video_clicks.size > 0 ? "Y" : "N"
  json.article_views user.user_article_views.size
  json.registered_at display_date user.created_at
  json.last_action_at display_date user.last_request_at
  json.login_count user.login_count
  json.current_login_ip user.current_login_ip
end
