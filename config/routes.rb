Rails.application.routes.draw do
  root 'static_pages#index'

  namespace :api do
    resources :users, only: [:create]
    resources :tasks, only: [:index, :create, :show, :update, :destroy] do
      member do
        put 'mark_complete'
        put 'mark_active'
      end
    end
  end

  # Catch-all route for unknown paths, redirect to root
  get '*path', to: redirect('/')
end

