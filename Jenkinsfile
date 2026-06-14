pipeline {
    agent any

    environment {
        APP_NAME  = 'aman-cicd-app'
        IMAGE_TAG = 'aman-cicd-app:latest'
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Fetching source for ${env.APP_NAME} from GitHub..."
                checkout scm
            }
        }
        stage('Install') {
            steps {
                echo 'Installing Node.js dependencies...'
                sh 'node --version'
                sh 'npm --version'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Running unit tests...'
                sh 'npm test'
            }
        }
        stage('Build') {
            steps {
                echo "Building Docker image ${env.IMAGE_TAG}..."
                sh 'docker build -t ${IMAGE_TAG} .'
            }
        }
        stage('Deploy') {
            steps {
                echo "Deploying ${env.APP_NAME}..."
                sh 'docker images | grep aman-cicd-app || true'
                echo 'Deployment step complete.'
            }
        }
        stage('Notify') {
            steps {
                echo "Team notified: ${env.APP_NAME} pipeline finished successfully!"
            }
        }
    }

    post {
        success {
            echo "SUCCESS: ${env.APP_NAME} pipeline completed all stages."
        }
        failure {
            echo "FAILURE: ${env.APP_NAME} pipeline failed - check the logs above."
        }
    }
}
