import { randomUUID } from 'node:crypto';

import { Replace } from "@helpers/Replace";

export interface StudentsProps {
  organizationsId  : string;

  personsId        : string;
  usersId?         : string | null;
  roomsId          : string;
  removed?         : Date | null;

  created_at       : Date;
  updated_at       : Date;
}

export class Student {
  private _id: string;
  private props: StudentsProps;

  constructor(
    props: Replace<StudentsProps, { created_at?: Date, updated_at?: Date }>,
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

  public set organizationsId(organizationsId: string) {
    this.props.organizationsId = organizationsId;
  }

  public get organizationsId(): string {
    return this.props.organizationsId;
  }

  public set personsId(personsId: string) {
    this.props.personsId = personsId;
  }

  public get personsId(): string {
    return this.props.personsId;
  }

  public set usersId(usersId: string | null | undefined) {
    this.props.usersId = usersId;
  }

  public get usersId(): string | null | undefined {
    return this.props.usersId;
  }

  public set roomsId(roomsId: string) {
    this.props.roomsId = roomsId;
  }

  public get roomsId(): string {
    return this.props.roomsId;
  }

  public retrieve() {
    this.props.removed = null;
  }

  public remove() {
    this.props.removed = new Date();
  }

  public get removed(): Date | null | undefined {
    return this.props.removed;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }

  public get updated_at(): Date {
    return this.props.updated_at;
  }
}
