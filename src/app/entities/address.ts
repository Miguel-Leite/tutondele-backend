import { randomUUID } from 'node:crypto';

import { Replace } from '@helpers/Replace';

export interface AddressesProps {
  location: string;
  created_at?: Date;
}

export class Address {
  private _id: string;
  private props: AddressesProps;
  constructor(
    props: Replace<AddressesProps, { created_at?: Date }>,
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

  public set location(location: string) {
    this.props.location = location;
  }

  public get location(): string {
    return this.props.location;
  }

  public get created_at(): Date | null | undefined {
    return this.props.created_at;
  }
}
