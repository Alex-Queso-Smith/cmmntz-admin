class User < ApplicationRecord
  GENDERS = [0, 1, 2]
  DISPLAY_GENDERS = ["female", "other", "male"]

  has_many :gallery_blacklistings

  # define galleries where the user has moderator status
  has_many :user_gallery_moderators

  scope :not_guest, -> {
    where("users.user_name IS NOT NULL AND users.user_name != '' ")
  }

  def self.search(filters)
    scope = where({}).not_guest
    scope = self.sort_order(scope, filters)
    scope
  end

  def self.sort_order(scope, search)
    sort_dir = search[:sort_dir] ? search[:sort_dir] : "desc"
    sort_type = search[:sort] ? search[:sort] : "created_at"
    scope = scope.order("#{sort_type} #{sort_dir}")
    scope
  end

  def guest?
    user_name.blank? && email.blank?
  end

  def customer_for?(gallery_id)
    Customer.account_for_gallery_and_user(gallery_id, id).size > 0
  end

  def user_gallery_moderator_for?(gallery_id)
    user_gallery_moderators.for_gallery(gallery_id).size > 0
  end

  # re geo coordinates
  def geo_coordinates
    return "" if latitude.blank? || longitude.blank?
    "#{latitude}, #{longitude}"
  end

  ### re gender
  # display gender
  def gender_display
    return "" if gender.nil?
    DISPLAY_GENDERS[gender.to_i]
  end

  ### re age_range
  # display age_range
  def age_range_display
    return "" if age_range.nil?
    return "13-19" if age_range == 15
    return "75+" if age_range == 75

    "#{age_range}-#{age_range + 4}"
  end

end
