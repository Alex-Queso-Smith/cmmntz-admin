Rails.application.routes.draw do
  resources :customers, only: [:create, :update]
  resources :customers, path: 'members', as: :members
  resources :galleries
  resources :arts, only: [:index, :show, :edit, :update]
  resources :customer_sessions, only: [:new, :create, :destroy]
  resources :signups, only: [:new, :create]
  resources :comments, only: [:destroy]

  namespace :api do
    namespace :v1 do
      resources :galleries, only: [:show, :update]
      resources :arts, only: [:show]
      resources :comments, only: [:destroy]
    end
  end



  ### named routes be here
  get 'login' => "customer_sessions#new",      as: :login
  get 'logout' => "customer_sessions#destroy", as: :logout
  get 'signup' => "signups#new",           :as => :signup

  root :to => 'customers#index'
end
