/**
 * Closed lists for the Showcase registration form.
 *
 * The value sent is always the Spanish one: the CRM (CRM-FUA, lib/showcase.ts)
 * checks every select against the same lists and rejects anything else, so
 * keep both files in step. The English text is only the label.
 */

type Option = { value: string; en: string };

const opts = (pairs: Array<[string, string]>): Option[] =>
  pairs.map(([value, en]) => ({ value, en }));

export const GENDERS = opts([
  ["Masculino", "Male"],
  ["Femenino", "Female"],
]);

export const CONTACT_OF = opts([
  ["Jugador", "The player's"],
  ["Padre", "The father's"],
  ["Madre", "The mother's"],
  ["Tutor", "A guardian's"],
]);

export const POSITIONS = opts([
  ["Portero", "Goalkeeper"],
  ["Lateral derecho", "Right back"],
  ["Lateral izquierdo", "Left back"],
  ["Central", "Centre back"],
  ["Pivote", "Defensive midfielder"],
  ["Mediocentro", "Central midfielder"],
  ["Mediapunta", "Attacking midfielder"],
  ["Extremo derecho", "Right winger"],
  ["Extremo izquierdo", "Left winger"],
  ["Delantero centro", "Striker"],
]);

export const FEET = opts([
  ["Derecho", "Right"],
  ["Izquierdo", "Left"],
  ["Ambos", "Both"],
]);

export const LEAGUES = opts([
  ["División de Honor Juvenil", "División de Honor Juvenil (Spain, top U19)"],
  ["Liga Nacional Juvenil", "Liga Nacional Juvenil (Spain)"],
  ["Primera / Segunda RFEF", "Primera / Segunda RFEF (Spain)"],
  ["Tercera RFEF", "Tercera RFEF (Spain)"],
  ["Regional (sénior o juvenil)", "Regional league (senior or youth)"],
  ["High school (EE.UU.)", "High school (U.S.)"],
  ["Club o academia (EE.UU.)", "Club or academy (U.S.)"],
  ["Universidad", "College"],
  ["Otra", "Other"],
]);

export const GRADUATIONS = opts([
  ["2025 o antes", "2025 or earlier"],
  ["2026", "2026"],
  ["2027", "2027"],
  ["2028", "2028"],
  ["2029 o después", "2029 or later"],
]);

export const ENGLISH_LEVELS = opts([
  ["Básico", "Basic"],
  ["Intermedio", "Intermediate"],
  ["Avanzado", "Advanced"],
  ["Nativo", "Native"],
]);

export const SOURCES = opts([
  ["Instagram", "Instagram"],
  ["TikTok", "TikTok"],
  ["Google", "Google search"],
  ["Un amigo o compañero", "A friend or teammate"],
  ["Mi entrenador o club", "My coach or club"],
  ["Un jugador de FUA", "A current or former FUA player"],
  ["Otro", "Other"],
]);
