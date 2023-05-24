import { Injectable } from "@nestjs/common";

import { Student } from "@app/entities/student";

import { StudentRepository } from "@app/repositories/student-repository";

import { StudentNotFound } from "./errors/student-not-found";
import { LicenseRepository } from "@app/repositories/license-repository";
import { OrganizationRepository } from "@app/repositories/organization-repository";
import { PackageRepository } from "@app/repositories/package-repository";

import { LicenseNotFound } from "../licenses/errors/license-not-found";
import { PackageNotFound } from "../packages/errors/package-not-found";
import { OrganizationNotFound } from "../organizations/errors/organization-not-found";
import { StudentLimitReached } from "./errors/student-limit-reached";

interface RecoveryStudentResponse {
  student: Student;
}

@Injectable()
export class RecoveryStudent {
  constructor(
    private studentRepository: StudentRepository,
    private licenseRepositoty: LicenseRepository,
    private organizationRepository: OrganizationRepository,
    private packageRepository: PackageRepository,
  ) {}

  async execute(id: string): Promise<RecoveryStudentResponse> {

    const student = await this.studentRepository.findById(id);
    
    if (!student) {
      throw new StudentNotFound();
    }

    const organization = await this.organizationRepository.findById(student.organizationsId);

    if (!organization) {
      throw new OrganizationNotFound();
    }

    const license = await this.licenseRepositoty.findById(organization.licensesId);

    if (!license) {
      throw new LicenseNotFound();
    }

    const packag = await this.packageRepository.totalStudents(license.packagesId);

    if (!packag) {
      throw new PackageNotFound();
    }

    const students = await this.studentRepository.findAll(organization.id);
    
    if (students.length >= packag) {
      throw new StudentLimitReached()
    }

    student.recovery();

    await this.studentRepository.save(student)
    
    return {
      student,
    }
  }
}
