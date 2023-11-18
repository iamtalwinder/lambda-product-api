import { injectable } from 'inversify';
import { CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import environment from '../environment';

export interface IAuthService {
  signUp(email: string, password: string): Promise<any>;
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
