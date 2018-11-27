Rails.application.routes.draw do
  resources :customers
  resources :galleries
  resources :customer_sessions, only: [:new, :create, :destroy]
  resources :signups, only: [:new, :create]


  ### named routes be here
  get 'login' => "customer_sessions#new",      as: :login
  get 'logout' => "customer_sessions#destroy", as: :logout
  get 'signup' => "signups#new",           :as => :signup

  root :to => 'customers#index'
end
