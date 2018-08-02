Rails.application.routes.draw do
  namespace :admin do
      resources :dim_regions
      root to: "dim_regions#index"
    end
  devise_for :users
  get 'landing' => 'page#landing', :as => 'landing'
  get 'theme' => 'page#theme', :as => 'theme'
  root :to => 'page#landing'
end
