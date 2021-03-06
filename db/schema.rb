# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_02_01_211949) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "admin_mails", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "customer_user_id"
    t.uuid "user_id"
    t.string "subject"
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["customer_user_id"], name: "index_admin_mails_on_customer_user_id"
    t.index ["user_id"], name: "index_admin_mails_on_user_id"
  end

  create_table "art_interactions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "art_id"
    t.uuid "user_id"
    t.datetime "created_at"
    t.index ["art_id", "user_id"], name: "index_art_interactions_on_art_id_and_user_id"
    t.index ["created_at"], name: "index_art_interactions_on_created_at"
  end

  create_table "article_categories", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.integer "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "article_topics", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "article_id"
    t.uuid "ct_topic_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["article_id", "ct_topic_id"], name: "index_article_topics_on_article_id_and_ct_topic_id"
  end

  create_table "articles", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "title"
    t.string "slug"
    t.text "introduction"
    t.text "body"
    t.date "publish_date"
    t.uuid "article_category_id"
    t.uuid "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "body_2"
    t.text "body_3"
    t.string "youtube_url"
    t.index ["article_category_id"], name: "index_articles_on_article_category_id"
    t.index ["author_id"], name: "index_articles_on_author_id"
    t.index ["publish_date"], name: "index_articles_on_publish_date"
    t.index ["slug"], name: "index_articles_on_slug"
  end

  create_table "arts", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "url"
    t.datetime "last_interaction_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "gallery_id"
    t.datetime "published_at"
    t.string "art_type"
    t.text "disabled_message"
    t.uuid "gallery_artist_id"
    t.text "settings"
    t.integer "art_interactions_count", default: 0
    t.index ["art_interactions_count"], name: "index_arts_on_art_interactions_count"
    t.index ["gallery_artist_id"], name: "index_arts_on_gallery_artist_id"
    t.index ["gallery_id"], name: "index_arts_on_gallery_id"
    t.index ["last_interaction_at"], name: "index_arts_on_last_interaction_at"
    t.index ["url"], name: "index_arts_on_url"
  end

  create_table "authors", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "blockings", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "blocker_id"
    t.uuid "blocking_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["blocker_id"], name: "index_blockings_on_blocker_id"
    t.index ["blocking_id"], name: "index_blockings_on_blocking_id"
  end

  create_table "check_logs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "checkable_id"
    t.string "check_name"
    t.datetime "created_at"
    t.string "checkable_type"
    t.index ["checkable_id", "check_name", "created_at"], name: "index_check_logs_on_checkable_id_and_check_name_and_created_at"
    t.index ["checkable_id", "checkable_type"], name: "index_check_logs_on_checkable_id_and_checkable_type"
  end

  create_table "comment_interactions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "comment_id"
    t.uuid "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "comment_id"], name: "index_comment_interactions_on_user_id_and_comment_id"
  end

  create_table "comments", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id"
    t.uuid "art_id"
    t.string "art_type"
    t.text "text"
    t.boolean "anonymous", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "interactions_count", default: 0
    t.uuid "parent_id"
    t.text "censored_text"
    t.boolean "approved", default: false, null: false
    t.boolean "deleted", default: false
    t.datetime "edited_at"
    t.boolean "ignore_flagged", default: false, null: false
    t.string "approved_by"
    t.boolean "guest", default: false, null: false
    t.uuid "gallery_id"
    t.index ["approved"], name: "index_comments_on_approved"
    t.index ["art_id", "art_type"], name: "index_comments_on_art_id_and_art_type"
    t.index ["gallery_id"], name: "index_comments_on_gallery_id"
    t.index ["guest"], name: "index_comments_on_guest"
    t.index ["ignore_flagged"], name: "index_comments_on_ignore_flagged"
    t.index ["interactions_count"], name: "index_comments_on_interactions_count"
    t.index ["parent_id"], name: "index_comments_on_parent_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "ct_topics", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "customers", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "email"
    t.string "first_name"
    t.string "last_name"
    t.string "role"
    t.uuid "gallery_id"
    t.string "crypted_password"
    t.string "password_salt"
    t.string "persistence_token"
    t.string "single_access_token"
    t.string "perishable_token"
    t.integer "login_count", default: 0, null: false
    t.integer "failed_login_count", default: 0, null: false
    t.datetime "last_request_at"
    t.datetime "current_login_at"
    t.datetime "last_login_at"
    t.string "current_login_ip"
    t.string "last_login_ip"
    t.boolean "active", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "subscribe_newsletter", default: false, null: false
    t.index ["gallery_id"], name: "index_customers_on_gallery_id"
    t.index ["perishable_token"], name: "index_customers_on_perishable_token", unique: true
    t.index ["persistence_token"], name: "index_customers_on_persistence_token", unique: true
    t.index ["single_access_token"], name: "index_customers_on_single_access_token", unique: true
    t.index ["subscribe_newsletter"], name: "index_customers_on_subscribe_newsletter"
  end

  create_table "fae_changes", id: :serial, force: :cascade do |t|
    t.integer "changeable_id"
    t.string "changeable_type"
    t.integer "user_id"
    t.string "change_type"
    t.text "updated_attributes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["changeable_id"], name: "index_fae_changes_on_changeable_id"
    t.index ["changeable_type"], name: "index_fae_changes_on_changeable_type"
    t.index ["user_id"], name: "index_fae_changes_on_user_id"
  end

  create_table "fae_files", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "asset"
    t.string "fileable_type"
    t.integer "file_size"
    t.integer "position", default: 0
    t.string "attached_as"
    t.boolean "on_stage", default: true
    t.boolean "on_prod", default: false
    t.boolean "required", default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.uuid "fileable_id"
    t.index ["attached_as"], name: "index_fae_files_on_attached_as"
  end

  create_table "fae_images", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "asset"
    t.string "imageable_type"
    t.string "alt"
    t.string "caption"
    t.integer "position", default: 0
    t.string "attached_as"
    t.boolean "on_stage", default: true
    t.boolean "on_prod", default: false
    t.integer "file_size"
    t.boolean "required", default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.uuid "imageable_id"
    t.index ["attached_as"], name: "index_fae_images_on_attached_as"
  end

  create_table "fae_options", id: :serial, force: :cascade do |t|
    t.string "title"
    t.string "time_zone"
    t.string "colorway"
    t.string "stage_url"
    t.string "live_url"
    t.integer "singleton_guard"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["singleton_guard"], name: "index_fae_options_on_singleton_guard", unique: true
  end

  create_table "fae_roles", id: :serial, force: :cascade do |t|
    t.string "name"
    t.integer "position"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "fae_static_pages", id: :serial, force: :cascade do |t|
    t.string "title"
    t.integer "position", default: 0
    t.boolean "on_stage", default: true
    t.boolean "on_prod", default: false
    t.string "slug"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["slug"], name: "index_fae_static_pages_on_slug"
  end

  create_table "fae_text_areas", id: :serial, force: :cascade do |t|
    t.string "label"
    t.text "content"
    t.integer "position", default: 0
    t.boolean "on_stage", default: true
    t.boolean "on_prod", default: false
    t.integer "contentable_id"
    t.string "contentable_type"
    t.string "attached_as"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["attached_as"], name: "index_fae_text_areas_on_attached_as"
    t.index ["contentable_id"], name: "index_fae_text_areas_on_contentable_id"
    t.index ["contentable_type"], name: "index_fae_text_areas_on_contentable_type"
    t.index ["on_prod"], name: "index_fae_text_areas_on_on_prod"
    t.index ["on_stage"], name: "index_fae_text_areas_on_on_stage"
    t.index ["position"], name: "index_fae_text_areas_on_position"
  end

  create_table "fae_text_fields", id: :serial, force: :cascade do |t|
    t.string "contentable_type"
    t.integer "contentable_id"
    t.string "attached_as"
    t.string "label"
    t.string "content"
    t.integer "position", default: 0
    t.boolean "on_stage", default: true
    t.boolean "on_prod", default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["attached_as"], name: "index_fae_text_fields_on_attached_as"
    t.index ["contentable_type", "contentable_id"], name: "index_fae_text_fields_on_contentable_type_and_contentable_id"
    t.index ["on_prod"], name: "index_fae_text_fields_on_on_prod"
    t.index ["on_stage"], name: "index_fae_text_fields_on_on_stage"
    t.index ["position"], name: "index_fae_text_fields_on_position"
  end

  create_table "fae_users", id: :serial, force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.string "first_name"
    t.string "last_name"
    t.integer "role_id"
    t.boolean "active"
    t.string "language"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["confirmation_token"], name: "index_fae_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_fae_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_fae_users_on_reset_password_token", unique: true
    t.index ["role_id"], name: "index_fae_users_on_role_id"
    t.index ["unlock_token"], name: "index_fae_users_on_unlock_token", unique: true
  end

  create_table "followings", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "follower_id"
    t.uuid "following_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["follower_id"], name: "index_followings_on_follower_id"
    t.index ["following_id"], name: "index_followings_on_following_id"
  end

  create_table "galleries", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.text "settings"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "comment_etiquette"
    t.string "site_url"
    t.integer "tier", limit: 2
    t.index ["site_url"], name: "index_galleries_on_site_url"
    t.index ["tier"], name: "index_galleries_on_tier"
  end

  create_table "gallery_artists", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "artist_name"
    t.uuid "gallery_id"
    t.uuid "customer_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["artist_name"], name: "index_gallery_artists_on_artist_name"
    t.index ["customer_id"], name: "index_gallery_artists_on_customer_id"
    t.index ["gallery_id"], name: "index_gallery_artists_on_gallery_id"
  end

  create_table "gallery_blacklistings", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "gallery_id"
    t.uuid "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "expires_at"
    t.index ["expires_at"], name: "index_gallery_blacklistings_on_expires_at"
    t.index ["gallery_id", "user_id"], name: "index_gallery_blacklistings_on_gallery_id_and_user_id"
    t.index ["gallery_id"], name: "index_gallery_blacklistings_on_gallery_id"
  end

  create_table "user_article_views", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id"
    t.uuid "article_id"
    t.datetime "created_at"
    t.index ["user_id", "article_id"], name: "index_user_article_views_on_user_id_and_article_id", unique: true
    t.index ["user_id"], name: "index_user_article_views_on_user_id"
  end

  create_table "user_feedbacks", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id"
    t.string "type"
    t.string "category"
    t.text "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "browser"
    t.string "browser_version"
    t.string "platform"
    t.string "os"
    t.string "ip"
    t.string "email"
    t.string "first_name"
    t.string "last_name"
    t.index ["user_id"], name: "index_user_feedbacks_on_user_id"
  end

  create_table "user_gallery_moderators", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id"
    t.uuid "gallery_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["gallery_id"], name: "index_user_gallery_moderators_on_gallery_id"
    t.index ["user_id"], name: "index_user_gallery_moderators_on_user_id"
  end

  create_table "user_video_clicks", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id"
    t.string "video_title"
    t.datetime "created_at"
    t.index ["created_at"], name: "index_user_video_clicks_on_created_at"
    t.index ["user_id", "video_title"], name: "index_user_video_clicks_on_user_id_and_video_title", unique: true
    t.index ["user_id"], name: "index_user_video_clicks_on_user_id"
    t.index ["video_title"], name: "index_user_video_clicks_on_video_title"
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "user_name"
    t.string "crypted_password"
    t.string "password_salt"
    t.string "persistence_token"
    t.integer "age_range", limit: 2
    t.float "latitude"
    t.float "longitude"
    t.text "avatar"
    t.integer "gender", limit: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email"
    t.text "settings"
    t.integer "login_count", default: 0, null: false
    t.integer "failed_login_count", default: 0, null: false
    t.datetime "last_request_at"
    t.datetime "current_login_at"
    t.datetime "last_login_at"
    t.string "current_login_ip"
    t.string "last_login_ip"
    t.boolean "subscribe_newsletter", default: false, null: false
    t.index ["age_range"], name: "index_users_on_age_range"
    t.index ["created_at"], name: "index_users_on_created_at"
    t.index ["gender"], name: "index_users_on_gender"
    t.index ["last_login_at"], name: "index_users_on_last_login_at"
    t.index ["last_request_at"], name: "index_users_on_last_request_at"
    t.index ["latitude", "longitude"], name: "index_users_on_latitude_and_longitude"
    t.index ["login_count"], name: "index_users_on_login_count"
    t.index ["subscribe_newsletter"], name: "index_users_on_subscribe_newsletter"
    t.index ["user_name"], name: "index_users_on_user_name", unique: true
  end

  create_table "votes", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id"
    t.uuid "comment_id"
    t.string "vote_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["comment_id"], name: "index_votes_on_comment_id"
    t.index ["user_id"], name: "index_votes_on_user_id"
  end


  create_view "comment_vote_tabulations",  sql_definition: <<-SQL
      SELECT comments.id,
      comments.user_id,
      comments.art_id,
      comments.art_type,
      comments.text,
      comments.anonymous,
      comments.created_at,
      comments.updated_at,
      comments.interactions_count,
      comments.parent_id,
      char_length(comments.text) AS comment_length,
      sum(
          CASE
              WHEN ((votes.vote_type)::text = 'top'::text) THEN 1
              ELSE 0
          END) AS top_count,
      sum(
          CASE
              WHEN ((votes.vote_type)::text = 'love'::text) THEN 1
              ELSE 0
          END) AS love_count,
      sum(
          CASE
              WHEN ((votes.vote_type)::text = 'like_a_lot'::text) THEN 1
              ELSE 0
          END) AS like_a_lot_count,
      sum(
          CASE
              WHEN ((votes.vote_type)::text = 'like'::text) THEN 1
              ELSE 0
          END) AS like_count,
      sum(
          CASE
              WHEN ((votes.vote_type)::text = 'indifferent'::text) THEN 1
              ELSE 0
          END) AS indifferent_count,
      sum(
          CASE
              WHEN ((votes.vote_type)::text = 'dislike'::text) THEN 1
              ELSE 0
          END) AS dislike_count,
      sum(
          CASE
              WHEN ((votes.vote_type)::text = 'dislike_a_lot'::text) THEN 1
              ELSE 0
          END) AS dislike_a_lot_count,
      sum(
          CASE
              WHEN ((votes.vote_type)::text = 'trash'::text) THEN 1
              ELSE 0
          END) AS trash_count,
      sum(
          CASE
              WHEN ((votes.vote_type)::text = 'warn'::text) THEN 1
              ELSE 0
          END) AS warn_count,
      sum(
          CASE
              WHEN ((votes.vote_type)::text = 'smart'::text) THEN 1
              ELSE 0
          END) AS smart_count,
      sum(
          CASE
              WHEN ((votes.vote_type)::text = 'funny'::text) THEN 1
              ELSE 0
          END) AS funny_count,
      sum(
          CASE
              WHEN ((votes.vote_type)::text = 'happy'::text) THEN 1
              ELSE 0
          END) AS happy_count,
      sum(
          CASE
              WHEN ((votes.vote_type)::text = 'shocked'::text) THEN 1
              ELSE 0
          END) AS shocked_count,
      sum(
          CASE
              WHEN ((votes.vote_type)::text = 'sad'::text) THEN 1
              ELSE 0
          END) AS sad_count,
      sum(
          CASE
              WHEN ((votes.vote_type)::text = 'boring'::text) THEN 1
              ELSE 0
          END) AS boring_count,
      sum(
          CASE
              WHEN ((votes.vote_type)::text = 'angry'::text) THEN 1
              ELSE 0
          END) AS angry_count,
      (
          CASE
              WHEN (comments.interactions_count > 0) THEN ((sum(
              CASE
                  WHEN ((votes.vote_type)::text = 'top'::text) THEN 1
                  ELSE 0
              END))::numeric / (comments.interactions_count)::numeric)
              ELSE (0)::numeric
          END)::numeric(5,4) AS top_percent,
      (
          CASE
              WHEN (comments.interactions_count > 0) THEN ((sum(
              CASE
                  WHEN ((votes.vote_type)::text = 'love'::text) THEN 1
                  ELSE 0
              END))::numeric / (comments.interactions_count)::numeric)
              ELSE (0)::numeric
          END)::numeric(5,4) AS love_percent,
      (
          CASE
              WHEN (comments.interactions_count > 0) THEN ((sum(
              CASE
                  WHEN ((votes.vote_type)::text = 'like_a_lot'::text) THEN 1
                  ELSE 0
              END))::numeric / (comments.interactions_count)::numeric)
              ELSE (0)::numeric
          END)::numeric(5,4) AS like_a_lot_percent,
      (
          CASE
              WHEN (comments.interactions_count > 0) THEN ((sum(
              CASE
                  WHEN ((votes.vote_type)::text = 'like'::text) THEN 1
                  ELSE 0
              END))::numeric / (comments.interactions_count)::numeric)
              ELSE (0)::numeric
          END)::numeric(5,4) AS like_percent,
      (
          CASE
              WHEN (comments.interactions_count > 0) THEN ((sum(
              CASE
                  WHEN ((votes.vote_type)::text = 'indifferent'::text) THEN 1
                  ELSE 0
              END))::numeric / (comments.interactions_count)::numeric)
              ELSE (0)::numeric
          END)::numeric(5,4) AS indifferent_percent,
      (
          CASE
              WHEN (comments.interactions_count > 0) THEN ((sum(
              CASE
                  WHEN ((votes.vote_type)::text = 'dislike'::text) THEN 1
                  ELSE 0
              END))::numeric / (comments.interactions_count)::numeric)
              ELSE (0)::numeric
          END)::numeric(5,4) AS dislike_percent,
      (
          CASE
              WHEN (comments.interactions_count > 0) THEN ((sum(
              CASE
                  WHEN ((votes.vote_type)::text = 'dislike_a_lot'::text) THEN 1
                  ELSE 0
              END))::numeric / (comments.interactions_count)::numeric)
              ELSE (0)::numeric
          END)::numeric(5,4) AS dislike_a_lot_percent,
      (
          CASE
              WHEN (comments.interactions_count > 0) THEN ((sum(
              CASE
                  WHEN ((votes.vote_type)::text = 'trash'::text) THEN 1
                  ELSE 0
              END))::numeric / (comments.interactions_count)::numeric)
              ELSE (0)::numeric
          END)::numeric(5,4) AS trash_percent,
      (
          CASE
              WHEN (comments.interactions_count > 0) THEN ((sum(
              CASE
                  WHEN ((votes.vote_type)::text = 'warn'::text) THEN 1
                  ELSE 0
              END))::numeric / (comments.interactions_count)::numeric)
              ELSE (0)::numeric
          END)::numeric(5,4) AS warn_percent,
      (
          CASE
              WHEN (comments.interactions_count > 0) THEN ((sum(
              CASE
                  WHEN ((votes.vote_type)::text = 'smart'::text) THEN 1
                  ELSE 0
              END))::numeric / (comments.interactions_count)::numeric)
              ELSE (0)::numeric
          END)::numeric(5,4) AS smart_percent,
      (
          CASE
              WHEN (comments.interactions_count > 0) THEN ((sum(
              CASE
                  WHEN ((votes.vote_type)::text = 'funny'::text) THEN 1
                  ELSE 0
              END))::numeric / (comments.interactions_count)::numeric)
              ELSE (0)::numeric
          END)::numeric(5,4) AS funny_percent,
      (
          CASE
              WHEN (comments.interactions_count > 0) THEN ((sum(
              CASE
                  WHEN ((votes.vote_type)::text = 'happy'::text) THEN 1
                  ELSE 0
              END))::numeric / (comments.interactions_count)::numeric)
              ELSE (0)::numeric
          END)::numeric(5,4) AS happy_percent,
      (
          CASE
              WHEN (comments.interactions_count > 0) THEN ((sum(
              CASE
                  WHEN ((votes.vote_type)::text = 'shocked'::text) THEN 1
                  ELSE 0
              END))::numeric / (comments.interactions_count)::numeric)
              ELSE (0)::numeric
          END)::numeric(5,4) AS shocked_percent,
      (
          CASE
              WHEN (comments.interactions_count > 0) THEN ((sum(
              CASE
                  WHEN ((votes.vote_type)::text = 'sad'::text) THEN 1
                  ELSE 0
              END))::numeric / (comments.interactions_count)::numeric)
              ELSE (0)::numeric
          END)::numeric(5,4) AS sad_percent,
      (
          CASE
              WHEN (comments.interactions_count > 0) THEN ((sum(
              CASE
                  WHEN ((votes.vote_type)::text = 'boring'::text) THEN 1
                  ELSE 0
              END))::numeric / (comments.interactions_count)::numeric)
              ELSE (0)::numeric
          END)::numeric(5,4) AS boring_percent,
      (
          CASE
              WHEN (comments.interactions_count > 0) THEN ((sum(
              CASE
                  WHEN ((votes.vote_type)::text = 'angry'::text) THEN 1
                  ELSE 0
              END))::numeric / (comments.interactions_count)::numeric)
              ELSE (0)::numeric
          END)::numeric(5,4) AS angry_percent,
      (
          CASE
              WHEN (comments.interactions_count > 0) THEN (((((((sum(
              CASE
                  WHEN ((votes.vote_type)::text = 'like_a_lot'::text) THEN 1
                  ELSE 0
              END))::numeric * (2)::numeric) + ((sum(
              CASE
                  WHEN ((votes.vote_type)::text = 'like'::text) THEN 1
                  ELSE 0
              END))::numeric * (1)::numeric)) + ((sum(
              CASE
                  WHEN ((votes.vote_type)::text = 'indifferent'::text) THEN 1
                  ELSE 0
              END))::numeric * (0)::numeric)) - ((sum(
              CASE
                  WHEN ((votes.vote_type)::text = 'dislike'::text) THEN 1
                  ELSE 0
              END))::numeric * 0.5)) - ((sum(
              CASE
                  WHEN ((votes.vote_type)::text = 'dislike_a_lot'::text) THEN 1
                  ELSE 0
              END))::numeric * (1)::numeric)) / ((2 * comments.interactions_count))::numeric)
              ELSE (0)::numeric
          END)::numeric(5,4) AS like_score
     FROM (comments
       LEFT JOIN votes ON ((votes.comment_id = comments.id)))
    WHERE (comments.parent_id IS NULL)
    GROUP BY comments.id;
  SQL

end
