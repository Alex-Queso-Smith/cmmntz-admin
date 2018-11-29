json.gallery do
  json.id @gallery.id
  json.name @gallery.name
  json.settings do
    json.comments_from @gallery.comments_from || ""
    json.votes_from @gallery.votes_from || ""
    json.filter_list @gallery.filter_list || []
    json.not_filter_list @gallery.not_filter_list || []
    json.sort_dir @gallery.sort_dir || "desc"
    json.sort_type @gallery.sort_type || "created_at"
    json.censor @gallery.censor || false
    json.thread_expiration_days @gallery.default_art_thread_expiration_days || ""
  end
end
