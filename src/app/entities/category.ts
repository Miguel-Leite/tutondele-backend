import { randomUUID } from 'node:crypto';

import { Replace } from '@helpers/Replace';

export interface CategoriesProps {
  organizationsId: string;

  name: string;
  description?: string;
  removed?: Date | null;

  created_at: Date;
  updated_at: Date;
}

export class Category {
  private _id: string;
  private props: CategoriesProps;

  constructor(
    props: Replace<CategoriesProps, { created_at?: Date; updated_at?: Date }>,
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

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name.toLowerCase();
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
