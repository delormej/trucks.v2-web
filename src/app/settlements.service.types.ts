/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AuthenticateRequest {
  /** @minLength 1 */
  idToken: string;
}

export interface Credit {
  id?: string;
  settlementId?: string;
  isSplit?: boolean;
  proNumber?: string;
  deliveryDate?: string;
  driver?: string;
  truckId?: string;
  /** @format double */
  ratePerMile?: number;
  /** @format int32 */
  miles?: number;
  /** @format double */
  extendedAmount?: number;
  /** @format double */
  detention?: number;
  /** @format double */
  deadHead?: number;
  /** @format double */
  stopOff?: number;
  /** @format double */
  canada?: number;
  /** @format double */
  layover?: number;
  /** @format double */
  handLoad?: number;
  /** @format double */
  tolls?: number;
  /** @format double */
  bonus?: number;
  /** @format double */
  empty?: number;
  /** @format double */
  totalPaid?: number;
  creditDate?: string;
  creditDescriptions?: string;
  ratePerMileDescription?: string;
  /** @format double */
  creditAmount?: number;
  advanceDate?: string;
  advanceDescription?: string;
  advanceNumber?: string;
  /** @format double */
  advanceAmount?: number;
  /** @format double */
  other?: number;
  /** @format double */
  manualCredit?: number;
  /** @format double */
  base?: number;
}

export interface Deduction {
  id?: string;
  settlementId?: string;
  isSplit?: boolean;
  date?: string;
  driver?: string;
  truckId?: string;
  description?: string;
  /** @format double */
  amount?: number;
  /** @format double */
  totalDeductions?: number;
  /** @format double */
  manualDeduction?: number;
}

export interface Driver {
  id?: string;
  isAdmin?: boolean;
  email?: string;
  name?: string;
  pictureUrl?: string;
  /** @format date-time */
  lastLogin?: string;
  /** @format int32 */
  driverPromptId?: number;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  driverPercent?: DriverPercent;
  /** @format double */
  ratePerMile?: number;
  socialSecurityNumber?: string;
  ignoreComchek?: boolean;
  teammateDriverId?: string;
  isTeamLeader?: boolean;
  isSplit?: boolean;
  paymentHistory?: Payment[];
  /** @format date-time */
  created?: string;
  /** @format date-time */
  inServiceDate?: string;
  /** @format date-time */
  endServiceDate?: string;
  /** @format double */
  weeklySecurityDeposit?: number;
}

export interface DriverPercent {
  /** @format double */
  base?: number;
  /** @format double */
  accessorial?: number;
  /** @format double */
  empty?: number;
  /** @format double */
  deadhead?: number;
  /** @format double */
  fuelSurcharge?: number;
  /** @format double */
  tolls?: number;
}

export interface DriverSettlement {
  driverSettlementId?: string;
  settlementId?: string;
  companyId?: string;
  /** @format date-time */
  settlementDate?: string;
  /** @format int32 */
  weekNumber?: number;
  /** @format int32 */
  year?: number;
  trucks?: string[];
  driver?: string;
  driverId?: string;
  teammateDriver?: string;
  teammateDriverId?: string;
  isSplit?: boolean;
  isTeamLeader?: boolean;
  deductions?: Deduction[];
  credits?: Credit[];
  /** @format double */
  fuel?: number;
  /** @format double */
  occupationalInsurance?: number;
  /** @format double */
  qualcomm?: number;
  notes?: string;
  /** @format double */
  amountDue?: number;
  /** @format double */
  baseTotal?: number;
  /** @format double */
  fscTotal?: number;
  /** @format double */
  accessorialTotal?: number;
  /** @format double */
  manualCreditsTotal?: number;
  /** @format double */
  deductionsTotal?: number;
  /** @format double */
  milesTotal?: number;
  /** @format double */
  income?: number;
  /** @format double */
  previousNegativeBalance?: number;
  /** @format int32 */
  paidMilesYtd?: number;
  /** @format double */
  currentYtdIncome?: number;
  /** @format double */
  securityDepositBalance?: number;
  driverPercent?: DriverPercent;
  ignoreComchek?: boolean;
  /** @format double */
  ratePerMile?: number;
  generatorVersion?: string;
  /** @format date-time */
  lastUpdated?: string;
  deleted?: boolean;
}

