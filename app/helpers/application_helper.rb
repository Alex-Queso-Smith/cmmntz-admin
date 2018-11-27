module ApplicationHelper

  def display_date timestamp, time = true
    return "" if timestamp.blank?
    timestamp.strftime(time ? "%Y-%m-%d %H:%M" : "%Y-%m-%d")
  end
end
