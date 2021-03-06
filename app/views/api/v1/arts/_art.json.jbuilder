json.art do
  json.id art.id
  json.artType art.art_type || ''
  json.topics art.topics_list

if !params[:display]
    json.url art.url
    json.artist art.gallery_artist.artist_name if art.gallery_artist
    json.status art.status
    json.publishedAt art.published_at.strftime("%B %d, %Y")
    json.threadStarted display_date art.created_at
    json.lastInteraction display_date art.last_interaction_at
    json.pendingComments art.pending_comments.size
    json.deletedComments art.deleted_comments.size
    json.approvedComments art.approved_comments.size
    json.flaggedComments art.flagged_comments.size
    json.interactions art.art_interactions.size
    json.votesCount art.votes.size
  end

  if (params[:display] && params[:display] == "settings") || params[:index]
    json.ignore_warning_checker art.ignore_warning_checker?
    json.disabled art.disabled?
    json.deactivated art.deactivated?
    json.disabled_message art.disabled_message || ""
  end
end
