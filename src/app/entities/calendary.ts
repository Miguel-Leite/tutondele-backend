import { randomUUID } from 'node:crypto';

import { Replace } from "@helpers/Replace";

export interface CalendarysProps {
  organizationsId  : string;

  date_start       : Date;
  date_end         : Date;
  is_active?       : boolean;
  removed?         : Date | null;

  created_at       : Date;
  updated_at       : Date;
}

export class Calendary {
  private _id: string;
  private props: CalendarysProps;

  constructor(
    props: Replace<CalendarysProps, { created_at?: Date, updated_at?: Date }>,
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

  public set date_start(date_start: Date) {
    this.props.date_start = date_start;
  }

  public get date_start(): Date {
    return this.props.date_start;
  }

  public set date_end(date_end: Date) {
    this.props.date_end = date_end;
  }

  public get date_end(): Date {
    return this.props.date_end;
  }

  public active() {
    this.props.is_active = true;
  }

  public disable() {
    this.props.is_active = false;
  }

  public get is_active(): boolean | undefined {
    return this.props.is_active;
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
