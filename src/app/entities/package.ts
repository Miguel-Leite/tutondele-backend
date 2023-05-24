import { randomUUID } from 'node:crypto';

import { Replace } from "@helpers/Replace";

export interface PackagesProps {
  name               : string;
  price              : number;
  students           : number;

  admins             : number;
  users              : number;

  services           : number;

  removed?           : Date;

  notification_email : boolean
  notification_sms   : boolean

  manual_payment     : boolean
  realtime_payment   : boolean

  security           : boolean;

  created_at         : Date;
  updated_at         : Date;
} 

export class Package {
  private _id: string;
  private props: PackagesProps;
  
  constructor(
    props: Replace<PackagesProps, { created_at?: Date, updated_at?: Date }>,
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
  
  public set name(name: string) {
    this.props.name = name.toLowerCase();
  }

  public get name(): string {
    return this.props.name;
  }

  public set price(price: number) {
    this.props.price = price;
  }

  public get price(): number {
    return this.props.price;
  }

  public set students(students: number) {
    this.props.students = students;
  }

  public get students(): number {
    return this.props.students;
  }

  public set users(users: number) {
    this.props.users = users;
  }

  public get users(): number {
    return this.props.users;
  }

  public set admins(admins: number) {
    this.props.admins = admins;
  }

  public get admins(): number {
    return this.props.admins;
  }

  public set services(services: number) {
    this.props.services = services;
  }

  public get services(): number {
    return this.props.services;
  }

  public set notification_email(notification_email: boolean) {
    this.props.notification_email = notification_email;
  }

  public get notification_email(): boolean {
    return this.props.notification_email;
  }

  public set notification_sms(notification_sms: boolean) {
    this.props.notification_sms = notification_sms;
  }

  public get notification_sms(): boolean {
    return this.props.notification_sms;
  }

  public set manual_payment(manual_payment: boolean) {
    this.props.manual_payment = manual_payment;
  }

  public get manual_payment(): boolean {
    return this.props.manual_payment;
  }

  public set realtime_payment(realtime_payment: boolean) {
    this.props.realtime_payment = realtime_payment;
  }

  public get realtime_payment(): boolean {
    return this.props.realtime_payment;
  }

  public set security(security: boolean) {
    this.props.security = security;
  }

  public get security(): boolean {
    return this.props.security;
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
