class Dashboard < Tableless
TIMEFRAMES = ['', 'today', 'week', 'month']

  attribute :gallery_id, :string

  def gallery
    @gallery ||= Gallery.find(gallery_id)
  end

  def pending_comments
    gallery.pending_comments.size
  end

  def users_by_timeframes
    return @users_by_timeframes if defined?(@users_by_timeframes)
    @users_by_timeframes = Hash.new
    TIMEFRAMES.each do |frame|
      @users_by_timeframes[frame.blank? ? 'all' : frame] = gallery.users_for_timeframe(frame)
    end
    return @users_by_timeframes
  end

  def comments_by_timeframes
    return @comments_by_timeframes if defined?(@comments_by_timeframes)
    @comments_by_timeframes = Hash.new
    TIMEFRAMES.each do |frame|
      @comments_by_timeframes[frame.blank? ? 'all' : frame] = gallery.comments_for_timeframe(frame)
    end
    return @comments_by_timeframes
  end

  def votes_by_timeframes
    return @votes_by_timeframes if defined?(@votes_by_timeframes)
    @votes_by_timeframes = Hash.new
    TIMEFRAMES.each do |frame|
      @votes_by_timeframes[frame.blank? ? 'all' : frame] = gallery.votes_for_timeframe(frame)
    end
    return @votes_by_timeframes
  end

  def top_thread
    return @top_art if defined?(@top_art)
    arts = Art.for_gallery_since(gallery.id, 7.days.ago.beginning_of_day)
    @top_art = []
    top_engagement = 0
    arts.each do |art|
      total_engagement = art.votes.size + art.approved_comments.size
      if total_engagement > top_engagement
        @top_art = art
      end
    end
    return @top_art
  end
end
