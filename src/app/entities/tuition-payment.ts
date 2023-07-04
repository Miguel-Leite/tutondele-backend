import { Status } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import { Replace } from '@helpers/Replace';

export interface TuitionPaymentProps {
  organizationsId: string;
  studentsId: string;
  servicesMonthlysId: string;

  value: number;
  month: number;
  status: Status | null;

  removed?: Date | null;

  created_at: Date;
  updated_at: Date;
}

export class TuitionPayment {
  private _id: string;
  private props: TuitionPaymentProps;

  constructor(
    props: Replace<
      TuitionPaymentProps,
      { created_at?: Date; updated_at?: Date }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      status: 'PENDING',
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

  public set value(value: number) {
    this.props.value = value;
  }

  public get value(): number {
    return this.props.value;
  }

  public set month(month: number) {
    this.props.month = month;
  }

  public get month(): number {
    return this.props.month;
  }

  public set status(status: Status) {
    this.props.status = status;
  }

  public get status(): Status {
    return this.props.status as Status;
  }

  public approved() {
    this.props.status = Status.APPROVED;
  }

  public canceled() {
    this.props.status = Status.CANCELED;
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
