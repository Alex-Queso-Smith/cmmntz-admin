json.blacklistings @gallery_blacklistings do |blacklisting|
  json.user_id blacklisting.user_id
  json.created_at display_date(blacklisting.created_at, false)
  if blacklisting.ban_expires_at.is_a? String
    exp = blacklisting.ban_expires_at
  else
    exp = display_date(blacklisting.ban_expires_at, false)
  end
  json.expires_at exp
  json.user_name blacklisting.user.user_name
end
