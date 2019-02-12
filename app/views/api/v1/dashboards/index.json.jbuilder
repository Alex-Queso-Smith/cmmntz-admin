json.dashboard do
  json.pending_comments @dashboard.pending_comments
  json.comments_by_timeframes do
    json.all @dashboard.comments_by_timeframes["all"]
    json.today @dashboard.comments_by_timeframes["today"]
    json.week @dashboard.comments_by_timeframes["week"]
    json.month @dashboard.comments_by_timeframes["month"]
  end
  json.votes_by_timeframes do
    json.all @dashboard.votes_by_timeframes["all"]
    json.today @dashboard.votes_by_timeframes["today"]
    json.week @dashboard.votes_by_timeframes["week"]
    json.month @dashboard.votes_by_timeframes["month"]
  end
  json.users_by_timeframes do
    json.all @dashboard.users_by_timeframes["all"]
    json.today @dashboard.users_by_timeframes["today"]
    json.week @dashboard.users_by_timeframes["week"]
    json.month @dashboard.users_by_timeframes["month"]
  end

  json.top_thread do
    if !@dashboard.top_thread.blank?
      json.id @dashboard.top_thread.id
      json.url @dashboard.top_thread.url
      json.commentsCount @dashboard.top_thread.approved_comments.size
      json.votesCount @dashboard.top_thread.votes.size
    else
      json.id ""
      json.url ""
      json.commentsCount 0
      json.votesCount 0
    end
  end
end
