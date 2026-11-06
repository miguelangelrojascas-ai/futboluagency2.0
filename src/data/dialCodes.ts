/**
 * International dialling codes for the phone fields, keyed by the Spanish
 * country name used across the forms (see COUNTRIES in leadOptions.ts), so
 * picking a country can pre-select its code.
 */

export type DialCode = { country: string; en: string; code: string; flag: string };

const list: Array<[string, string, string, string]> = [
  ["España", "Spain", "34", "🇪🇸"],
  ["Estados Unidos", "United States", "1", "🇺🇸"],
  ["México", "Mexico", "52", "🇲🇽"],
  ["Colombia", "Colombia", "57", "🇨🇴"],
  ["Argentina", "Argentina", "54", "🇦🇷"],
  ["Chile", "Chile", "56", "🇨🇱"],
  ["Perú", "Peru", "51", "🇵🇪"],
  ["Venezuela", "Venezuela", "58", "🇻🇪"],
  ["Ecuador", "Ecuador", "593", "🇪🇨"],
  ["Uruguay", "Uruguay", "598", "🇺🇾"],
  ["Paraguay", "Paraguay", "595", "🇵🇾"],
  ["Bolivia", "Bolivia", "591", "🇧🇴"],
  ["Alemania", "Germany", "49", "🇩🇪"],
  ["Armenia", "Armenia", "374", "🇦🇲"],
  ["Australia", "Australia", "61", "🇦🇺"],
  ["Austria", "Austria", "43", "🇦🇹"],
  ["Bélgica", "Belgium", "32", "🇧🇪"],
  ["Brasil", "Brazil", "55", "🇧🇷"],
  ["Camerún", "Cameroon", "237", "🇨🇲"],
  ["Canadá", "Canada", "1", "🇨🇦"],
  ["China", "China", "86", "🇨🇳"],
  ["Corea del Sur", "South Korea", "82", "🇰🇷"],
  ["Costa de Marfil", "Ivory Coast", "225", "🇨🇮"],
  ["Costa Rica", "Costa Rica", "506", "🇨🇷"],
  ["Croacia", "Croatia", "385", "🇭🇷"],
  ["Cuba", "Cuba", "53", "🇨🇺"],
  ["Dinamarca", "Denmark", "45", "🇩🇰"],
  ["Egipto", "Egypt", "20", "🇪🇬"],
  ["El Salvador", "El Salvador", "503", "🇸🇻"],
  ["Francia", "France", "33", "🇫🇷"],
  ["Ghana", "Ghana", "233", "🇬🇭"],
  ["Grecia", "Greece", "30", "🇬🇷"],
  ["Guatemala", "Guatemala", "502", "🇬🇹"],
  ["Honduras", "Honduras", "504", "🇭🇳"],
  ["India", "India", "91", "🇮🇳"],
  ["Irlanda", "Ireland", "353", "🇮🇪"],
  ["Israel", "Israel", "972", "🇮🇱"],
  ["Italia", "Italy", "39", "🇮🇹"],
  ["Japón", "Japan", "81", "🇯🇵"],
  ["Marruecos", "Morocco", "212", "🇲🇦"],
  ["Mongolia", "Mongolia", "976", "🇲🇳"],
  ["Nicaragua", "Nicaragua", "505", "🇳🇮"],
  ["Nigeria", "Nigeria", "234", "🇳🇬"],
  ["Noruega", "Norway", "47", "🇳🇴"],
  ["Nueva Zelanda", "New Zealand", "64", "🇳🇿"],
  ["Países Bajos", "Netherlands", "31", "🇳🇱"],
  ["Panamá", "Panama", "507", "🇵🇦"],
  ["Polonia", "Poland", "48", "🇵🇱"],
  ["Portugal", "Portugal", "351", "🇵🇹"],
  ["Puerto Rico", "Puerto Rico", "1", "🇵🇷"],
  ["Reino Unido", "United Kingdom", "44", "🇬🇧"],
  ["República Dominicana", "Dominican Republic", "1", "🇩🇴"],
  ["Rumanía", "Romania", "40", "🇷🇴"],
  ["Senegal", "Senegal", "221", "🇸🇳"],
  ["Serbia", "Serbia", "381", "🇷🇸"],
  ["Sudáfrica", "South Africa", "27", "🇿🇦"],
  ["Suecia", "Sweden", "46", "🇸🇪"],
  ["Suiza", "Switzerland", "41", "🇨🇭"],
  ["Túnez", "Tunisia", "216", "🇹🇳"],
  ["Turquía", "Turkey", "90", "🇹🇷"],
  ["Ucrania", "Ukraine", "380", "🇺🇦"],
];

export const DIAL_CODES: DialCode[] = list.map(([country, en, code, flag]) => ({ country, en, code, flag }));

/** Code for a country chosen in the form, if we know it. */
export const dialCodeFor = (country: string) => DIAL_CODES.find((d) => d.country === country)?.code;
