module Api
  class TasksController < ApplicationController
    before_action :authenticate_user!

    def index
      @tasks = current_user.tasks
      render json: @tasks, status: :ok
    end

    def show
      @task = current_user.tasks.find(params[:id])
      render json: @task, status: :ok
    end

    def create
      @task = current_user.tasks.build(task_params)
      if @task.save
        render json: @task, status: :created
      else
        render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      @task = current_user.tasks.find(params[:id])
      if @task.update(task_params)
        render json: @task, status: :ok
      else
        render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      @task = current_user.tasks.find(params[:id])
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

