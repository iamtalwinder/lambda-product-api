import { injectable } from 'inversify';
import { CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import environment from '../environment';

export interface LoginSuccessResponse {
  idToken: string;
  accessToken: string;
  refreshToken: string;
}
export interface IAuthService {
  signUp(email: string, password: string): Promise<any>;
  login(email: string, password: string): Promise<LoginSuccessResponse>;
}

@injectable()
export class AuthService implements IAuthService {
  private userPoolId: string = environment.userPoolId;
  private userPoolClientId: string = environment.userPoolClientId;

  private userPool: CognitoUserPool;

  constructor() {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.userPoolId,
      ClientId: this.userPoolClientId,
    });
  }

  async login(email: string, password: string): Promise<LoginSuccessResponse> {
    const params = {
      AuthFlow: 'ADMIN_NO_SRP_AUTH',
      UserPoolId: this.userPoolId,
      ClientId: this.userPoolClientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    };

    const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();
    const authResponse = await cognitoIdentityServiceProvider.adminInitiateAuth(params).promise();

    const session = authResponse.AuthenticationResult;

    return {
      idToken: session?.IdToken || '',
      accessToken: session?.AccessToken || '',
      refreshToken: session?.RefreshToken || '',
    };
  }

  async signUp(email: string, password: string): Promise<any> {
    /**
     * Additional attributes can be added here
     * For Example:
     *
     * const usernameAttribute = new CognitoUserAttribute({
     *  Name: 'username',
     *  Value: 'test123'
     * });
     *
     * attributeList.push(usernameAttribute);
     */
    const attributeList: CognitoUserAttribute[] = [];

    return new Promise((resolve, reject) => {
      this.userPool.signUp(email, password, [], attributeList, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}
