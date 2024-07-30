module Api
  class TasksController < ApplicationController
    before_action :validate_user

    def index
      user = User.find_by(id: params[:api_key])
      @tasks = user.tasks
      render json: @tasks
    end

    def show
      user = User.find_by(id: params[:api_key])
      @task = user.tasks.find_by(id: params[:id])
      return head :not_found unless @task
      render json: @task
    end

    def create
      user = User.find_by(id: params[:api_key])
      @task = user.tasks.new(task_params)
      if @task.save
        render json: @task, status: :created
      else
        render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      user = User.find_by(id: params[:api_key])
      @task = user.tasks.find_by(id: params[:id])
      if @task.update(task_params)
        render json: @task
      else
        render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def mark_complete
      user = User.find_by(id: params[:api_key])
      @task = user.tasks.find_by(id: params[:id])
      if @task.update(completed: true)
        render json: @task
      else
        render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def mark_active
      user = User.find_by(id: params[:api_key])
      @task = user.tasks.find_by(id: params[:id])
      if @task.update(completed: false)
        render json: @task
      else
        render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      user = User.find_by(id: params[:api_key])
      @task = user.tasks.find_by(id: params[:id])
      if @task.destroy
        head :no_content
      else
        render json: { errors: 'Task could not be deleted' }, status: :unprocessable_entity
      end
    end

    private

    def task_params
      params.require(:task).permit(:content, :completed)
    end
  end
end

