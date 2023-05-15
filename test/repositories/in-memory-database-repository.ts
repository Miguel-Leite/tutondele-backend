import { Room } from "@app/entities/room";
import { Student } from "@app/entities/student";

export interface DatabaseProps {
  students: Student[];
  rooms: Room[];
}

export abstract class InMemoryDatabaseRepository {
  public databse: DatabaseProps = { students: [], rooms: [] };
  
  addStudent(student: Student): void {
    this.databse.students.push(student);
  }
  
  getStudents(): Student[] {
    return this.databse.students;
  }
  
  addRoom(room: Room): void {
    this.databse.rooms.push(room);
  }
  
  getRooms(): Room[] {
    return this.databse.rooms;
  }
}
