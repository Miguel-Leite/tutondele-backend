import { randomUUID } from 'node:crypto';

import { Replace } from '@helpers/Replace';

export interface ContactsProps {
  primaryPhone            : string;
  secundaryPhone?         : string | null;
  primaryEmail            : string;
  secundaryEmail?         : string | null;
  created_at?: Date;
}

export class Contact {
  private _id: string;
  private props: ContactsProps;
  constructor(
    props: Replace<ContactsProps, { created_at?: Date }>,
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

  public set primaryPhone(primaryPhone: string) {
    this.props.primaryPhone = primaryPhone;
  }

  public get primaryPhone(): string {
    return this.props.primaryPhone;
  }

  public set secundaryPhone(secundaryPhone: string | null | undefined) {
    this.props.secundaryPhone = secundaryPhone;
  }

  public get secundaryPhone(): string | null | undefined {
    return this.props.secundaryPhone;
  }

  public set primaryEmail(primaryEmail: string) {
    this.props.primaryEmail = primaryEmail;
  }

  public get primaryEmail(): string {
    return this.props.primaryEmail;
  }

  public set secundaryEmail(secundaryEmail: string | null | undefined) {
    this.props.secundaryEmail = secundaryEmail;
  }

  public get secundaryEmail(): string | null | undefined {
    return this.props.secundaryEmail;
  }
}
