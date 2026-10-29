/**
 * The closed sets of values a lead submission may contain.
 *
 * Imported by both the form and the serverless endpoint, which is the point:
 * the endpoint writes to Airtable without `typecast`, so a value that is not
 * on these lists is rejected rather than quietly added as a new select option.
 * Keep this file free of imports so the function bundle stays tiny.
 */

/** Matches the cleaned-up `país` choices in the CRM, minus the legacy ones. */
export const COUNTRIES = [
  "Alemania",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Bélgica",
  "Bolivia",
  "Brasil",
  "Camerún",
  "Canadá",
  "Chile",
  "China",
  "Colombia",
  "Corea del Sur",
  "Costa de Marfil",
  "Costa Rica",
  "Croacia",
  "Cuba",
  "Dinamarca",
  "Ecuador",
  "Egipto",
  "El Salvador",
  "España",
  "Estados Unidos",
  "Francia",
  "Ghana",
  "Grecia",
  "Guatemala",
  "Honduras",
  "India",
  "Irlanda",
  "Israel",
  "Italia",
  "Japón",
  "Marruecos",
  "México",
  "Mongolia",
  "Nicaragua",
  "Nigeria",
  "Noruega",
  "Nueva Zelanda",
  "Países Bajos",
  "Panamá",
  "Paraguay",
  "Perú",
  "Polonia",
  "Portugal",
  "Puerto Rico",
  "Reino Unido",
  "República Dominicana",
  "Rumanía",
  "Senegal",
  "Serbia",
  "Sudáfrica",
  "Suecia",
  "Suiza",
  "Túnez",
  "Turquía",
  "Ucrania",
  "Uruguay",
  "Venezuela",
  "Otro",
] as const;

/**
 * What the family could cover per year, housing and food included. The last
 * option is the escape hatch: picking it sends them to the costs guide.
 */
export const BUDGETS = [
  "0-$5.000",
  "$5.000-$10.000",
  "$10.000-$12.000",
  "$12.000-$15.000",
  "+$15.000",
  "No lo sé todavía",
] as const;

export const BUDGET_UNSURE = "No lo sé todavía";

export const START_TERMS = [
  "Fall 2026",
  "Spring 2027",
  "Fall 2027",
  "Spring 2028",
  "Fall 2028",
  "Spring 2029",
] as const;

export type Country = (typeof COUNTRIES)[number];
export type Budget = (typeof BUDGETS)[number];
export type StartTerm = (typeof START_TERMS)[number];
