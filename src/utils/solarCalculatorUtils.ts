import { SolarCalculationResult, PumpingCalculationResult } from '../types';

/**
 * Calculates solar photovoltaic system dimensioning based on monthly bill
 * @param monthlyBill Value in Brazilian Reais (R$)
 * @param state UF State code (affects solar irradiance factor)
 * @param connectionType 'monofasico' | 'bifasico' | 'trifasico'
 * @param energyTariff Average price per kWh in R$ (default ~R$ 0.95/kWh)
 */
export function calculateSolarSystem(
  monthlyBill: number,
  state: string = 'PA',
  connectionType: 'monofasico' | 'bifasico' | 'trifasico' = 'bifasico',
  energyTariff: number = 0.98
): SolarCalculationResult {
  // Minimum connection availability fee (kWh)
  const minimumKwhMap = {
    monofasico: 30,
    bifasico: 50,
    trifasico: 100,
  };

  const minKwh = minimumKwhMap[connectionType] || 50;
  const minimumBillCost = minKwh * energyTariff + 30; // ~R$ for min availability + street lighting

  // Effective savings per month
  const netMonthlyBillToOffset = Math.max(0, monthlyBill - minimumBillCost);
  const estimatedKwhNeeded = netMonthlyBillToOffset / energyTariff;

  // Average daily solar peak hours in Brazil (~4.8 to 5.6 hours depending on region)
  const solarHoursMap: Record<string, number> = {
    SP: 4.8,
    RJ: 5.0,
    MG: 5.3,
    ES: 4.9,
    PR: 4.5,
    SC: 4.4,
    RS: 4.3,
    MS: 5.4,
    MT: 5.6,
    GO: 5.5,
    DF: 5.4,
    BA: 5.7,
    PE: 5.8,
    CE: 5.9,
    MA: 5.5,
    PA: 4.9,
  };

  const dailySunHours = solarHoursMap[state] || 5.0;
  // System performance ratio (losses ~20%)
  const performanceRatio = 0.80;

  // Needed power in kWp
  // Monthly kWh = kWp * dailySunHours * 30 days * performanceRatio
  const systemPowerKwp = Number((estimatedKwhNeeded / (dailySunHours * 30 * performanceRatio)).toFixed(2));

  // Modern panel wattage (e.g. 570W TOPCon N-type = 0.570 kW)
  const panelWattage = 0.570;
  const estimatedPanels = Math.max(2, Math.ceil(systemPowerKwp / panelWattage));

  // Required roof area (~2.6 m² per 570W panel)
  const requiredAreaM2 = Math.round(estimatedPanels * 2.6);

  // Estimated Turnkey Investment (R$ / kWp scales with size, approx ~R$ 3.200 to R$ 4.100 / kWp installed)
  let costPerKwp = 3800;
  if (systemPowerKwp > 10) costPerKwp = 3400;
  if (systemPowerKwp > 30) costPerKwp = 3100;
  if (systemPowerKwp > 75) costPerKwp = 2800;

  const estimatedInvestment = Math.max(6500, Math.round(systemPowerKwp * costPerKwp));

  // Financial outcomes
  const monthlySavings = Math.round(netMonthlyBillToOffset);
  const annualSavings = monthlySavings * 12;
  const twentyFiveYearSavings = Math.round(annualSavings * 25 * 1.8); // Includes historical energy inflation (~6% / year)

  // Payback in years
  const paybackYears = Number((estimatedInvestment / annualSavings).toFixed(1));

  // Environmental impact
  // 1 MWh generated avoids ~0.12 tons of CO2 in Brazil grid
  const annualMwh = (estimatedKwhNeeded * 12) / 1000;
  const co2SavedTonsYear = Number((annualMwh * 0.12).toFixed(2));
  const treesPlantedEquivalent = Math.round(co2SavedTonsYear * 7);

  return {
    monthlyBill,
    monthlySavings,
    annualSavings,
    twentyFiveYearSavings,
    estimatedPanels,
    systemPowerKwp,
    requiredAreaM2,
    estimatedInvestment,
    paybackYears: isNaN(paybackYears) ? 3.5 : Math.min(paybackYears, 8.0),
    co2SavedTonsYear,
    treesPlantedEquivalent
  };
}

/**
 * Calculates solar water pumping system requirements
 */
export function calculateSolarPumping(
  dailyVolumeLiters: number,
  depthMeters: number,
  distanceMeters: number = 50
): PumpingCalculationResult {
  // Total Dynamic Head (TDH) in meters of head
  // Friction loss approx 10% of horizontal distance
  const frictionLossMeters = distanceMeters * 0.05;
  const totalHeadMeters = depthMeters + frictionLossMeters;

  // Average 6 hours of full solar pumping time per day
  const dailyHoursSun = 6.0;
  const flowRateLitersPerHour = Math.round(dailyVolumeLiters / dailyHoursSun);
  const flowRateM3PerHour = flowRateLitersPerHour / 1000;

  // Hydraulic Power (Watts) = (Q in m³/s * Density 1000 * g 9.81 * Head in m)
  const flowRateM3PerSec = flowRateM3PerHour / 3600;
  const hydraulicPowerWatts = flowRateM3PerSec * 1000 * 9.81 * totalHeadMeters;

  // Pump & motor overall efficiency ~45% for helical/centrifugal solar pumps
  const pumpEfficiency = 0.45;
  const requiredElectricPowerWatts = hydraulicPowerWatts / pumpEfficiency;

  // Convert to HP (1 HP = 746 Watts)
  const rawHp = requiredElectricPowerWatts / 746;
  let recommendedPowerHp = 0.5;
  if (rawHp > 0.5) recommendedPowerHp = 1.0;
  if (rawHp > 1.0) recommendedPowerHp = 1.5;
  if (rawHp > 1.5) recommendedPowerHp = 2.0;
  if (rawHp > 2.0) recommendedPowerHp = 3.0;
  if (rawHp > 3.0) recommendedPowerHp = 5.0;
  if (rawHp > 5.0) recommendedPowerHp = 7.5;
  if (rawHp > 7.5) recommendedPowerHp = 10.0;

  // Solar array power needs ~25% overdesign to start pump smoothly (MPPT controller)
  const requiredSolarWatts = requiredElectricPowerWatts * 1.25;
  const panelWattage = 570;
  const estimatedPanels = Math.max(2, Math.ceil(requiredSolarWatts / panelWattage));

  return {
    dailyVolumeLiters,
    depthMeters,
    distanceMeters,
    recommendedPowerHp,
    estimatedPanels,
    dailyHoursSun,
    flowRateLitersPerHour
  };
}
