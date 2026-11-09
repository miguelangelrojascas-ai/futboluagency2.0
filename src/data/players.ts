import { playerStories } from "@/data/playerStories";

/** Players who have a long-form story page, keyed by the name on their card. */
const storySlugByName = new Map(playerStories.map((story) => [story.name, story.slug]));

export type Player = {
  name: string;
  /** Commitment graphic (landscape, 3:2). It already shows name, school and division. */
  image: string;
  university: string;
  division: string;
  /** Slug of this player's story page, when they have one. */
  story?: string;
};

/** [name, file in /public/images/commitments, university, division] */
const roster: Array<[string, string, string, string]> = [
  ["Miguel Arnaiz de León", "miguel-arnaiz-de-leon", "Midland University", "NAIA"],
  ["Gabriel D'Antoni", "gabriel-d-antoni", "Southwestern Christian University", "NAIA"],
  ["José Roberto Castañeda", "jose-roberto-castaneda", "Texas A&M University–Victoria", "NAIA"],
  ["Hugo Fernández Quintana", "hugo-fernandez-quintana", "Carl Sandburg College", "NJCAA"],
  ["Álvaro Morán Janovas", "alvaro-moran-janovas", "Illinois Valley Community College", "NJCAA"],
  ["Xurde Saornil", "xurde-saornil", "Illinois Valley Community College", "NJCAA"],
  ["Jeremy Raite", "jeremy-raite", "Union Commonwealth University", "NAIA"],
  ["Javier Codinach de Mata", "javier-codinach-de-mata", "Union Commonwealth University", "NAIA"],
  ["Santiago Abraham", "santiago-abraham", "Colorado Christian University", "NCAA D2"],
  ["Lucas Hernández Mateu", "lucas-hernandez-mateu", "Illinois Valley Community College", "NJCAA"],
  ["Sebastián Rosales Luna", "sebastian-rosales-luna", "Illinois Valley Community College", "NJCAA"],
  ["Pablo Nielfa", "pablo-nielfa", "Texas A&M University–Victoria", "NAIA"],
  ["Seth Alejandro Batz Guajardo", "seth-alejandro", "Greenville University", "NCAA D3"],
  ["Juan Gámez Bejerano", "juan-gamez-bejerano", "Southeastern University", "NAIA"],
  ["Martiniano Sansone", "martiniano-sansone", "Midway University", "NAIA"],
  ["Vicente Órdenes", "vicente-ordenes", "Snow College", "NJCAA"],
  ["Felipe Hernández Carrasco", "felipe-hernandez-carrasco", "North American University", "NAIA"],
  ["Rubén García Sánchez", "ruben-garcia-sanchez", "Joliet Junior College", "NJCAA D3"],
  ["Takumi Hirose", "takumi-hirose", "LSU of Alexandria", "NAIA"],
  ["Tomás Cáceres", "tomas-caceres", "Illinois Central College", "NJCAA"],
  ["Alejandro Cantos", "alejandro-cantos", "Carl Sandburg College", "NJCAA"],
  ["Marco Pellejero", "marco-pellejero", "St. Thomas University", "NAIA"],
  ["Favio Rosales", "favio-rosales", "Oklahoma Panhandle State University", "NAIA"],
  ["Luca Janzen", "luca-janzen", "Carolina University", "NAIA"],
  ["Pablo Dabos", "pablo-dabos", "University of the Ozarks", "NCAA D3"],
  ["Sebastián Faudoa", "sebastian-faudoa", "Monroe College", "NCAA D2"],
  ["Rounak Nanda", "rounak-nanda", "Dominican University (Illinois)", "NCAA D3"],
  ["Mauro Tomás Negre", "mauro-tomas-negre", "Southwestern Christian University", "NAIA"],
  ["Juan Carlos Fernández Sierra", "juan-carlos-fernandez-sierra", "Crowder College", "NJCAA"],
  ["Marcos Gallardo Rozano", "marcos-gallardo-rozano", "Northern Michigan University", "NCAA D2"],
  ["Pablo Lobón", "pablo-lobon", "Southeastern University", "NAIA"],
  ["Daniel Abreu", "daniel-abreu", "North American University", "NAIA"],
  ["Sergio Cano Castro", "sergio-cano-castro", "Northern Michigan University", "NCAA D2"],
  ["Axel Antonio López Gómez", "axel-antonio-lopez-gomez", "Mount Vernon Nazarene University", "NAIA"],
  ["Marc García Oliver", "marc-garcia-oliver", "Shawnee State University", "NCAA D2"],
  ["Stanley Paul Fovargue", "stanley-paul-fovargue", "Texas Wesleyan University", "NAIA"],
  ["Brian Hernández Carmona", "brian-hernandez-carmona", "Monroe College", "NCAA D2"],
  ["Miguel Menchón Berná", "miguel-menchon-berna", "Seward County Community College", "NJCAA"],
  ["Javier Hernández", "javier-hernandez", "LSU of Alexandria", "NAIA"],
  ["Víctor Sanz Paz", "victor-sanz-paz", "Holy Cross College", "NAIA"],
  ["Álvaro Mestre Sánchez", "alvaro-mestre-sanchez", "Spring Hill College", "NCAA D2"],
  ["Jorge Arrondo García", "jorge-arrondo-garcia", "Wayland Baptist University", "NAIA"],
  ["Iván Gómez Sumillera", "ivan-gomez-sumillera", "Delta State University", "NCAA D2"],
  ["Francisco Grado", "francisco-grado", "Regis University", "NCAA D2"],
  ["Juan Argüelles", "juan-arguelles", "Prairie State College", "NJCAA"],
  ["Chase Perry", "chase-perry", "Salem University", "NCAA D2"],
  ["Diego Salamanca", "diego-salamanca", "University of Wisconsin–Stout", "NCAA D3"],
  ["Bentchey Domínguez", "bentchey-dominguez", "East Mississippi Community College", "NJCAA"],
  ["Rogelio Rojas", "rogelio-rojas", "Felician University", "NCAA D2"],
  ["Eduardo Larsen", "eduardo-larsen", "Beloit College", "NCAA D3"],
  ["Omar Campos", "omar-campos", "Cowley College", "NJCAA"],
  ["Ariel Martínez", "ariel-martinez", "Faulkner University", "NAIA"],
  ["José Serrada", "jose-serrada", "Earlham College", "NCAA D3"],
  ["Ander González", "ander-gonzalez", "St. John's University", "NCAA D1"],
  ["Marcos de Elías", "marcos-de-elias", "Saint Peter's University", "NCAA D1"],
  ["Youssef El Madkouri", "youssef-el-madkouri", "Northwest Nazarene University", "NCAA D2"],
  ["Tomás del Grosso", "tomas-del-grosso", "Cal Poly Pomona University", "NCAA D2"],
];

/** Footballers already committed to a U.S. university, in the order of the graphics. */
export const players: Player[] = roster.map(([name, file, university, division]) => ({
  name,
  image: `/images/commitments/${file}.jpg`,
  university,
  division,
  story: storySlugByName.get(name),
}));
