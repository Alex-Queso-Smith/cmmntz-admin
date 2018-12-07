module ApplicationHelper
  def nav_title(current_gallery)
    base = "ClassiAdmin"
    if current_gallery
      base += ": #{current_gallery.name}"
    end
    base
  end
  def display_date timestamp, time = true
    return "" if timestamp.blank?
    timestamp.strftime(time ? "%Y-%m-%d %H:%M" : "%Y-%m-%d")
  end
end
