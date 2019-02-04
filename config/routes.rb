Rails.application.routes.draw do
  resources :customers, only: [:create, :update]
  resources :customers, path: 'members', as: :members
  resources :galleries
  resources :arts, only: [:index, :show, :edit, :update]
  resources :arts, only: [:index, :show, :edit, :update], path: 'threads', as: :threads
  resources :customer_sessions, only: [:new, :create, :destroy]
  resources :signups, only: [:new, :create]
  resources :comments, only: [:update]
  resources :gallery_blacklistings, only: [:index]
  resources :gallery_artists, only: [:edit]
  resources :users, only: [:index]
  resources :dashboard, :moderation, :settings, :help, only: [:index]

  namespace :help do
    resources :embed, :moderation, :faq, only: [:index]
    namespace :embed do
      resources :wordpress, :universal, only: [:index]
    end
  end

  namespace :settings do
    resources :site, :moderation, :threads, :members, only: [:index]
  end

  namespace :moderation do
    resources :comments, :moderators, only: [:index]
  end

  namespace :api do
    namespace :v1 do
      resources :customer_sessions, only: [:create]
      resources :galleries, only: [:show, :update]
      resources :customers, only: [:index, :show, :create, :update]
      resources :gallery_artists, only: [:show, :update]
      resources :comments, only: [:index]
      resources :arts, only: [:index, :show, :update] do
        resources :comments, only: [:index]
        resources :mass_manage_comments, only: [:create]
      end
      resources :comments, only: [:update]
      resources :gallery_blacklistings, only: [:index, :create]
      resources :gallery_unblacklistings, only: [:create]
      resources :user_gallery_moderators, only: [:index, :create]
      resources :remove_user_gallery_moderators, only: [:create]
      resources :user_searches, only: [:create]
      resources :signups, only: [:create]
      resources :dashboards, only: [:index]
    end
  end



  ### named routes be here
  get 'login' => "customer_sessions#new",      as: :login
  get 'logout' => "customer_sessions#destroy", as: :logout
  get 'signup' => "signups#new",           :as => :signup
  get 'embed' => 'static_pages#embed'
  get 'faq' => 'static_pages#faq'

  root :to => 'dashboard#index'
end
