class User < ApplicationRecord
  self.per_page = 10 # results per page default
  GENDERS = [0, 1, 2]
  DISPLAY_GENDERS = ["female", "other", "male"]

  # general settings v-attrs
  vstr 'settings', {
    color_theme: :string,
    font: :string,
    comments_from: :string,
    filter_list: :array,
    not_filter_list: :array,
    sort_dir: :string,
    sort_type: :string,
    votes_from: :string,
    censor: :string,
    show_censored_comments: :bool,
    hide_anon_and_guest: :bool,
    settings_updated: :bool,
    gender_search: :string,
    age_range_search: :string
  }

  has_many :gallery_blacklistings

  # define galleries where the user has moderator status
  has_many :user_gallery_moderators

  has_many :user_article_views
  has_many :user_video_clicks

  # define  users that the user is following
  has_many :followings, foreign_key: "follower_id"
  has_many :followed_users, through: :followings, source: :following

  # define users that are following the users
  has_many :followers, class_name: 'Following', foreign_key: "following_id"
  has_many :follower_users, through: :followers, source: :follower

  # define  users that the user is blocking
  has_many :blockings, foreign_key: "blocker_id"
  has_many :blocked_users, through: :blockings, source: :blocking

  # define users that are blocking the users
  has_many :blockers, class_name: 'Blocking', foreign_key: "blocking_id"
  has_many :blocker_users, through: :blockers, source: :blocker

  has_many :user_feedbacks
  has_many :art_interactions

  has_many :votes
  has_many :comments



  scope :not_guest, -> {
    where("users.user_name IS NOT NULL AND users.user_name != '' ")
  }

  scope :not_blacklisted, -> (gallery_id) {
    joins("left join gallery_blacklistings on gallery_blacklistings.user_id = users.id AND gallery_blacklistings.gallery_id = '#{gallery_id}' AND gallery_blacklistings.expires_at >= NOW()")
    .where("gallery_blacklistings.id IS NULL")
  }

  scope :with_interactions_for_gallery, -> (gallery_id) {
    where(ArtInteraction.joins(:art).joins(art: :gallery)
      .where(galleries: {id: gallery_id}).where("art_interactions.user_id = users.id").exists)
  }

  scope :created_since, -> (datetime) {
    where(arel_table[:created_at].gteq(datetime))
  }

  scope :last_action_since, -> (datetime) {
    where(arel_table[:last_request_at].gteq(datetime))
  }

  def self.search(filters, gallery, page = 1)
    scope = where({}).not_guest
    scope = scope.includes(:user_article_views, :user_video_clicks, :followings, :blockings, :user_feedbacks, :votes, :comments )
    scope = self.sort_order(scope, filters)
    unless filters[:show_banned]
      scope = scope.not_blacklisted(gallery.id)
    end
    scope = scope.with_interactions_for_gallery(gallery.id)
    scope.page(page)
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

  def display_user_name
    guest? ? "guest" : user_name
  end

  def display_email
    guest? ? "guest" : email
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
