Rails.application.routes.draw do
  resources :customers
  resources :galleries
  resources :signups, only: [:new, :create]

  get 'signup' => "signups#new",           :as => :signup

  root :to => 'customers#index'
end
