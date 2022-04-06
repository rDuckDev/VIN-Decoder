/** Specifies a response from the vPIC API. */
export default interface IVehicleApiResponse<T> {
  Count: number;
  Message: string;
  SearchCriteria: string | null;
  Results: T[];
}

/** Specifies a decoded vehicle attribute. */
export interface IDecoderAttribute {
  VariableId: number; //->IDecoderMetadata.ID
  Variable: string;
  ValueId: string | null;
  Value: string | null;
}

export interface IDecoderResults {
  [attributeId: number | string]: {
    attribute: IDecoderAttribute;
  };
}
