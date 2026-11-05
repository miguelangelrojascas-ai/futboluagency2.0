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

/**
 * English display names for the form. Only the label changes: the value sent
 * to the CRM is always the Spanish name above.
 */
export const COUNTRY_EN: Record<(typeof COUNTRIES)[number], string> = {
  Alemania: "Germany", Argentina: "Argentina", Armenia: "Armenia", Australia: "Australia",
  Austria: "Austria", "Bélgica": "Belgium", Bolivia: "Bolivia", Brasil: "Brazil",
  "Camerún": "Cameroon", "Canadá": "Canada", Chile: "Chile", China: "China",
  Colombia: "Colombia", "Corea del Sur": "South Korea", "Costa de Marfil": "Ivory Coast",
  "Costa Rica": "Costa Rica", Croacia: "Croatia", Cuba: "Cuba", Dinamarca: "Denmark",
  Ecuador: "Ecuador", Egipto: "Egypt", "El Salvador": "El Salvador", "España": "Spain",
  "Estados Unidos": "United States", Francia: "France", Ghana: "Ghana", Grecia: "Greece",
  Guatemala: "Guatemala", Honduras: "Honduras", India: "India", Irlanda: "Ireland",
  Israel: "Israel", Italia: "Italy", "Japón": "Japan", Marruecos: "Morocco",
  "México": "Mexico", Mongolia: "Mongolia", Nicaragua: "Nicaragua", Nigeria: "Nigeria",
  Noruega: "Norway", "Nueva Zelanda": "New Zealand", "Países Bajos": "Netherlands",
  "Panamá": "Panama", Paraguay: "Paraguay", "Perú": "Peru", Polonia: "Poland",
  Portugal: "Portugal", "Puerto Rico": "Puerto Rico", "Reino Unido": "United Kingdom",
  "República Dominicana": "Dominican Republic", "Rumanía": "Romania", Senegal: "Senegal",
  Serbia: "Serbia", "Sudáfrica": "South Africa", Suecia: "Sweden", Suiza: "Switzerland",
  "Túnez": "Tunisia", "Turquía": "Turkey", Ucrania: "Ukraine", Uruguay: "Uruguay",
  Venezuela: "Venezuela", Otro: "Other",
};

/** "Fall 2026" → "Otoño 2026" for the Spanish form; the value stays in English. */
export const termLabelEs = (term: string) =>
  term.replace("Fall", "Otoño").replace("Spring", "Primavera");

export type Country = (typeof COUNTRIES)[number];
export type Budget = (typeof BUDGETS)[number];
export type StartTerm = (typeof START_TERMS)[number];
