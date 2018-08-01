Rails.application.routes.draw do
  get 'landing' => 'page#landing', :as => 'landing'
  root :to => 'page#landing'
end
