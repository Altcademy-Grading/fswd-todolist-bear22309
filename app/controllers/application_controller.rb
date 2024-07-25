class ApplicationController < ActionController::Base
  before_action :authenticate_user, unless: :public_pages?

  private

  def authenticate_user
    token = request.headers['Authorization']

    # Ensure the token is present
    if token.blank?
      render json: { error: 'Token missing' }, status: :unauthorized
      return
    end

    @current_user = User.find_by(authentication_token: token)

    # Check if the user was found
    unless @current_user
      render json: { error: 'Not Authorized' }, status: :unauthorized
    end
  end

  def public_pages?
    # Adjust this method based on which actions or controllers you want to bypass authentication
    ['static_pages#index'].include?("#{controller_name}##{action_name}")
  end
end

