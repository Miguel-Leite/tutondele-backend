import { randomUUID } from 'node:crypto';

import { Replace } from "@helpers/Replace";

export interface DocumentsProps {
  organizationsId  : string;

  url              : string;
  filename         : string;
  mimetype         : string;
  encoding         : string;
  removed?         : Date | null;

  created_at       : Date;
  updated_at       : Date;
}

export class Document {
  private _id: string;
  private props: DocumentsProps;

  constructor(
    props: Replace<DocumentsProps, { created_at?: Date, updated_at?: Date }>,
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

  public set url(url: string) {
    this.props.url = url;
  }

  public get url(): string {
    return this.props.url;
  }

  public set filename(filename: string) {
    this.props.filename = filename;
  }

  public get filename(): string {
    return this.props.filename;
  }

  public set mimetype(mimetype: string) {
    this.props.mimetype = mimetype;
  }

  public get mimetype(): string {
    return this.props.mimetype;
  }

  public set encoding(encoding: string) {
    this.props.encoding = encoding;
  }

  public get encoding(): string {
    return this.props.encoding;
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
