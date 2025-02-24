export class ServiceBase<T> {
  repositories: T;
  constructor(repositories: T) {
    this.repositories = repositories;
  }
}
