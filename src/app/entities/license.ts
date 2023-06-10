import { randomUUID } from 'node:crypto';

import { Replace } from '@helpers/Replace';

export interface LicensesProps {
  code: string;
  packagesId: string;

  startDate: Date;
  endDate: Date;
  removed?: Date | null;

  created_at: Date;
  updated_at: Date;
}

export class License {
  private _id: string;
  private props: LicensesProps;

  constructor(
    props: Replace<LicensesProps, { created_at?: Date; updated_at?: Date }>,
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

  public set packagesId(packagesId: string) {
    this.props.packagesId = packagesId;
  }

  public get packagesId(): string {
    return this.props.packagesId;
  }

  public set code(code: string) {
    this.code = code;
  }

  public get code(): string {
    return this.props.code;
  }

  public set startDate(startDate: Date) {
    this.props.startDate = startDate;
  }

  public get startDate(): Date {
    return this.props.startDate;
  }

  public set endDate(endDate: Date) {
    this.props.endDate = endDate;
  }

  public get endDate(): Date {
    return this.props.endDate;
  }

  public remove() {
    this.props.removed = new Date();
  }

  public get removed(): Date | null | undefined {
    return this.props.removed;
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private generateCode(): number {
    return this.getRandomNumber(10000, 99999);
  }

  public get created_at(): Date {
    return this.props.created_at;
  }

  public get updated_at(): Date {
    return this.props.updated_at;
  }
}
