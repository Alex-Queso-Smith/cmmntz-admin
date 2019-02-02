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
end