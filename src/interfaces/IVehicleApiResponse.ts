/** Specifies a response from the vPIC API. */
export default interface IVehicleApiResponse<T> {
  Count: number;
  Message: string;
  SearchCriteria: string | null;
  Results: T[];
}

/** Specifies a decoded vehicle attribute. */
export interface IVehicleAttribute {
  VariableId: number; //->IAttributeMetadata.ID
  Variable: string;
  ValueId: string | null;
  Value: string | null;
}
