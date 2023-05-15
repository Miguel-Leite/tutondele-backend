import { randomUUID } from 'node:crypto';

import { Replace } from '@helpers/Replace';

interface UserTokensProps {
  usersId: string;
  refresh_token: string;
  expires_date: Date;
  created_at?: Date | null;
}

export class UserTokens {
  private _id: string;
  private props: UserTokensProps;
  constructor(
    props: Replace<UserTokensProps, { created_at?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      created_at: props.created_at ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set usersId(usersId: string) {
    this.usersId = usersId;
  }

  public get usersId(): string {
    return this.usersId;
  }

  public set refresh_token(refresh_token: string) {
    this.refresh_token = refresh_token;
  }

  public get refresh_token(): string {
    return this.refresh_token;
  }

  public set expires_date(expires_date: Date) {
    this.expires_date = expires_date;
  }

  public get expires_date(): Date {
    return this.expires_date;
  }

  public get created_at(): Date | null | undefined {
    return this.created_at;
  }
}
