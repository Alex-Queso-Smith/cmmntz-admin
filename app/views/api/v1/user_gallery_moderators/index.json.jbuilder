json.moderators @user_gallery_moderators do |moderator|
  json.partial! 'moderator', moderator: moderator
end