export interface DriverSettlementAddNotesRequest {
  driverSettlementId?: string;
  notes?: string;
}

export interface DriverSettlementSplitRequest {
  driverSettlementId?: string;
  teamleaderDriverId?: string;
  teammateDriverId?: string;
}

export interface DriverSummary {
  id?: string;
  name?: string;
  /** @format int32 */
  driverPromptId?: number;
  isTeamLeader?: boolean;
  teammateDriverId?: string;
}

export interface FuelCharge {
  id?: string;
  /** @format int32 */
  weekNumber?: number;
  /** @format int32 */
  year?: number;
  /** @format int32 */
  driverPromptId?: number;
  transactionDate?: string;
  transactionTime?: string;
  transactionTicketNumber?: string;
  /** @format double */
  netCost?: number;
  truckId?: string;
  product?: string;
  /** @format double */
  units?: number;
  /** @format double */
  unitCost?: number;
  merchantName?: string;
  merchantAddress?: string;
  merchantCity?: string;
  merchantState?: string;
  merchantPostal?: string;
  driverFirstName?: string;
  driverLastName?: string;
}

export interface FuelSummary {
  week?: Week;
  /** @format double */
  totalGallons?: number;
  /** @format double */
  totalCost?: number;
}

export interface ManualEntryRequest {
  itemId?: string;
  driverSettlementId?: string;
  description?: string;
  /** @format double */
  creditAmount?: number;
  /** @format double */
  deductionAmount?: number;
}

export interface Payment {
  driverSettlementId?: string;
  /** @format int32 */
  year?: number;
  /** @format int32 */
  weekNumber?: number;
  settlementId?: string;
  /** @format date-time */
  settlementDate?: string;
  companyId?: string;
  /** @format double */
  amount?: number;
  /** @format double */
  incomeYtd?: number;
  /** @format double */
  securityDepositBalance?: number;
  /** @format int32 */
  paidMilesYtd?: number;
  trucks?: string[];
}

export interface SettlementHistory {
  settlementId?: string;
  isSplit?: boolean;
  id?: string;
  /** @format date-time */
  downloadedTimestamp?: string;
  /** @format date-time */
  convertedTimestamp?: string;
  /** @format date-time */
  checkDate?: string;
  /** @format int32 */
  weekNumber?: number;
  /** @format int32 */
  year?: number;
  companyId?: string;
  /** @format double */
  checkAmount?: number;
  /** @format double */
  arAmount?: number;
  /** @format double */
  deductionAmount?: number;
  credits?: Credit[];
  deductions?: Deduction[];
}

export interface SettlementSummary {
  id?: string;
  settlementId?: string;
  /** @format date-time */
  checkDate?: string;
  week?: Week;
  companyId?: string;
  /** @format double */
  checkAmount?: number;
}

export interface UpdateTeammateRequest {
  driverSettlementId?: string;
  updatedTeammateDriverId?: string;
}

export interface User {
  id?: string;
  isAdmin?: boolean;
  email?: string;
  name?: string;
  pictureUrl?: string;
  /** @format date-time */
  lastLogin?: string;
}

export interface VersionInfo {
  projectId?: string;
  version?: string;
  computeInstanceId?: string;
  serviceRevision?: string;
}

export interface Week {
  /** @format int32 */
  year?: number;
  /** @format int32 */
  weekNumber?: number;
  /** @format date-time */
  startDate?: string;
  /** @format date-time */
  endDate?: string;
  /** @format date-time */
  settlementDate?: string;
}
