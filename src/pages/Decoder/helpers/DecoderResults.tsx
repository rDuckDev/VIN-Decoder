import _ from 'lodash';
import {
  IDecoderAttribute,
  IDecoderResults,
} from '../../../interfaces/IVehicleApiResponse';

const ATTRIBUTE_MAP = Object.freeze({
  other_battery_info: 1,
  battery_type: 2,
  bed_type: 3,
  cab_type: 4,
  body_class: 5,
  engine_number_of_cylinders: 9,
  destination_market: 10,
  displacement_cc: 11,
  displacement_ci: 12,
  displacement_l: 13,
  doors: 14,
  drive_type: 15,
  engine_stroke_cycles: 17,
  engine_model: 18,
  engine_power_k_w: 21,
  entertainment_system: 23,
  fuel_type_primary: 24,
  gross_vehicle_weight_rating_from: 25,
  make: 26,
  manufacturer_name: 27,
  model: 28,
  model_year: 29,
  plant_city: 31,
  number_of_seats: 33,
  series: 34,
  steering_location: 36,
  transmission_style: 37,
  trim: 38,
  vehicle_type: 39,
  windows: 40,
  axles: 41,
  brake_system_type: 42,
  number_of_battery_cells_per_module: 48,
  bed_length_inches: 49,
  brake_system_description: 52,
  curb_weight_pounds: 54,
  curtain_air_bag_locations: 55,
  seat_cushion_air_bag_locations: 56,
  battery_current_amps_from: 57,
  battery_voltage_volts_from: 58,
  battery_energy_k_wh_from: 59,
  wheel_base_type: 60,
  number_of_seat_rows: 61,
  valve_train_design: 62,
  transmission_speeds: 63,
  engine_configuration: 64,
  front_air_bag_locations: 65,
  fuel_type_secondary: 66,
  fuel_delivery_fuel_injection_type: 67,
  knee_air_bag_locations: 69,
  engine_brake_hp_from: 71,
  ev_drive_unit: 72,
  plant_country: 75,
  plant_company_name: 76,
  plant_state: 77,
  pretensioner: 78,
  seat_belt_type: 79,
  adaptive_cruise_control_acc: 81,
  anti_lock_braking_system_abs: 86,
  crash_imminent_braking_cib: 87,
  blind_spot_warning_bsw: 88,
  ncsa_body_type: 96,
  ncsa_make: 97,
  ncsa_model: 98,
  electronic_stability_control_esc: 99,
  traction_control: 100,
  forward_collision_warning_fcw: 101,
  lane_departure_warning_ldw: 102,
  lane_keeping_assistance_lka: 103,
  backup_camera: 104,
  parking_assist: 105,
  side_air_bag_locations: 107,
  trim_2: 109,
  series_2: 110,
  wheel_base_inches_from: 111,
  wheel_base_inches_to: 112,
  note: 114,
  number_of_wheels: 115,
  trailer_type_connection: 116,
  trailer_body_type: 117,
  trailer_length_feet: 118,
  wheel_size_front_inches: 119,
  wheel_size_rear_inches: 120,
  other_restraint_system_info: 121,
  cooling_type: 122,
  engine_brake_hp_to: 125,
  electrification_level: 126,
  charger_level: 127,
  charger_power_k_w: 128,
  other_engine_info: 129,
  battery_current_amps_to: 132,
  battery_voltage_volts_to: 133,
  battery_energy_k_wh_to: 134,
  turbo: 135,
  base_price: 136,
  number_of_battery_modules_per_pack: 137,
  number_of_battery_packs_per_vehicle: 138,
  top_speed_mph: 139,
  suggested_vin: 142,
  error_code: 143,
  possible_values: 144,
  axle_configuration: 145,
  engine_manufacturer: 146,
  bus_length_feet: 147,
  bus_floor_configuration_type: 148,
  bus_type: 149,
  other_bus_info: 150,
  custom_motorcycle_type: 151,
  motorcycle_suspension_type: 152,
  motorcycle_chassis_type: 153,
  other_motorcycle_info: 154,
  other_trailer_info: 155,
  additional_error_text: 156,
  track_width_inches: 159,
  tire_pressure_monitoring_system_tpms_type: 168,
  active_safety_system_note: 169,
  dynamic_brake_support_dbs: 170,
  pedestrian_automatic_emergency_braking_paeb: 171,
  auto_reverse_system_for_windows_and_sunroofs: 172,
  automatic_pedestrian_alerting_sound_for_hybrid_and_ev_only: 173,
  automatic_crash_notification_acn_advanced_automatic_crash_notification_aacn: 174,
  event_data_recorder_edr: 175,
  keyless_ignition: 176,
  daytime_running_light_drl: 177,
  headlamp_light_source: 178,
  semiautomatic_headlamp_beam_switching: 179,
  adaptive_driving_beam_adb: 180,
  sae_automation_level_from: 181,
  sae_automation_level_to: 182,
  rear_cross_traffic_alert: 183,
  gross_combination_weight_rating_from: 184,
  gross_combination_weight_rating_to: 185,
  ncsa_note: 186,
  gross_vehicle_weight_rating_to: 190,
  error_text: 191,
  rear_automatic_emergency_braking: 192,
  blind_spot_intervention_bsi: 193,
  lane_centering_assistance: 194,
  non_land_use: 195,
});

class DecoderResults {
  private static attributeMap = ATTRIBUTE_MAP;
  private vehicle: IDecoderResults | undefined;
  private attributes: IDecoderAttribute[];

  constructor(attributes: IDecoderAttribute[]) {
    this.vehicle = this.transformAttributes(attributes) || undefined;
    this.attributes = attributes || [];
  }

  /**
   * Optimizes access to the decoded vehicle attributes by transforming
   * the decoded results array into a dictionary of attributes by ID.
   */
  private transformAttributes(attributes: IDecoderAttribute[]) {
    return _.transform(
      attributes,
      (memo: IDecoderResults, attribute) => {
        memo[attribute.VariableId] = {
          attribute: attribute,
        };
      },
      {}
    );
  }

  /** Returns an object mapping each attribute name to its ID. */
  public static getAttributeMap() {
    return this.attributeMap;
  }

  /** Returns all decoded attributes. */
  public getAttributes() {
    return this.attributes;
  }

  /** Returns a decoded attribute, given its attribute ID. */
  public getAttribute(attributeId: number): IDecoderAttribute | undefined {
    return _.get(this.vehicle, [attributeId, 'attribute'], undefined);
  }

  /** Returns the value of a decoded attribute, given its attribute ID. */
  public getAttributeValue(attributeId: number): string | null | undefined {
    return _.get(this.vehicle, [attributeId, 'attribute', 'Value'], undefined);
  }
}

export default DecoderResults;
