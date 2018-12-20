Rails.application.routes.draw do
  resources :customers, only: [:create, :update]
  resources :customers, path: 'members', as: :members
  resources :galleries
  resources :arts, only: [:index, :show, :edit, :update]
  resources :customer_sessions, only: [:new, :create, :destroy]
  resources :signups, only: [:new, :create]
  resources :comments, only: [:update]
  resources :gallery_blacklistings, only: [:index]

  namespace :api do
    namespace :v1 do
      resources :galleries, only: [:show, :update]
      resources :customers, only: [:index, :create, :edit, :update]
      resources :gallery_artists, only: [:edit, :update]
      resources :arts, only: [:show] do
        resources :mass_manage_comments, only: [:create]
      end
      resources :comments, only: [:update]
      resources :gallery_blacklistings, only: [:index, :create]
      resources :gallery_unblacklistings, only: [:create]
      resources :user_gallery_moderators, only: [:index, :create, :destroy]
    end
  end



  ### named routes be here
  get 'login' => "customer_sessions#new",      as: :login
  get 'logout' => "customer_sessions#destroy", as: :logout
  get 'signup' => "signups#new",           :as => :signup

  root :to => 'customers#index'
end
