# Practical 4: Jenkins Server Setup & Basic CI/CD Pipeline

**Student:** Tshering Tenzin  
**Student ID:** 02250376  
**Date:** 2026-05-16  
**Module:** DSO101 – DevOps

## Objective
Set up a Jenkins server using Docker and create a basic CI/CD pipeline that pulls from a Git repository (or simulates checkout) and runs build/test/deploy stages.

## Tools Used
- Docker Desktop
- Jenkins LTS (jenkins/jenkins:lts)
- Git (for version control)

## Step 1: Run Jenkins in Docker

```bash
docker volume create jenkins-data
docker run -d --name jenkins -p 8080:8080 -p 50000:50000 -v jenkins-data:/var/jenkins_home jenkins/jenkins:lts
```

## Step 2: Initial Setup
Retrieve the initial admin password:

bash
```
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```
Access Jenkins at http://localhost:8080, install suggested plugins, create admin user.

## Step 3: Create a Pipeline Job
New Item → "Basic-Pipeline" → Pipeline

In Pipeline section, choose "Pipeline script"

Paste the Declarative Pipeline:
```
groovy
pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                echo 'Simulating checkout...'
                sh 'echo "Checking out code..."'
            }
        }
        stage('Build') {
            steps {
                echo 'Building application...'
                sh 'echo "Build step executed"'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'echo "Tests passed"'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                sh 'echo "Deployment simulated"'
            }
        }
    }
}
```
Save.

## Step 4: Run the Pipeline

Click Build Now. Console output shows successful execution:

text
```
Started
[Pipeline] stage
[Pipeline] { (Checkout)
[Pipeline] echo
Simulating checkout...
[Pipeline] sh
+ echo "Checking out code..."
Checking out code...
[Pipeline] }
[Pipeline] stage
[Pipeline] { (Build)
...
[Pipeline] End of Pipeline
Finished: SUCCESS
```

## Configuration Requirements Met
Jenkins server running in Docker with persistent volume

Pipeline job created

Pipeline has multiple stages (Checkout, Build, Test, Deploy)

Pipeline executes successfully

Console output visible