export class RoomAlreadyExists extends Error {
  constructor () {
    super('Room already exists');
  }
}
