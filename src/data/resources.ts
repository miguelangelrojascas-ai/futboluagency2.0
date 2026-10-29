import heroResources from "@/assets/campus-library.webp";
import diagramPyramid from "@/assets/us-soccer-pyramid.webp";
import imgBecas from "@/assets/card-bg-evaluation.webp";
import imgDivisiones from "@/assets/card-bg-coaches-new.webp";
import imgRequisitos from "@/assets/card-bg-profile.webp";
import imgVisado from "@/assets/card-bg-visas.webp";
import imgCostes from "@/assets/usa-academic.webp";
import imgVida from "@/assets/campus-dorm.webp";
import imgOffCampus from "@/assets/campus-offcampus.webp";
import imgDining from "@/assets/campus-dining.webp";

/** Wide shot used behind the resources index header. */
export const resourcesHeroImage = heroResources;

/** Long-form guides for /recursos.
 *
 *  Everything here is drawn from material already published on the site
 *  (FAQ, process, requirements, USA page) or supplied by the agency. Sections
 *  with an empty `body` render as "en preparación" rather than inventing copy. */

export type GuideTable = {
  caption: { es: string; en: string };
  columns: { es: string[]; en: string[] };
  rows: { es: string[]; en: string[] }[];
  /** Highlighted last row: [label, value]. */
  total: { es: string[]; en: string[] };
};

export type GuideSection = {
  id: string;
  title: { es: string; en: string };
  /** Illustration rendered after the body. `diagram` is shown whole, not cropped. */
  image?: { src: string; alt: { es: string; en: string }; diagram?: boolean };
  /** Paragraphs. An empty array marks the section as still unwritten. */
  body: { es: string[]; en: string[] };
  /** Figures that read better as a table than as prose. */
  table?: GuideTable;
  /** Renders the four reference player profiles after the body. */
  profiles?: boolean;
};

export type Guide = {
  slug: string;
  number: string;
  /** Cover shown on the index card and in the guide header. */
  image: string;
  title: { es: string; en: string };
  summary: { es: string; en: string };
  sections: GuideSection[];
};

