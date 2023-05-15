import { randomUUID } from 'node:crypto';

import { Replace } from '@helpers/Replace';

export interface UserProps {
  personsId: string;
  username: string;
  password: string;
  level: string | null;
  verified?: boolean | null;
  acceptTermsAndConditions?: boolean | null;
  removed?: Date | null | undefined;
  created_at: Date;
  updated_at: Date;
}

export class User {
  private _id: string;
  private props: UserProps;
  constructor(
    props: Replace<UserProps, { created_at?: Date; updated_at?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      created_at: props.created_at ?? new Date(),
      updated_at: props.updated_at ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set personsId(personsId: string) {
    this.props.personsId = personsId;
  }

  public get personsId(): string {
    return this.props.personsId;
  }

  public set username(username: string) {
    this.props.username = username;
  }

  public get username(): string {
    return this.props.username;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get password(): string {
    return this.props.password;
  }

  public set level(level: string | null) {
    this.props.level = level;
  }

  public get level(): string | null {
    return this.props.level;
  }

  public get verified(): boolean | null | undefined {
    return this.props.verified;
  }

  public set acceptTermsAndConditions(
    acceptTermsAndConditions: boolean | null | undefined,
  ) {
    this.props.acceptTermsAndConditions = acceptTermsAndConditions;
  }

  public get acceptTermsAndConditions(): boolean | null | undefined {
    return this.props.acceptTermsAndConditions;
  }

  public activate() {
    this.props.verified = true;
  }

  public deactivate() {
    this.props.verified = false;
  }

  public remove() {
    this.props.removed = new Date();
  }

  public get removed(): Date | null | undefined {
    return this.props.removed;
  }

  public get created_at(): Date | null | undefined {
    return this.props.created_at;
  }
}
