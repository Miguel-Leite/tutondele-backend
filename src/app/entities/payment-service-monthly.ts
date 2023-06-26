import { randomUUID } from 'node:crypto';

import { Replace } from '@helpers/Replace';
import { Status } from '@prisma/client';

export interface PaymentServiceMonthlysProps {
  studentsId: string;
  servicesMonthlysId: string;
  organizationsId: string;
  code: string;
  value: number;
  reference: string;
  iban: string;
  status: Status | null;
  account_number: string;
  removed?: Date | null;
  created_at?: Date;
}

export class PaymentServiceMonthly {
  private _id: string;
  private props: PaymentServiceMonthlysProps;
  constructor(
    props: Replace<PaymentServiceMonthlysProps, { created_at?: Date }>,
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

  public set studentsId(studentsId: string) {
    this.props.studentsId = studentsId;
  }

  public get studentsId(): string {
    return this.props.studentsId;
  }

  public set servicesMonthlysId(servicesMonthlysId: string) {
    this.props.servicesMonthlysId = servicesMonthlysId;
  }

  public get servicesMonthlysId(): string {
    return this.props.servicesMonthlysId;
  }

  public set organizationsId(organizationsId: string) {
    this.props.organizationsId = organizationsId;
  }

  public get organizationsId(): string {
    return this.props.organizationsId;
  }

  public set code(code: string) {
    this.props.code = code;
  }

  public get code(): string {
    return this.props.code.toUpperCase();
  }

  public set value(value: number) {
    this.props.value = value;
  }

  public get value(): number {
    return this.props.value;
  }

  public set reference(reference: string) {
    this.props.reference = reference;
  }

  public get reference(): string {
    return this.props.reference;
  }

  public set iban(iban: string) {
    this.props.iban = iban;
  }

  public get iban(): string {
    return this.props.iban;
  }

  public set status(status: Status) {
    this.props.status = status;
  }

  public get status(): Status {
    return this.props.status as Status;
  }

  public set account_number(account_number: string) {
    this.props.account_number = account_number;
  }

  public get account_number(): string {
    return this.props.account_number;
  }

  public approved() {
    this.props.status = Status.APPROVED;
  }

  public canceled() {
    this.props.status = Status.CANCELED;
  }

  public pending() {
    this.props.status = Status.PENDING;
  }

  public remove() {
    this.props.removed = new Date();
  }

  public get removed(): Date | null | undefined {
    return this.props.removed;
  }

  public get created_at(): Date | null | undefined {
    return this.props.created_at;
  }
}
