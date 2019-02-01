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
    data = Hash.new
    TIMEFRAMES.each do |frame|
      data[frame.blank? ? 'all' : frame] = gallery.users_for_timeframe(frame)
    end
    return data
  end

  def comments_by_timeframes
    data = Hash.new
    TIMEFRAMES.each do |frame|
      data[frame.blank? ? 'all' : frame] = gallery.comments_for_timeframe(frame)
    end
    return data
  end

  def votes_by_timeframes
    data = Hash.new
    TIMEFRAMES.each do |frame|
      data[frame.blank? ? 'all' : frame] = gallery.votes_for_timeframe(frame)
    end
    return data
  end
end
