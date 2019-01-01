import { ControllerBase, controller, get, post } from 'ts-api';

import { IUser, IListQuery } from 'user.d.ts';

@controller('/user')
export class AccountFoo extends ControllerBase {

    @get('/')
    async listAccounts(userId: string, query: IListQuery): Promise<IUser[]> {
        return [{ id: userId, name: 'foo' }];
    }

    @get('/:userId')
    async getAccount(userId: string): Promise<IUser> {
        return { id: userId, name: 'foo' };
    }

    @post('/')
    async createAccount(newAccountBody: IUser): Promise<IUser> {
        return newAccountBody;
    }
}
