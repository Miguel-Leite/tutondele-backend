import { randomUUID } from 'node:crypto';

import { Replace } from "@helpers/Replace";

export interface RoomsProps {
  organizationsId : string;
  coursesId       :string;

  number          :number;
  group           :string;
  level           :number
  period            :string;
  studentsLimit?  :number | null; 
  removed?        : Date | null;

  created_at      : Date;
  updated_at      : Date;
}

export class Room {
  private _id: string;
  private props: RoomsProps;

  constructor(
    props: Replace<RoomsProps, { created_at?: Date, updated_at?: Date }>,
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

  public set coursesId(coursesId: string) {
    this.props.coursesId = coursesId;
  }

  public get coursesId(): string {
    return this.props.coursesId;
  }

  public set number(number: number) {
    this.props.number = number;
  }

  public get number(): number {
    return this.props.number;
  }

  public set group(group: string) {
    this.props.group = group;
  }

  public get group(): string {
    return this.props.group.toUpperCase();
  }

  public set level(level: number) {
    this.props.level = level;
  }

  public get level(): number {
    return this.props.level;
  }

  public set period(period: string) {
    this.props.period = period;
  }

  public get period(): string {
    return this.props.period.toLowerCase();
  }

  public set studentsLimit(studentsLimit: number | null | undefined) {
    this.props.studentsLimit = studentsLimit;
  }

  public get studentsLimit(): number | null | undefined {
    return this.props.studentsLimit;
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
