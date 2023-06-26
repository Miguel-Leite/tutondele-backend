import { randomUUID } from 'node:crypto';

import { Replace } from '@helpers/Replace';
import { Status } from '@prisma/client';

export interface PaymentServicesProps {
  studentsId: string;
  servicesId: string;
  organizationsId: string;
  value: number;
  status: Status | null;
  removed?: Date | null;
  created_at?: Date;
}

export class PaymentService {
  private _id: string;
  private props: PaymentServicesProps;
  constructor(
    props: Replace<PaymentServicesProps, { created_at?: Date }>,
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

  public set servicesId(servicesId: string) {
    this.props.servicesId = servicesId;
  }

  public get servicesId(): string {
    return this.props.servicesId;
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
