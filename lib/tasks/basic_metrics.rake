namespace :basic_metrics do
  desc "Deliver all Metrics"
  task :all_metrics => :environment do
    Rake::Task['basic_metrics:customers_last_24_hours'].invoke
    Rake::Task['basic_metrics:customers_with_activity_last_24_hours'].invoke
    Rake::Task['basic_metrics:users_last_24_hours'].invoke
    Rake::Task['basic_metrics:user_attendance_last_24_hours'].invoke
    Rake::Task['basic_metrics:active_users_last_24_hours'].invoke
    Rake::Task['basic_metrics:comments_last_24_hours'].invoke
    Rake::Task['basic_metrics:votes_last_24_hours'].invoke
  end

  desc "Customers since 24 hours ago"
  task :customers_last_24_hours => :environment do
    galleries = Gallery.created_since(24.hours.ago)
    puts "New Customers (past 24 hours): #{galleries.size}"

  end

  desc "customers with activity"
  task :customers_with_activity_last_24_hours => :environment do
    datetime = 24.hours.ago
    interaction_gallery_ids =  ArtInteraction.created_since(datetime).joins(:art).select("DISTINCT(arts.gallery_id)").map(&:gallery_id)
    comment_gallery_ids = Comment.created_since(datetime).select("DISTINCT(gallery_id)").map(&:gallery_id)
    vote_gallery_ids = Vote.created_since(datetime).joins(:comment).select("DISTINCT(comments.gallery_id)").map(&:gallery_id)
    all_gallery_ids = interaction_gallery_ids + comment_gallery_ids + vote_gallery_ids

    all_gallery_ids = all_gallery_ids.uniq.size

    puts "New Customers with Activity (past 24 hours): #{all_gallery_ids}"
  end


  desc "New Users since 24 hours ago"
  task :users_last_24_hours => :environment do
    users = User.created_since(24.hours.ago)
    users = users.where.not(current_login_ip: '96.227.61.123')
    users = users.where.not(last_login_ip: '96.227.61.123')
    non_guest_users = users.select{ |u| !u.user_name.blank? }
    puts "New Users (past 24 hours): #{users.size} total; #{non_guest_users.size} registered"
  end

  desc "Users with Attendance since 24 hours ago"
  task :user_attendance_last_24_hours => :environment do
    users = User.last_action_since(24.hours.ago)
    users = users.where.not(current_login_ip: '96.227.61.123')
    users = users.where.not(last_login_ip: '96.227.61.123')
    non_guest_users = users.select{ |u| !u.user_name.blank? }
    puts "Users with Attendance (past 24 hours): #{users.size} total; #{non_guest_users.size} registered"
  end

  desc "Active Users since 24 hours ago"
  task :active_users_last_24_hours => :environment do
    datetime = 24.hours.ago
    comment_user_ids = Comment.created_since(datetime).joins(:user)
    comment_user_ids = comment_user_ids.where.not(users: {current_login_ip: '96.227.61.123'})
    comment_user_ids = comment_user_ids.where.not(users: {last_login_ip: '96.227.61.123'}).map(&:user_id)
    vote_user_ids = Vote.created_since(datetime).joins(:user)
    vote_user_ids = vote_user_ids.where.not(users: {current_login_ip: '96.227.61.123'})
    vote_user_ids = vote_user_ids.where.not(users: {last_login_ip: '96.227.61.123'}).map(&:user_id)
    all_users = (comment_user_ids + vote_user_ids).uniq

    puts "Users with Activity (past 24 hours): #{all_users.size}"
  end

  desc "Comments since 24 hours ago"
  task :comments_last_24_hours => :environment do
    comments = Comment.created_since(24.hours.ago).joins(:user)
    comments = comments.where.not(users: {current_login_ip: '96.227.61.123'})
    comments = comments.where.not(users: {last_login_ip: '96.227.61.123'})
    puts "New Comments (past 24 hours): #{comments.size}"
  end

  desc "Votes since 24 hours ago"
  task :votes_last_24_hours => :environment do
    votes = Vote.created_since(24.hours.ago).joins(:user)
    votes = votes.where.not(users: {current_login_ip: '96.227.61.123'})
    votes = votes.where.not(users: {last_login_ip: '96.227.61.123'})
    puts "New Votes (past 24 hours): #{votes.size}"
  end
end
