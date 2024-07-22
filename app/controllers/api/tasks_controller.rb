module Api
  class TasksController < ApplicationController
    before_action :validate_user

    def index
      if @user
        @tasks = @user.tasks
        render json: @tasks, status: :ok
      else
        render json: { error: 'User not found' }, status: :not_found
      end
    end

    def show
      if @user
        @task = @user.tasks.find_by(id: params[:id])
        if @task
          render json: @task, status: :ok
        else
          render json: { error: 'Task not found' }, status: :not_found
        end
      else
        render json: { error: 'User not found' }, status: :not_found
      end
    end

    def create
      if @user
        @task = @user.tasks.new(task_params)
        if @task.save
          render json: @task, status: :created
        else
          render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { error: 'User not found' }, status: :not_found
      end
    end

    def update
      if @user
        @task = @user.tasks.find_by(id: params[:id])
        if @task.update(task_params)
          render json: @task, status: :ok
        else
          render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { error: 'User not found' }, status: :not_found
      end
    end

    def mark_complete
      if @user
        @task = @user.tasks.find_by(id: params[:id])
        if @task.update(completed: true)
          render json: @task, status: :ok
        else
          render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { error: 'User not found' }, status: :not_found
      end
    end

    def mark_active
      if @user
        @task = @user.tasks.find_by(id: params[:id])
        if @task.update(completed: false)
          render json: @task, status: :ok
        else
          render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { error: 'User not found' }, status: :not_found
      end
    end

    def destroy
      if @user
        @task = @user.tasks.find_by(id: params[:id])
        if @task.destroy
          head :no_content
        else
          render json: { errors: 'Task could not be deleted' }, status: :unprocessable_entity
        end
      else
        render json: { error: 'User not found' }, status: :not_found
      end
    end

    private

    def validate_user
      @user = User.find_by(id: params[:api_key])
      render json: { error: 'Invalid API key' }, status: :unauthorized unless @user
    end

    def task_params
      params.require(:task).permit(:title, :description, :completed, :content)
    end
  end
end

