export default class RepositoryBase<T> {
  model: T;
  constructor(m: T) {
    this.model = m;
  }
}
