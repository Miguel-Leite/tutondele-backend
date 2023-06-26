import { randomUUID } from 'node:crypto';

import { Replace } from '@helpers/Replace';

export interface PaymentsProps {
  paymentsId: string;
  organizationsId: string;
  value: number;
  removed?: Date | null;
  created_at?: Date;
}

export class Payment {
  private _id: string;
  private props: PaymentsProps;
  constructor(
    props: Replace<PaymentsProps, { created_at?: Date }>,
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

  public set paymentsId(paymentsId: string) {
    this.props.paymentsId = paymentsId;
  }

  public get paymentsId(): string {
    return this.props.paymentsId;
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
