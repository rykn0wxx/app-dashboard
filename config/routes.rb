Rails.application.routes.draw do
  get 'landing' => 'page#landing', :as => 'landing'
  get 'theme' => 'page#theme', :as => 'theme'
  root :to => 'page#landing'
end
