import { randomUUID } from 'node:crypto';

import { Replace } from "@helpers/Replace";
import { Instruction } from '@prisma/client';

export interface OrganizationProps {
  packagesId              : string;
  logosId?                : string | null;
  addressesId             : string;
  contactsId              : string;
  calendarysId?           : string | null;

  name                    : string;
  slug                    : string;
  birth?                  : Date | null;
  instruction             : Instruction;
  about?                  : string | null;

  is_active?              : boolean;
  removed?: Date | null;

  created_at: Date;
  updated_at: Date;
}

export class Organization {
  private _id: string;
  private props: OrganizationProps;
  constructor(
    props: Replace<
      OrganizationProps,
      { created_at?: Date; updated_at?: Date }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      created_at: props.created_at ?? new Date(),
      updated_at: props.created_at ?? new Date(),
    };
  }
  
  public get id(): string {
    return this._id;
  }

  public set logosId(logosId: string | null | undefined) {
    this.props.logosId = logosId;
  }

  public get logosId(): string | null | undefined{
    return this.props.logosId;
  }

  public set packagesId(packagesId: string) {
    this.props.packagesId = packagesId;
  }

  public get packagesId(): string{
    return this.props.packagesId;
  }

  public set addressesId(addressesId: string) {
    this.props.addressesId = addressesId;
  }

  public get addressesId(): string {
    return this.props.addressesId;
  }

  public set contactsId(contactsId: string) {
    this.props.contactsId = contactsId;
  }

  public get contactsId(): string {
    return this.props.contactsId;
  }

  public set calendarysId(calendarysId: string | null | undefined) {
    this.props.calendarysId = calendarysId;
  }

  public get calendarysId(): string | null | undefined {
    return this.props.calendarysId;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set slug(slug: string) {
    this.props.slug = slug;
  }

  public get slug(): string {
    return this.props.slug;
  }

  public set birth(birth: Date | null | undefined) {
    this.props.birth = birth;
  }

  public get birth(): Date | null | undefined {
    return this.props.birth;
  }

  public set instruction(instruction: Instruction) {
    this.props.instruction = instruction;
  }

  public get instruction(): Instruction {
    return this.props.instruction;
  }

  public set about(about: string | null | undefined) {
    this.props.about = about;
  }

  public get about(): string | null | undefined {
    return this.props.about;
  }

  public get is_active(): boolean | undefined {
    return this.props.is_active;
  }

  public activate() {
    this.props.is_active = true;
  }

  public deactivate() {
    this.props.is_active = false;
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

  public get updated_at(): Date | null | undefined {
    return this.props.created_at;
  }
}
