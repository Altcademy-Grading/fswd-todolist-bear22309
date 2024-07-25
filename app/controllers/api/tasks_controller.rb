module Api
  class TasksController < ApplicationController
    before_action :authenticate_user

    def index
      if @current_user
        @tasks = @current_user.tasks
        render json: @tasks, status: :ok
      else
        render json: { error: 'User not found' }, status: :not_found
      end
    end

    def show
      @task = @current_user.tasks.find_by(id: params[:id])
      if @task
        render json: @task, status: :ok
      else
        render json: { error: 'Task not found' }, status: :not_found
      end
    end

    def create
      @task = @current_user.tasks.new(task_params)
      if @task.save
        render json: @task, status: :created
      else
        render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      @task = @current_user.tasks.find_by(id: params[:id])
      if @task.update(task_params)
        render json: @task, status: :ok
      else
        render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def mark_complete
      @task = @current_user.tasks.find_by(id: params[:id])
      if @task.update(completed: true)
        render json: @task, status: :ok
      else
        render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def mark_active
      @task = @current_user.tasks.find_by(id: params[:id])
      if @task.update(completed: false)
        render json: @task, status: :ok
      else
        render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      @task = @current_user.tasks.find_by(id: params[:id])
      if @task.destroy
        head :no_content
      else
        render json: { errors: 'Task could not be deleted' }, status: :unprocessable_entity
      end
    end

    private

    def task_params
      params.require(:task).permit(:title, :description, :completed)
    end
  end
end