export const guides: Guide[] = [
  {
    slug: "becas-y-elegibilidad",
    image: imgBecas,
    number: "01",
    title: { es: "Becas y elegibilidad", en: "Scholarships & eligibility" },
    summary: {
      es: "Qué es exactamente una beca deportiva, cuánto cubre, qué divisiones existen y qué puede dejarte fuera antes de empezar.",
      en: "What an athletic scholarship actually is, how much it covers, which divisions exist and what can rule you out before you start.",
    },
    sections: [
      {
        id: "que-es",
        title: { es: "Qué es una beca deportiva y qué cubre", en: "What an athletic scholarship is and what it covers" },
        body: {
          es: [
            "Es una ayuda económica que una universidad te ofrece a cambio de competir en su equipo. No es un premio ni una subvención pública: es un acuerdo entre tú y el programa deportivo, que dispone de un presupuesto anual limitado y decide cómo repartirlo entre sus jugadores.",
            "Según tu perfil y la universidad, puede cubrir parte o casi todos los costes de estudio y vida: matrícula, alojamiento y comida. El importe final lo decide cada universidad, y en fútbol las becas que gestionamos van del 75% al 100%.",
            "Cuánto queda por pagar en cada caso, y sobre qué cifra total se calcula ese porcentaje, lo desglosamos en la guía de costes y financiación.",
          ],
          en: [
            "It is financial aid a university offers you in exchange for competing on its team. It is not a prize or a public grant: it is an agreement between you and the athletic program, which has a limited annual budget and decides how to split it among its players.",
            "Depending on your profile and the university, it can cover part or almost all of your study and living costs: tuition, housing and meals. The final amount is decided by each university, and in football the scholarships we handle range from 75% to 100%.",
            "How much is left to pay in each case, and the total figure that percentage is calculated on, is broken down in the costs and funding guide.",
          ],
        },
      },
      {
        id: "tipos",
        title: { es: "Beca deportiva y beca académica", en: "Athletic and academic scholarships" },
        body: {
          es: [
            "Existen dos tipos principales y muchas veces se combinan. La deportiva la concede el propio programa de fútbol a partir de su presupuesto. La académica depende de tu expediente y la concede la universidad con independencia del deporte.",
            "Por eso las notas importan aunque vayas a jugar: un buen expediente puede añadir un porcentaje de beca que el entrenador no tendría que sacar de su presupuesto deportivo, y eso te hace un fichaje más atractivo.",
          ],
          en: [
            "There are two main types and they are often combined. The athletic one is awarded by the soccer program out of its own budget. The academic one depends on your record and is awarded by the university regardless of sport.",
            "That is why grades matter even if you are going to play: a strong record can add a percentage the coach would not have to take from the athletic budget, which makes you a more attractive signing.",
          ],
        },
      },
      {
        id: "divisiones",
        title: { es: "Las divisiones: NCAA, NAIA y NJCAA", en: "The divisions: NCAA, NAIA and NJCAA" },
        body: {
          es: [
            "Trabajamos con programas de NCAA División I, II y III, NAIA y NJCAA. Cada una tiene sus propias normas de elegibilidad, sus calendarios y sus límites de becas, y no todas reparten el dinero igual.",
            "Trabajar con todo el abanico es justo lo que multiplica tus opciones reales: un perfil que no encaja en una D1 puede ser titular en una NJCAA y transferirse dos años después. Lo que buscamos es el equilibrio entre tu nivel de juego, tus metas académicas y lo que espera tu familia.",
          ],
          en: [
            "We work with NCAA Division I, II and III programs, NAIA and NJCAA. Each has its own eligibility rules, calendars and scholarship limits, and they do not all distribute money the same way.",
            "Working across the whole range is exactly what multiplies your real options: a profile that does not fit a D1 can start at an NJCAA and transfer two years later. What we look for is the balance between your level of play, your academic goals and what your family expects.",
          ],
        },
      },
      {
        id: "amateur",
        title: { es: "Estatus amateur: el punto que pilla a muchos", en: "Amateur status: the detail that catches people out" },
        body: {
          es: [
            "La NCAA certifica tu estatus de amateur antes de dejarte competir. Haber firmado contratos, cobrado salarios o primas, o haber jugado en categoría sénior puede afectar a tu elegibilidad. NAIA y NJCAA tienen sus propias normas, distintas entre sí.",
            "Conviene revisarlo el primer día, no cuando ya hay una oferta sobre la mesa. Nosotros revisamos cada caso individualmente antes de presentarte a ninguna universidad, precisamente para no construir un proceso sobre una base que luego se cae.",
          ],
          en: [
            "The NCAA certifies your amateur status before letting you compete. Having signed contracts, received salaries or bonuses, or played at senior level can affect your eligibility. NAIA and NJCAA have their own rules, different from each other.",
            "This is worth reviewing on day one, not once an offer is already on the table. We review every case individually before presenting you to any university, precisely so the process is not built on ground that later gives way.",
          ],
        },
      },
      {
        id: "eligibility-center",
        title: { es: "El NCAA Eligibility Center", en: "The NCAA Eligibility Center" },
        body: {
          es: [
            "Es el organismo que certifica que estás académicamente preparado y que mantienes tu estatus de amateur. Sin ese visto bueno no puedes competir. Se registran los deportistas que van a División I y División II; la División III gestiona su propia certificación, y la NAIA tiene su propio centro de elegibilidad.",
            "En el lado académico, la NCAA exige 16 asignaturas troncales aprobadas. Para División I el mínimo es un 2.3 de nota media en esas asignaturas, y para División II un 2.2. Además existe la llamada regla 10/7: diez de esas dieciséis deben estar completadas antes del último curso de bachillerato, y siete de ellas tienen que ser de inglés, matemáticas o ciencias.",
            "Para un expediente de fuera de Estados Unidos, la equivalencia no es automática: tus notas se validan contra el sistema del país donde estudiaste, y cada documento que no esté en inglés necesita traducción certificada.",
            "Un detalle de calendario que sorprende a muchas familias: el registro y la declaración de elegibilidad ocurren después de que la universidad te acepta, no antes. Conviene consultarlo con tu agente antes de crear la cuenta o pagar la tarifa, para revisar primero que no haya ningún punto conflictivo.",
          ],
          en: [
            "It is the body that certifies you are academically ready and that you hold amateur status. Without that clearance you cannot compete. Athletes heading to Division I and Division II register; Division III manages its own certification, and the NAIA has its own eligibility center.",
            "On the academic side, the NCAA requires 16 approved core courses. For Division I the minimum is a 2.3 grade point average across those courses, and for Division II a 2.2. There is also the 10/7 rule: ten of those sixteen must be completed before your final year of high school, and seven of them must be English, maths or science.",
            "For a transcript from outside the United States, equivalence is not automatic: your grades are validated against the system of the country where you studied, and every document not in English needs a certified translation.",
            "One scheduling detail that surprises many families: registration and the eligibility ruling happen after a university accepts you, not before. It is worth checking with your agent before creating the account or paying the fee, so any conflicting point is reviewed first.",
          ],
        },
      },
    ],
  },
  {
    slug: "las-divisiones",
    image: imgDivisiones,
    number: "02",
    title: { es: "Las divisiones", en: "The divisions" },
    summary: {
      es: "NCAA, NAIA y NJCAA explicadas sin siglas sueltas: qué nivel es cada una, cómo reparten las becas y dónde encaja tu perfil.",
      en: "NCAA, NAIA and NJCAA explained without loose acronyms: what level each one is, how they hand out scholarships and where your profile fits.",
    },
    sections: [
      {
        id: "mapa",
        image: {
          src: diagramPyramid,
          alt: {
            es: "Pirámide del fútbol en Estados Unidos, del nivel juvenil al profesional, con la NCAA como vía intermedia",
            en: "Pyramid of U.S. soccer, from youth to professional level, with the NCAA as an intermediate route",
          },
          diagram: true,
        },
        title: { es: "El mapa completo", en: "The full map" },
        body: {
          es: [
            "El fútbol universitario estadounidense no es una liga: son tres organismos distintos con más de 1.500 equipos entre todos. La NCAA es el dominante y se divide en tres niveles. La NAIA agrupa universidades más pequeñas con criterios de elegibilidad más flexibles. Y la NJCAA reúne los colleges de dos años, la vía de entrada más habitual para quien necesita rodaje o tiene el expediente justo.",
            "Entender el mapa importa porque la primera reacción de casi toda familia es querer una D1, y eso deja fuera el 80% de las oportunidades reales. Una beca alta en una NAIA competitiva vale más que un banquillo en una D1 media.",
          ],
          en: [
            "U.S. college soccer is not one league: it is three separate bodies with more than 1,500 teams between them. The NCAA is the dominant one and splits into three levels. The NAIA groups smaller universities with more flexible eligibility criteria. And the NJCAA brings together two-year colleges, the most common entry route for anyone who needs playing time or whose academic record is tight.",
            "Understanding the map matters because almost every family's first reaction is to want a D1, and that rules out 80% of the real opportunities. A high scholarship at a competitive NAIA is worth more than a bench spot at a mid-table D1.",
          ],
        },
      },
      {
        id: "ncaa",
        title: { es: "NCAA: Divisiones I, II y III", en: "NCAA: Divisions I, II and III" },
        body: {
          es: [
            "La División I es el escaparate: presupuestos altos, partidos televisados, instalaciones de nivel profesional y la exigencia que eso conlleva. Es también donde más aprieta la competencia por una plaza y donde los entrenadores rara vez ofrecen becas grandes a quien solo han visto en vídeo.",
            "La División II mantiene un nivel competitivo serio con un equilibrio más llevadero entre deporte y estudios, y suele combinar beca deportiva con beca académica. Para muchos perfiles internacionales es el punto dulce.",
            "La División III no concede becas deportivas como tal, pero sí ayudas académicas que pueden ser generosas. Se juega en serio y es una opción real para quien prioriza el expediente. Ojo a un detalle: la D3 no pasa por el NCAA Eligibility Center, gestiona su propia certificación.",
          ],
          en: [
            "Division I is the showcase: big budgets, televised matches, professional-grade facilities and the demands that come with them. It is also where competition for a spot is fiercest and where coaches rarely offer large scholarships to someone they have only seen on video.",
            "Division II keeps a serious competitive level with a more manageable balance between sport and study, and usually combines athletic with academic aid. For many international profiles it is the sweet spot.",
            "Division III does not award athletic scholarships as such, but it does offer academic aid that can be generous. The football is serious and it is a real option for anyone prioritising their degree. One detail to note: D3 does not go through the NCAA Eligibility Center, it handles its own certification.",
          ],
        },
      },
      {
        id: "naia-njcaa",
        title: { es: "NAIA y NJCAA: las vías que nadie te cuenta", en: "NAIA and NJCAA: the routes nobody mentions" },
        body: {
          es: [
            "La NAIA agrupa universidades de tamaño medio con un fútbol competitivo y, sobre todo, con criterios de elegibilidad más flexibles para algunos perfiles internacionales. Su centro de elegibilidad es propio y su tasa de registro, menor que la de la NCAA.",
            "La NJCAA son colleges de dos años. Es la puerta de entrada clásica para quien necesita adaptarse al idioma, mejorar expediente o acumular minutos antes de dar el salto. No es un plan B: muchos jugadores pasan dos años ahí y se transfieren a una D1 con el inglés resuelto, el ritmo cogido y un año de vídeo nuevo que enseñar.",
          ],
          en: [
            "The NAIA groups mid-sized universities with competitive football and, above all, more flexible eligibility criteria for certain international profiles. It has its own eligibility center and a lower registration fee than the NCAA.",
            "The NJCAA is made up of two-year colleges. It is the classic entry door for anyone who needs to settle into the language, improve their record or build up minutes before making the jump. It is not a plan B: many players spend two years there and transfer to a D1 with the English sorted, the rhythm found and a fresh year of video to show.",
          ],
        },
      },
      {
        id: "perfiles",
        title: { es: "Dónde encaja tu perfil", en: "Where your profile fits" },
        body: {
          es: [
            "Estos son los cuatro perfiles de referencia con los que trabajamos. No son categorías cerradas ni una nota: son el punto de partida de la conversación en la evaluación gratuita, donde cruzamos tu nivel de juego con tu expediente para decirte a qué divisiones puedes aspirar de verdad.",
          ],
          en: [
            "These are the four reference profiles we work with. They are not closed categories or a grade: they are the starting point of the conversation in the free evaluation, where we cross your level of play with your academic record to tell you which divisions you can realistically aim for.",
          ],
        },
        profiles: true,
      },
    ],
  },
  {
    slug: "requisitos-y-perfil",
    image: imgRequisitos,
    number: "03",
    title: { es: "Requisitos y perfil", en: "Requirements & profile" },
    summary: {
      es: "El nivel que piden los entrenadores, cómo se monta un vídeo que abran hasta el final, qué inglés necesitas y cuándo hay que empezar.",
      en: "The level coaches ask for, how to build a video they watch to the end, the English you need and when to start.",
    },
    sections: [
      {
        id: "nivel",
        title: { es: "Qué nivel deportivo piden", en: "What athletic level is required" },
        body: {
          es: [
            "Nivel competitivo: Liga Preferente, Nacional, División de Honor, Regional o el equivalente en tu país. Lo que un entrenador quiere ver es que compites de forma regular contra rivales de tu nivel, no un puñado de buenas jugadas sueltas.",
            "Los entrenadores piden currículum deportivo y vídeos de respaldo, incluidos partidos completos. El partido completo es el que demuestra lo que el vídeo de highlights no puede: tu posicionamiento sin balón, tu lectura del juego y tu ritmo durante noventa minutos.",
          ],
          en: [
            "Competitive level: top regional, national, first division or the equivalent in your country. What a coach wants to see is that you compete regularly against opponents at your level, not a handful of isolated good plays.",
            "Coaches ask for an athletic CV and supporting videos, including full matches. The full match shows what a highlight reel cannot: your positioning off the ball, your reading of the game and your rhythm over ninety minutes.",
          ],
        },
      },
      {
        id: "video",
        title: { es: "El vídeo de highlights", en: "The highlight video" },
        body: {
          es: [
            "De 4 a 6 minutos con tus mejores jugadas. Es lo primero que abre un entrenador y, muchas veces, lo único que verá si los primeros treinta segundos no le convencen. Por eso las mejores acciones van al principio, no reservadas para el final.",
            "Lo preparamos contigo: qué incluir, en qué orden y cómo montarlo. En nuestro canal de YouTube puedes ver ejemplos reales de jugadores que ya han firmado.",
          ],
          en: [
            "Four to six minutes of your best plays. It is the first thing a coach opens and often the only thing they will watch if the first thirty seconds do not convince them. That is why your best actions go at the start, not saved for the end.",
            "We prepare it with you: what to include, in what order and how to edit it. On our YouTube channel you can see real examples from players who have already signed.",
          ],
        },
      },
      {
        id: "academico",
        title: { es: "Formación académica y edad", en: "Academic background and age" },
        body: {
          es: [
            "Hace falta tener el bachillerato terminado o estar cursando el último año, con una edad de entre 16 y 23 años. El programa también aplica a graduados que quieran cursar un máster en Estados Unidos.",
            "Tu expediente cuenta más de lo que la mayoría imagina: un buen GPA abre puertas a mejores becas y a universidades más exigentes, y puede compensar un perfil deportivo algo más justo.",
          ],
          en: [
            "You need to have finished high school or be in your final year, aged between 16 and 23. The program also applies to graduates who want to pursue a master's degree in the United States.",
            "Your academic record counts for more than most people imagine: a strong GPA opens the door to better scholarships and more selective universities, and it can offset a slightly tighter athletic profile.",
          ],
        },
      },
      {
        id: "ingles",
        title: { es: "El nivel de inglés", en: "Your English level" },
        body: {
          es: [
            "No es obligatorio de entrada ser bilingüe, pero sí tendrás que demostrar un nivel mínimo mediante TOEFL, IELTS o Duolingo English Test, según la universidad. Un nivel intermedio-alto suele bastar para superar la prueba exigida.",
            "Recomendamos el Duolingo English Test: lo haces desde casa, los resultados llegan en unas 48 horas y lo aceptan más de 4.000 universidades. El mínimo de elegibilidad habitual está en 95. El TOEFL es más caro y requiere cita, pero está más reconocido en los programas de División I de élite, donde el mínimo suele ser 61.",
            "Si tu nivel actual no llega, te orientamos para prepararlo dentro del calendario del proceso, de forma que el examen no se convierta en el cuello de botella cuando ya hay universidades interesadas.",
          ],
          en: [
            "You do not need to be bilingual up front, but you will have to show a minimum level through TOEFL, IELTS or the Duolingo English Test, depending on the university. An upper-intermediate level is usually enough to pass the required test.",
            "We recommend the Duolingo English Test: you take it from home, results arrive in about 48 hours and more than 4,000 universities accept it. The usual eligibility minimum is 95. The TOEFL costs more and needs an appointment, but it carries more weight at elite Division I programs, where the minimum is typically 61.",
            "If your current level falls short, we guide you on preparing it within the process timeline, so the exam does not become the bottleneck once universities are already interested.",
          ],
        },
      },
      {
        id: "cuando",
        title: { es: "Cuándo empezar", en: "When to start" },
        body: {
          es: [
            "De media, el proceso dura entre 9 y 18 meses desde que empezamos a trabajar contigo hasta que te incorporas. La mayoría de jugadores entran en agosto, para la temporada de otoño, que es cuando se juega la competición oficial.",
            "Los entrenadores trabajan con un presupuesto anual fijo que asignan por orden de llegada. Empezar con tiempo no es una recomendación de manual: es la diferencia entre encontrar el presupuesto intacto o repartido.",
          ],
          en: [
            "On average the process takes between 9 and 18 months from when we start working with you until you enrol. Most players start in August, for the fall season, when the official competition is played.",
            "Coaches work with a fixed annual budget they assign on a first-come basis. Starting early is not textbook advice: it is the difference between finding the budget intact or already spread around.",
          ],
        },
      },
    ],
  },
  {
    slug: "visado-y-documentacion",
    image: imgVisado,
    number: "04",
    title: { es: "Visado y documentación", en: "Visa & paperwork" },
    summary: {
      es: "La visa F-1, la entrevista en el consulado y la lista de documentos que te vamos a pedir.",
      en: "The F-1 visa, the consulate interview and the list of documents we will ask you for.",
    },
    sections: [
      {
        id: "f1",
        title: { es: "La visa de estudiante F-1", en: "The F-1 student visa" },
        body: {
          es: [
            "Cuando una universidad te acepta, te ayudamos con la solicitud junto al departamento internacional de la universidad. Al estar admitido en una institución acreditada el proceso suele ser sencillo.",
            "Dicho esto, la aprobación final la deciden las autoridades migratorias, no nosotros ni la universidad. Cualquiera que te garantice un visado te está vendiendo algo que no puede cumplir.",
          ],
          en: [
            "Once a university accepts you, we help with the application alongside the university's international department. Being admitted to an accredited institution usually makes the process straightforward.",
            "That said, final approval rests with immigration authorities, not with us or the university. Anyone guaranteeing you a visa is selling something they cannot deliver.",
          ],
        },
      },
      {
        id: "entrevista",
        title: { es: "La entrevista en el consulado", en: "The consulate interview" },
        body: {
          es: [
            "No hace falta viajar a Estados Unidos para la admisión ni para la mayoría de los trámites, que se hacen online. Sí es necesario acudir a la entrevista de visado, que en España se realiza en el Consulado General de Estados Unidos en Madrid.",
            "Y, por supuesto, el viaje final para incorporarte a la universidad.",
          ],
          en: [
            "You do not need to travel to the United States for admissions or for most of the paperwork, which is done online. You do need to attend the visa interview, held in Spain at the U.S. Consulate General in Madrid.",
            "And, of course, the final trip to enrol at the university.",
          ],
        },
      },
      {
        id: "i20",
        title: { es: "El I-20, la llave de todo", en: "The I-20, the key to everything" },
        body: {
          es: [
            "Cuando la universidad confirma tu admisión y tu elegibilidad, emite el formulario I-20: el documento oficial que acredita tu matrícula como estudiante internacional. Sin él no puedes ni empezar la solicitud de visado.",
            "Lo vas a necesitar en la cita de la embajada y también al llegar a la frontera estadounidense, así que guárdalo bien y haz una copia de respaldo en cuanto lo recibas.",
          ],
          en: [
            "Once the university confirms your admission and eligibility, it issues the I-20 form: the official document certifying your enrolment as an international student. Without it you cannot even start the visa application.",
            "You will need it at the embassy appointment and again when you reach the U.S. border, so keep it safe and make a backup copy as soon as it arrives.",
          ],
        },
      },
      {
        id: "fases",
        title: { es: "Las cuatro fases del visado", en: "The four visa phases" },
        body: {
          es: [
            "El proceso sigue cuatro pasos consecutivos: completar el formulario DS-160, crear la cuenta en el portal de la embajada y pagar y confirmar la cita, abonar la tarifa SEVIS y presentarte a la entrevista.",
            "Cada uno de esos costes se paga directamente al gobierno de Estados Unidos. Nosotros entregamos una guía detallada y resolvemos las dudas de cada fase, pero el trámite lo ejecutáis el jugador y la familia: la responsabilidad final siempre recae en quien solicita.",
            "Un apunte de calendario: el proceso de visado no empieza hasta que tienes la aceptación universitaria oficial y el I-20 en la mano. Antes de eso, simplemente no aplica.",
          ],
          en: [
            "The process follows four consecutive steps: completing the DS-160 form, creating the embassy portal account and paying for and confirming the appointment, paying the SEVIS fee, and attending the interview.",
            "Each of those costs is paid directly to the U.S. government. We provide a detailed guide and answer questions at every phase, but the player and family carry out the procedure: final responsibility always rests with the applicant.",
            "A scheduling note: the visa process does not start until you have your official university acceptance and the I-20 in hand. Before that, it simply does not apply.",
          ],
        },
      },
      {
        id: "documentos",
        title: { es: "Qué documentación hay que entregar", en: "What documents you need to provide" },
        body: {
          es: [
            "Expediente académico, pasaporte, vídeo de highlights, historial de clubes y licencias federativas, informe médico y el registro en el NCAA Eligibility Center.",
            "Te pasamos el checklist completo al empezar y te vamos pidiendo cada documento a su tiempo, para que no tengas que reunirlo todo de golpe.",
          ],
          en: [
            "Academic transcript, passport, highlight video, club history and federation licences, medical report, and registration with the NCAA Eligibility Center.",
            "We give you the full checklist at the start and request each document at the right time, so you do not have to gather everything at once.",
          ],
        },
      },
    ],
  },
  {
    slug: "costes-y-financiacion",
    image: imgCostes,
    number: "05",
    title: { es: "Costes y financiación", en: "Costs & funding" },
    summary: {
      es: "Cuánto cuesta un año sin beca, qué queda por pagar según tu porcentaje, cómo se paga a la universidad y qué tasas hay que prever.",
      en: "What a year costs without a scholarship, what is left to pay at your percentage, how to pay the university and which fees to plan for.",
    },
    sections: [
      {
        id: "que-cubre",
        title: { es: "Qué cubre la beca y qué no", en: "What the scholarship covers and what it does not" },
        body: {
          es: [
            "Depende de la oferta. En fútbol, las becas que gestionamos van del 75% al 100% y cubren matrícula, alojamiento y comida. Si es parcial, la diferencia la cubre la familia.",
            "En la evaluación gratuita te decimos qué esperar según tu nivel, para que la conversación económica ocurra al principio y no cuando ya hay una oferta encima de la mesa.",
          ],
          en: [
            "It depends on the offer. In football, the scholarships we handle range from 75% to 100% and cover tuition, housing and meals. If it is partial, the family covers the difference.",
            "In the free evaluation we tell you what to expect based on your level, so the financial conversation happens at the start and not once an offer is already on the table.",
          ],
        },
      },
      {
        id: "coste-real",
        title: { es: "Cuánto cuesta un año sin beca", en: "What a year costs without a scholarship" },
        body: {
          es: [
            "Antes de hablar de lo que cubre la beca conviene saber de qué cifra partimos. Un estudiante internacional sin beca paga de media unos 50.000 dólares al año en una universidad estadounidense, y esa cifra no es solo matrícula.",
            "El reparto aproximado es el siguiente. Conocerlo importa porque cada universidad negocia qué partidas cubre su beca, y dos ofertas del mismo porcentaje pueden dejar a la familia con facturas muy distintas.",
          ],
          en: [
            "Before talking about what the scholarship covers, it helps to know the starting figure. An international student without a scholarship pays an average of around $50,000 a year at a U.S. university, and that figure is not just tuition.",
            "The rough breakdown is below. Knowing it matters because each university negotiates which lines its scholarship covers, and two offers at the same percentage can leave a family with very different bills.",
          ],
        },
        table: {
          caption: {
            es: "Promedios anuales orientativos en dólares. Varían mucho según el estado y el tipo de institución.",
            en: "Indicative annual averages in U.S. dollars. They vary widely by state and type of institution.",
          },
          columns: {
            es: ["Partida", "Qué incluye", "Coste anual"],
            en: ["Line", "What it covers", "Annual cost"],
          },
          rows: [
            {
              es: ["Matrícula y tasas", "Tuition & fees", "$25.000–35.000"],
              en: ["Tuition & fees", "Classes and university charges", "$25,000–35,000"],
            },
            {
              es: ["Alojamiento y comidas", "Room & board", "$10.000–14.000"],
              en: ["Room & board", "Housing and meal plan", "$10,000–14,000"],
            },
            {
              es: ["Seguro médico y servicios", "Cobertura obligatoria y servicios al estudiante", "$1.500–2.500"],
              en: ["Health insurance & services", "Mandatory cover and student services", "$1,500–2,500"],
            },
            {
              es: ["Material académico", "Libros y equipo informático", "$1.000–1.500"],
              en: ["Academic materials", "Books and computer equipment", "$1,000–1,500"],
            },
            {
              es: ["Transporte y gastos personales", "Vuelos, transporte local y día a día", "$2.000–3.000"],
              en: ["Travel & personal expenses", "Flights, local transport and daily life", "$2,000–3,000"],
            },
          ],
          total: {
            es: ["Coste medio anual sin beca", "≈ $50.000"],
            en: ["Average annual cost without a scholarship", "≈ $50,000"],
          },
        },
      },
      {
        id: "que-queda",
        title: { es: "Qué queda por pagar según tu beca", en: "What is left to pay depending on your scholarship" },
        body: {
          es: [
            "Las becas que gestionamos en fútbol van del 75% al 100%. Sobre un coste medio de 50.000 dólares, eso deja un restante anual de entre cero y unos 12.500 dólares, al que hay que sumar lo que la beca no cubre nunca: vuelos internacionales, libros, gastos personales y algún seguro complementario.",
            "Es la cuenta que conviene hacer en la primera llamada, no cuando ya hay una oferta encima de la mesa. Por eso el presupuesto familiar es una de las primeras cosas que fijamos contigo: sirve para descartar universidades que nunca habrían encajado y concentrar el esfuerzo donde sí hay margen real.",
            "Y ojo a un matiz: dos ofertas del mismo porcentaje no valen lo mismo. Una beca del 80% que cubre matrícula, alojamiento y comida deja mucho menos pendiente que otra del 80% calculada solo sobre la matrícula.",
          ],
          en: [
            "The football scholarships we handle range from 75% to 100%. On an average cost of $50,000, that leaves an annual remainder of between zero and around $12,500, on top of what a scholarship never covers: international flights, books, personal expenses and any supplementary insurance.",
            "This is the calculation worth doing on the first call, not once an offer is already on the table. That is why the family budget is one of the first things we set with you: it rules out universities that were never going to fit and concentrates the effort where there is real room.",
            "And one nuance: two offers at the same percentage are not worth the same. An 80% scholarship covering tuition, housing and meals leaves far less outstanding than another 80% calculated on tuition alone.",
          ],
        },
      },
      {
        id: "ayudas",
        title: { es: "Otras vías para cubrir el resto", en: "Other ways to cover the remainder" },
        body: {
          es: [
            "La beca deportiva no es la única palanca. Las ayudas académicas por expediente se suman a la deportiva y las concede la universidad al margen del equipo, así que un buen GPA puede recortar el restante sin tocar el presupuesto del entrenador.",
            "Con el visado F-1 también puedes trabajar dentro del campus hasta 20 horas semanales durante el curso: biblioteca, gimnasio, cafetería o tutorías. No resuelve un año entero, pero cubre buena parte de los gastos personales.",
            "A eso se añaden las ayudas institucionales propias de cada universidad y los planes de pago a plazos que casi todas ofrecen a través de su Business Office.",
          ],
          en: [
            "The athletic scholarship is not the only lever. Academic aid based on your record stacks on top of the athletic one and is awarded by the university independently of the team, so a strong GPA can cut the remainder without touching the coach's budget.",
            "With an F-1 visa you can also work on campus up to 20 hours a week during term: library, gym, dining hall or tutoring. It will not cover a whole year, but it covers a good share of personal expenses.",
            "On top of that come each university's own institutional aid and the instalment plans almost all of them offer through their Business Office.",
          ],
        },
      },
      {
        id: "pagos",
        title: { es: "Cómo se paga a la universidad (y cómo no)", en: "How to pay the university (and how not to)" },
        body: {
          es: [
            "Esta sección existe por una razón: las estafas a familias internacionales son reales y suelen aparecer justo en este punto, cuando hay prisa y mucho dinero en juego.",
            "Los pagos se hacen siempre de forma directa a la institución, por los canales oficiales de su Business Office. Nunca a un intermediario, nunca a una cuenta personal y nunca a nosotros. Lo habitual son plataformas como Flywire, Convera o PayMyTuition, tarjeta internacional o transferencia bancaria cuando la universidad la exige.",
            "Tres comprobaciones antes de enviar nada: que el portal de pago esté en el dominio oficial de la universidad, que la cuenta de destino sea institucional y que tengas la factura con el importe exacto emitida tras la admisión. Guarda todos los justificantes y avisa al Business Office cuando el pago salga.",
            "Los plazos suelen vencer antes del inicio del semestre, en julio o agosto para otoño y en diciembre o enero para primavera. Evita dejar la transferencia para un festivo estadounidense: los bancos no procesan y el plazo no se mueve.",
          ],
          en: [
            "This section exists for a reason: scams targeting international families are real and tend to appear at exactly this point, when there is time pressure and a lot of money at stake.",
            "Payments are always made directly to the institution, through its Business Office's official channels. Never to an intermediary, never to a personal account and never to us. The usual routes are platforms such as Flywire, Convera or PayMyTuition, an international card, or a bank transfer when the university requires one.",
            "Three checks before sending anything: that the payment portal sits on the university's official domain, that the destination account is institutional, and that you hold the invoice with the exact amount issued after admission. Keep every receipt and notify the Business Office once the payment goes out.",
            "Deadlines usually fall before the semester starts, in July or August for the fall and December or January for the spring. Avoid leaving the transfer for a U.S. public holiday: banks do not process and the deadline does not move.",
          ],
        },
      },
      {
        id: "no-incluido",
        title: { es: "Lo que la beca no cubre", en: "What the scholarship does not cover" },
        body: {
          es: [
            "Aunque la beca llegue al 100%, hay una serie de trámites obligatorios que corren siempre por cuenta de la familia: el registro de elegibilidad, el examen de inglés, la legalización y traducción de los documentos académicos, las tasas del visado y el seguro médico que exige la universidad.",
            "No son sorpresas ni letra pequeña: son tasas que se pagan directamente a cada organismo. Las tienes todas desglosadas en el apartado siguiente para que puedas calcular el total antes de empezar.",
          ],
          en: [
            "Even when the scholarship reaches 100%, a set of mandatory steps is always covered by the family: eligibility registration, the English test, legalising and translating academic documents, visa fees and the health insurance the university requires.",
            "These are not surprises or small print: they are fees paid directly to each body. They are all broken down in the next section so you can work out the total before starting.",
          ],
        },
      },
      {
        id: "tramites",
        title: { es: "Los costes de trámites", en: "Paperwork costs" },
        body: {
          es: [
            "Esta es la tabla completa de tasas obligatorias, para que podáis calcular el aproximado antes de empezar. Cada concepto se paga directamente al organismo correspondiente.",
          ],
          en: [
            "This is the full table of mandatory fees, so you can work out the approximate total before starting. Each item is paid directly to the relevant body.",
          ],
        },
        table: {
          caption: {
            es: "Importes orientativos en dólares. Pueden variar según el país de origen y el proveedor.",
            en: "Indicative amounts in U.S. dollars. They can vary by country of origin and provider.",
          },
          columns: {
            es: ["Concepto", "Cuándo se paga", "Coste"],
            en: ["Item", "When it is paid", "Cost"],
          },
          rows: [
            {
              es: ["NCAA Eligibility Center", "Al iniciar la etapa de elegibilidad", "$170"],
              en: ["NCAA Eligibility Center", "When the eligibility stage begins", "$170"],
            },
            {
              es: ["Examen de inglés (Duolingo o TOEFL)", "Antes de presentar la prueba", "$60–80"],
              en: ["English test (Duolingo or TOEFL)", "Before sitting the test", "$60–80"],
            },
            {
              es: ["Apostilla de documentos académicos", "Al legalizar notas y diplomas", "$20–30"],
              en: ["Apostille of academic documents", "When legalising transcripts and diplomas", "$20–30"],
            },
            {
              es: ["Traducción oficial al inglés", "Al traducir cada documento", "$15"],
              en: ["Certified translation into English", "Per document translated", "$15"],
            },
            {
              es: ["Solicitud de admisión universitaria", "Al formalizar la oferta del coach", "$25"],
              en: ["University application fee", "When formalising the coach's offer", "$25"],
            },
            {
              es: ["Tarifa SEVIS (I-901)", "Al recibir el formulario I-20", "$350"],
              en: ["SEVIS fee (I-901)", "On receiving the I-20 form", "$350"],
            },
            {
              es: ["Arancel consular de visado (MRV)", "Al agendar la cita en la embajada", "$185"],
              en: ["Consular visa fee (MRV)", "When booking the embassy appointment", "$185"],
            },
            {
              es: ["Seguro médico internacional", "Anual, antes de iniciar el semestre", "$500–800"],
              en: ["International health insurance", "Annually, before the semester starts", "$500–800"],
            },
          ],
          total: {
            es: ["Total aproximado, primer año incluido", "≈ $1.345–1.655"],
            en: ["Approximate total, first year included", "≈ $1,345–1,655"],
          },
        },
      },
      {
        id: "sin-ofertas",
        title: { es: "Qué pasa si no llegan ofertas", en: "What happens if no offers arrive" },
        body: {
          es: [
            "Trabajar con todo el abanico de divisiones existe precisamente para que esto pase lo menos posible: cuantas más puertas, más probabilidades reales. Y antes de aceptar a nadie hacemos una evaluación gratuita, porque solo tomamos casos cuando estamos seguros de que podemos ayudar.",
            "Si aun así el proceso no avanza como esperábamos, lo hablamos con total transparencia con la familia para decidir juntos los siguientes pasos. Las condiciones concretas las repasamos contigo en la llamada, antes de que firmes nada.",
          ],
          en: [
            "Working across the whole range of divisions exists precisely so this happens as rarely as possible: more doors, better real odds. And before taking anyone on we run a free evaluation, because we only accept cases when we are confident we can help.",
            "If the process still does not move as expected, we discuss it openly with the family and decide the next steps together. The specific terms are something we go through with you on the call, before you sign anything.",
          ],
        },
      },
    ],
  },
  {
    slug: "vida-universitaria",
    image: imgVida,
    number: "06",
    title: { es: "Vida universitaria en EE.UU.", en: "College life in the U.S." },
    summary: {
      es: "Cómo es el día a día de un student-athlete: entrenamientos, clases, instalaciones y qué pasa si te lesionas.",
      en: "What a student-athlete's day looks like: training, classes, facilities and what happens if you get injured.",
    },
    sections: [
      {
        id: "competicion",
        title: { es: "Fútbol de alta competición", en: "High-level competition" },
        body: {
          es: [
            "Compites en ligas universitarias televisadas frente a ojeadores de la MLS y equipos internacionales. El fútbol universitario es una de las vías de entrada directa a ligas como la MLS, cuyo draft se nutre principalmente de jugadores que vienen del nivel universitario.",
            "Y si tu camino no acaba siendo el profesional, te gradúas con un título americano.",
          ],
          en: [
            "You compete in televised college leagues in front of MLS scouts and international teams. College soccer is one of the direct routes into leagues like MLS, whose draft draws mainly on players coming out of the college game.",
            "And if the professional path does not end up being yours, you graduate with an American degree.",
          ],
        },
      },
      {
        id: "lesiones",
        title: { es: "Qué pasa si te lesionas", en: "What happens if you get injured" },
        body: {
          es: [
            "Estás cubierto por el seguro deportivo oficial de la universidad. Una lesión deportiva no pone en riesgo tu beca, siempre que mantengas tu elegibilidad académica.",
            "Esa última condición es la importante: lo que puede costarte la beca no es la lesión, son las notas.",
          ],
          en: [
            "You are covered by the university's official athletic insurance. A sports injury does not put your scholarship at risk, as long as you keep your academic eligibility.",
            "That last condition is the important one: what can cost you the scholarship is not the injury, it is your grades.",
          ],
        },
      },
      {
        id: "carrera",
        title: { es: "Qué carrera puedes estudiar", en: "What you can study" },
        body: {
          es: [
            "Puedes elegir la que más te interese. La tenemos en cuenta al buscar universidades, porque no todas ofrecen los mismos programas y de nada sirve una gran beca en un campus donde no está tu carrera.",
          ],
          en: [
            "You can choose whichever interests you most. We factor it into the university search, because not all of them offer the same programs and a great scholarship is worth little on a campus that does not teach your degree.",
          ],
        },
      },
      {
        id: "alojamiento",
        image: { src: imgOffCampus, alt: { es: "Apartamentos para estudiantes fuera del campus", en: "Student apartments off campus" } },
        title: { es: "Alojamiento: dentro o fuera del campus", en: "Housing: on or off campus" },
        body: {
          es: [
            "Vivir dentro del campus significa alojarse en las residencias de la universidad, normalmente en habitación compartida y con plan de comidas incluido. Tienes las clases, el gimnasio y los campos a pocos minutos andando, y entras de lleno en la vida del campus desde el primer día. Para un internacional recién llegado es, con diferencia, la transición más fácil.",
            "Fuera del campus implica alquilar piso o casa cerca de la universidad. Da más independencia, te permite cocinar y gestionar tus propios gastos, y se parece más a la vida adulta. A cambio, asumes el transporte, los suministros y una logística diaria que el primer año resta energía.",
            "La mayoría de universidades recomiendan o directamente exigen vivir dentro del campus los primeros cursos, precisamente para que la adaptación académica y social no dependa de ti solo. Cuando llega el momento de decidir, el dato que conviene mirar no es solo el alquiler: es cuánto cuesta el plan de comidas aparte y si tu beca cubría el alojamiento que estás dejando.",
          ],
          en: [
            "Living on campus means staying in university housing, usually in a shared room and with a meal plan included. Classes, the gym and the fields are a few minutes' walk away, and you are part of campus life from day one. For a newly arrived international athlete it is by far the easiest transition.",
            "Living off campus means renting a flat or house near the university. It gives you more independence, lets you cook and manage your own expenses, and feels closer to adult life. In exchange you take on transport, utilities and a daily logistics load that drains energy in your first year.",
            "Most universities recommend or outright require living on campus for the first years, precisely so your academic and social adjustment does not rest on you alone. When the time comes to decide, the number to look at is not just the rent: it is how much the meal plan costs separately and whether your scholarship was covering the housing you are giving up.",
          ],
        },
      },
      {
        id: "dia-a-dia",
        image: { src: imgDining, alt: { es: "Comedor universitario en un campus estadounidense", en: "Dining hall on a U.S. university campus" } },
        title: { es: "Un día cualquiera de un student-athlete", en: "A typical student-athlete day" },
        body: {
          es: [
            "La palabra clave es compaginar. Un día tipo combina clases por la mañana, sesión de gimnasio o prevención a mediodía, entrenamiento por la tarde y, en muchos programas, horas obligatorias de estudio supervisado. Los fines de semana se llenan de partido y viaje: las distancias en Estados Unidos hacen que desplazarse a jugar sea parte de la rutina, no una excepción.",
            "La estructura es más exigente de lo que la mayoría espera, pero también más cuidada: tienes acceso a gimnasios con material profesional, campos de césped natural y artificial, salas de fisioterapia y recuperación, y preparadores físicos que siguen tu rendimiento semana a semana. Los comedores del campus ofrecen menús pensados para deportistas.",
            "Fuera del fútbol y las clases queda margen para clubes estudiantiles, asociaciones internacionales, voluntariados o un empleo dentro del campus. No es relleno de currículum: es donde se practica el inglés de verdad y donde se construyen las amistades que sostienen el primer año.",
            "Y conviene decirlo sin adornos: los primeros meses cuestan. Echar de menos casa es normal y le pasa a casi todo el mundo. Las universidades tienen una International Office con apoyo y orientación para estudiantes internacionales, y nuestros fundadores pasaron por ahí, así que durante tu primer año mantenemos revisiones periódicas para que nada se enquiste.",
          ],
          en: [
            "The key word is juggling. A typical day combines morning classes, a gym or prevention session at midday, training in the afternoon and, in many programs, mandatory supervised study hours. Weekends fill up with matches and travel: distances in the United States make travelling to play part of the routine, not an exception.",
            "The structure is more demanding than most people expect, but also better supported: you get gyms with professional equipment, natural and artificial grass pitches, physiotherapy and recovery rooms, and strength coaches tracking your performance week by week. Campus dining halls offer menus built for athletes.",
            "Beyond football and classes there is room for student clubs, international associations, volunteering or a job on campus. This is not CV filler: it is where you actually practise English and build the friendships that carry you through the first year.",
            "And it is worth saying plainly: the first months are hard. Missing home is normal and happens to almost everyone. Universities have an International Office with support and guidance for international students, and our founders went through it themselves, so during your first year we keep regular check-ins so nothing festers.",
          ],
        },
      },
    ],
  },
];

export const findGuide = (slug?: string) => guides.find((g) => g.slug === slug);
