Rails.application.routes.draw do
  root 'static_pages#index'
  
  namespace :api do
    resources :users, only: [:create]
    resources :tasks, only: [:index, :show, :create, :update, :destroy] do
      member do
        put 'mark_complete'
        put 'mark_active'
      end
    end
  end
end

