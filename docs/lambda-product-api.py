from diagrams import Diagram, Edge
from diagrams.aws.compute import Lambda
from diagrams.aws.database import Dynamodb
from diagrams.aws.security import Cognito
from diagrams.aws.network import APIGateway
from diagrams.aws.general import Users

# Create a diagram
with Diagram("Product API with authentication", show=False, outformat=["png"], filename="architecture"):
    # Define Users (Client) outside the AWS cloud
    users = Users("Client")

    # Define Cognito User Pool and User Pool Client
    user_pool = Cognito("User Pool")
    user_pool_client = Cognito("User Pool Client")

    # Define API Gateway with Cognito authorization
    api_gateway = APIGateway("LambdaProductAPI")
    api_gateway - Cognito("Cognito Authorizer")

    # Define DynamoDB table
    products_table = Dynamodb("ProductsTable")

    # Define Lambda functions
    login_function = Lambda("LoginFunction")
    signup_function = Lambda("SignupFunction")
    update_product_function = Lambda("UpdateProductFunction")
    create_product_function = Lambda("CreateProductFunction")
    get_products_function = Lambda("GetProductsFunction")

    # Connect Users (Client) to API Gateway
    users >> api_gateway
    
    # Connect Lambda functions to API Gateway
    api_gateway >> Edge(label="POST /login") >> login_function
    api_gateway >> Edge(label="POST /signup") >> signup_function
    api_gateway >> Edge(label="PUT /product/{id}", color="blue") >> update_product_function
    api_gateway >> Edge(label="POST /product", color="blue") >> create_product_function
    api_gateway >> Edge(label="GET /product", color="green") >> get_products_function

    # Connect Lambda functions to DynamoDB table
    update_product_function >> products_table
    create_product_function >> products_table
    get_products_function >> products_table

    # Connect Lambda functions to Cognito User Pool and User Pool Client
    login_function >> user_pool
    login_function >> user_pool_client

    signup_function >> user_pool
    signup_function >> user_pool_client

