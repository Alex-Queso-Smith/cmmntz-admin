json.blacklistings @gallery_blacklistings do |blacklisting|
  json.user_id blacklisting.user_id
  json.created_at display_date(blacklisting.created_at)
  json.user_name blacklisting.user.user_name
end
