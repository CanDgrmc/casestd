export class ControllerBase<T> {
  service: T;
  constructor(service: T) {
    this.service = service;
  }
}
