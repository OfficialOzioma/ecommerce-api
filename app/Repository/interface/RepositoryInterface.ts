// eslint-disable-next-line prettier/prettier
export default interface RepositoryInterface {
  findAll(relation: any);
  findById(modelId: number);
  findByName(tableName: any, name: any);
  createModel(payload: Array<any>);
  updateModel(modelId: number, payload: Array<any>);
  deleteById(modelId: number);
}
