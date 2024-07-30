class ApplicationController < ActionController::Base
  before_action :authenticate_user, unless: :public_pages?

  private

  def authenticate_user
    token = request.headers['Authorization']

    # If not using Bearer tokens, you may need to handle tokens differently
    if token.blank?
      render json: { error: 'Token missing' }, status: :unauthorized
      return
    end

    @current_user = User.find_by(authentication_token: token)

    unless @current_user
      render json: { error: 'Not Authorized' }, status: :unauthorized
    end
  end

  def public_pages?
    # List the actions or controllers that should bypass authentication
    ['static_pages#index'].include?("#{controller_name}##{action_name}")
  end
end

