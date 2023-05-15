import { randomUUID } from 'node:crypto';

import { Replace } from "@helpers/Replace";

export interface ServicesProps {
  organizationsId  : string;

  name             : string;
  price            : number;
  description?     : string;
  is_active?       : boolean;
  removed?         : Date | null;

  created_at       : Date;
  updated_at       : Date;
}

export class Service {
  private _id: string;
  private props: ServicesProps;

  constructor(
    props: Replace<ServicesProps, { created_at?: Date, updated_at?: Date }>,
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

  public active() {
    this.props.is_active = true;
  }

  public disable() {
    this.props.is_active = false;
  }

  public get is_active(): boolean | undefined {
    return this.props.is_active;
  }

  public set price(price: number) {
    this.props.price = price;
  }

  public get price(): number {
    return this.props.price;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set description(description: string | undefined) {
    this.props.description = description;
  }

  public get description(): string | undefined {
    return this.props.description;
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
