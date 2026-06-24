pipeline {
    agent any

    // Lecture 12: build is kicked off automatically by a GitHub webhook on push.
    triggers {
        githubPush()
    }

    environment {
        APP_NAME   = 'aman-cicd-app'
        IMAGE_NAME = 'aman-cicd-app'
        // 'dockerhub' = Username/Password credential added in Jenkins.
        // Exposes DOCKERHUB_USR and DOCKERHUB_PSW to the pipeline.
        DOCKERHUB  = credentials('dockerhub')
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
        stage('Docker Build') {
            steps {
                echo "Building image ${DOCKERHUB_USR}/${IMAGE_NAME}..."
                sh 'docker build -t $DOCKERHUB_USR/$IMAGE_NAME:$BUILD_NUMBER -t $DOCKERHUB_USR/$IMAGE_NAME:latest .'
            }
        }
        stage('Docker Push') {
            steps {
                echo 'Logging in and pushing image to Docker Hub...'
                sh 'echo "$DOCKERHUB_PSW" | docker login -u "$DOCKERHUB_USR" --password-stdin'
                sh 'docker push $DOCKERHUB_USR/$IMAGE_NAME:$BUILD_NUMBER'
                sh 'docker push $DOCKERHUB_USR/$IMAGE_NAME:latest'
            }
        }
        stage('Deploy') {
            steps {
                echo "Deploying ${env.APP_NAME}..."
                sh 'docker images | grep $IMAGE_NAME || true'
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
        always {
            sh 'docker logout || true'
        }
        success {
            echo "SUCCESS: ${env.APP_NAME} image pushed to Docker Hub as ${DOCKERHUB_USR}/${IMAGE_NAME}."
        }
        failure {
            echo "FAILURE: ${env.APP_NAME} pipeline failed - check the logs above."
        }
    }
}
