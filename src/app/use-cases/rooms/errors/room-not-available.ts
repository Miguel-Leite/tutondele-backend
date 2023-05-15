export class RoomNotAvailable extends Error {
  constructor () {
    super('Room not available');
  }
}
