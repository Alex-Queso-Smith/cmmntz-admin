namespace :basic_metrics do
  desc "Deliver all Metrics"
  task :all_metrics => :environment do
    Rake::Task['basic_metrics:customers_last_24_hours'].invoke
    Rake::Task['basic_metrics:customers_with_activity_last_24_hours'].invoke
    Rake::Task['basic_metrics:users_last_24_hours'].invoke
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
    interactions =  ArtInteraction.created_since(datetime).includes(art: :gallery)
    interaction_galleries = interactions.map(&:art).flatten.map(&:gallery)

    comment_galleries = Gallery.where(id: Comment.created_since(datetime).select("DISTINCT(gallery_id)").map(&:gallery_id))

    vote_galleries = Vote.created_since(datetime).joins(:comment).select("DISTINCT(comments.gallery_id)").to_sql

    puts vote_galleries
    # puts "New Customrs with Activity (past 24 hours): coming soon!"
  end


  desc "New Users not guest since 24 hours ago"
  task :users_last_24_hours => :environment do
    users = User.created_since(24.hours.ago)
    puts "New Users (past 24 hours): #{users.size}"
  end

  desc "Active Users since 24 hours ago"
  task :active_users_last_24_hours => :environment do
    puts "Users with Activity (past 24 hours): coming soon!"
  end

  desc "Comments since 24 hours ago"
  task :comments_last_24_hours => :environment do
    comments = Comment.created_since(24.hours.ago)
    puts "New Comments (past 24 hours): #{comments.size}"
  end

  desc "Votes since 24 hours ago"
  task :votes_last_24_hours => :environment do
    votes = Vote.created_since(24.hours.ago)
    puts "New Votes (past 24 hours): #{votes.size}"
  end
end
