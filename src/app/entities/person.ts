import { randomUUID } from 'node:crypto';

import { Replace } from '@helpers/Replace';
import { Bi } from './bi';

export interface PersonProps {
  addressesId?: string | null;
  avatarsId?: string | null;
  firstName: string;
  lastName: string;
  bi?: string | null;
  removed?: Date | null;
  phone?: string | null;
  email?: string | null;
  created_at: Date | string;
  updated_at: Date | string;
}

export class Person {
  private _id: string;
  private props: PersonProps;
  constructor(
    props: Replace<
      PersonProps,
      { created_at?: Date | string; updated_at?: Date | string }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      created_at: props.created_at ?? new Date(),
      updated_at: props.created_at ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set addressesId(addressesId: string | null | undefined) {
    this.props.addressesId = addressesId;
  }

  public get addressesId(): string | null | undefined {
    return this.props.addressesId;
  }

  public set avatarsId(avatarsId: string | null | undefined) {
    this.props.avatarsId = avatarsId;
  }

  public get avatarsId(): string | null | undefined {
    return this.props.avatarsId;
  }

  public set firstName(firstName: string) {
    this.props.firstName = firstName;
  }

  public get firstName(): string {
    return this.props.firstName;
  }

  public set lastName(lastName: string) {
    this.props.lastName = lastName;
  }

  public get lastName(): string {
    return this.props.lastName;
  }

  public set bi(bi: string | null | undefined) {
    this.props.bi = bi;
  }

  public get bi(): string | null | undefined {
    return this.props.bi;
  }

  public set removed(removed: Date | null | undefined) {
    this.removed = removed;
  }

  public get removed(): Date | null | undefined {
    return this.props.removed;
  }

  public set phone(phone: string | null | undefined) {
    this.props.phone = phone;
  }

  public get phone(): string | null | undefined {
    return this.props.phone;
  }

  public set email(email: string | null | undefined) {
    this.props.email = email;
  }

  public get email(): string | null | undefined {
    return this.props.email;
  }

  public get created_at(): Date | string {
    return this.props.created_at;
  }

  public get updated_at(): Date | string {
    return this.props.created_at;
  }
}
