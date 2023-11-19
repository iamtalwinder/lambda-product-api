# Node.js TypeScript AWS Lambda Product API

## Description

This project is a serverless application built using Node.js and TypeScript, designed to provide a robust and scalable Product API. The application is deployed on AWS using the Serverless Application Model (SAM) and leverages AWS Lambda for backend logic execution. It's an ideal template for those looking to build a serverless API with Node.js and TypeScript on AWS.

### Key Features:

- **AWS Lambda Functions**: Utilizes serverless architecture for handling various product-related operations.
- **DynamoDB Integration**: Uses AWS DynamoDB for efficient and scalable storage of product data.
- **Authentication with AWS Cognito**: Ensures secure access to the API with user authentication handled by AWS Cognito.
- **Dependency Injection**: Implements dependency injection using Inversify, promoting a modular and testable codebase.
- **Input Validation**: Leverages `class-validator` for robust input validation, ensuring the integrity and correctness of the API requests.

## Technology Stack

- **Node.js & TypeScript**: Combines the runtime efficiency of Node.js with the type safety of TypeScript.
- **AWS SAM**: Employs AWS Serverless Application Model for infrastructure as code, simplifying deployment and management.
- **AWS Lambda**: Utilizes Lambda functions for scalable, event-driven architecture.
- **AWS DynamoDB**: Leverages DynamoDB for a fast and flexible NoSQL database service.
- **AWS Cognito**: Integrates Cognito for secure and scalable user authentication.
- **Inversify**: Implements Inversify for dependency injection, enhancing the maintainability of the application.
- **Class-validator**: Utilizes class-validator for validating data transfer objects (DTOs) to ensure robust and secure input validation.

## Getting Started

To get started with this project, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/iamtalwinder/lambda-product-api.git
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Configure AWS Credentials**
   - Ensure you have the AWS CLI installed and configured with your AWS credentials.

4. **Configure SAM CLI**
   - Install and configure SAM CLI.

5. **Deploy the Application**
   - Use AWS SAM to deploy the application to your AWS account.
   - For detailed instructions, refer to the `deployment.md` file.


## Contributing

Contributions are welcome! Please read the `CONTRIBUTING.md` for guidelines on how to submit contributions to this project.

## License

This project is licensed under the [MIT License](LICENSE).
