import { randomUUID } from 'node:crypto';

import { Replace } from '@helpers/Replace';

export interface ServiceMonthlysProps {
  service: string;
  price: number;
  organizationsId: string;
  link?: string | null;
  fee?: boolean | null;
  removed?: Date | null;
  created_at?: Date;
}

export class ServiceMonthly {
  private _id: string;
  private props: ServiceMonthlysProps;
  constructor(
    props: Replace<ServiceMonthlysProps, { created_at?: Date }>,
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

  public set organizationsId(organizationsId: string) {
    this.props.organizationsId = organizationsId;
  }

  public get organizationsId(): string {
    return this.props.organizationsId;
  }

  public set service(service: string) {
    this.props.service = service;
  }

  public get service(): string {
    return this.props.service.toLowerCase();
  }

  public set link(link: string | null | undefined) {
    this.props.link = link;
  }

  public get link(): string | null | undefined {
    return this.props.link;
  }

  public set fee(fee: boolean | null | undefined) {
    this.props.fee = fee;
  }

  public get fee(): boolean | null | undefined {
    return this.props.fee;
  }

  public set price(price: number) {
    this.props.price = price;
  }

  public get price(): number {
    return this.props.price;
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
