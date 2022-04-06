import axios from 'axios';
import IVehicleApiResponse from '../../interfaces/IVehicleApiResponse';

/** The initial path of all API calls. */
const VPIC_API_URI = 'https://vpic.nhtsa.dot.gov/api/vehicles/';
/** The response format requested in all API calls. */
const RESPONSE_FORMAT = 'json';

/** A service used to interface with the vPIC API. */
const VehicleApiService = {
  /**
   * Decodes the given VIN using the vPIC API.
   * @param vin The VIN to decode.
   * @returns A promise of decoded vehicle attributes.
   */
  decodeVin: function (vin: string) {
    const uri = `${VPIC_API_URI}/decodevinvaluesextended/${vin}?format=${RESPONSE_FORMAT}`;
    return axios.get<IVehicleApiResponse<any>>(uri);
  },
};

export default VehicleApiService;
