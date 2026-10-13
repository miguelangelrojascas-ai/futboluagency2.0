import { useState } from "react";
import { Link } from "react-router-dom";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  CalendarClock,
  ClipboardList,
  FileText,
  GraduationCap,
  HeartPulse,
  HelpCircle,
  Languages,
  ListChecks,
  MapPin,
  Plane,
  Plus,
  Receipt,
  RefreshCcw,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Trophy,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

type Faq = {
  icon: LucideIcon;
  q: string;
  a: string;
  /** Optional in-answer link rendered under the text. */
  link?: { to: string; label: string };
};

type FaqGroup = { label: string; items: Faq[] };

const PROFILES_ANCHOR = "/usa#perfiles";

const GROUPS_ES: FaqGroup[] = [
  {
    label: "La agencia",
    items: [
      {
        icon: HelpCircle,
        q: "¿Qué es FutbolUAgency y cómo me ayuda a conseguir una beca?",
        a: "FutbolUAgency LLC es una agencia deportiva española, registrada en Estados Unidos, que ayuda a futbolistas internacionales a conseguir una beca para estudiar y competir en universidades estadounidenses. Analizamos tu perfil, preparamos el material que los entrenadores necesitan ver, negociamos tu beca con ellos y te acompañamos con la admisión y la visa hasta que llegas al campus.",
      },
      {
        icon: Award,
        q: "¿Qué nos hace diferentes?",
        a: "La fundaron estudiantes-atletas que se quedaron sin el apoyo que esperaban de sus agencias. Por eso cada familia tiene un agente personal desde el primer día y solo aceptamos un caso cuando estamos seguros de que podemos ayudarlo.",
      },
      {
        icon: Users,
        q: "¿Podemos hablar con familias que ya hayan pasado por esto?",
        a: "Sí. Si os resulta útil, os ponemos en contacto con familias y jugadores que ya están estudiando y compitiendo en Estados Unidos para que os cuenten su experiencia de primera mano.",
      },
      {
        icon: ClipboardList,
        q: "¿Qué incluye el servicio y cuánto dura el acompañamiento?",
        a: "Incluye la evaluación deportiva y académica, el vídeo de highlights, tu perfil de jugador para entrenadores, el contacto y la negociación con ellos, la búsqueda de becas, la gestión de los exámenes de idioma, el proceso de admisión, la certificación de elegibilidad, el trámite del visado y la preparación del viaje. El acompañamiento dura los cuatro años de carrera: si surge un problema académico, deportivo o personal, o necesitas cambiar de universidad (transfer), seguimos ahí.",
      },
    ],
  },
  {
    label: "Becas y universidades",
    items: [
      {
        icon: GraduationCap,
        q: "¿Qué es una beca deportiva y qué cubre?",
        a: "Es una ayuda que una universidad te ofrece a cambio de competir en su equipo. Según tu perfil y la universidad, puede cubrir parte o casi todos los costes de estudio y vida: matrícula, alojamiento y comida. El importe final lo decide cada universidad.",
      },
      {
        icon: Wallet,
        q: "¿La beca cubre todos los gastos?",
        a: "Depende de la oferta. En fútbol, las becas que gestionamos van del 75% al 100%. Si es parcial, la diferencia la cubre la familia. En la evaluación gratuita te decimos qué esperar según tu nivel.",
      },
      {
        icon: Building2,
        q: "¿Con qué universidades y divisiones trabajamos?",
        a: "Con programas de NCAA División I, II y III, NAIA y NJCAA. Trabajar con todo el abanico es justo lo que multiplica tus opciones reales. Buscamos el equilibrio entre tu nivel de juego, tus metas académicas y lo que espera tu familia.",
      },
      {
        icon: Wallet,
        q: "¿Qué tipos de beca existen?",
        a: "Principalmente dos, y muchas veces se combinan: la deportiva, que concede el propio programa de fútbol, y la académica, que depende de tu expediente. El porcentaje varía según la universidad, la división y tu nivel, y no siempre llega al 100%.",
      },
      {
        icon: Users,
        q: "¿Quién elige la universidad final?",
        a: "Tú y tu familia, siempre. Nosotros presentamos opciones reales, con los datos del programa de fútbol, la carrera, el campus y la beca ofrecida, y os acompañamos en la decisión. La última palabra es vuestra.",
      },
      {
        icon: BookOpen,
        q: "¿Puedo estudiar cualquier carrera?",
        a: "Puedes elegir la que más te interese. La tenemos en cuenta al buscar universidades, porque no todas ofrecen los mismos programas.",
      },
      {
        icon: Trophy,
        q: "¿Es posible jugar profesionalmente?",
        a: "Sí. El fútbol universitario es una de las vías de entrada directa a ligas como la MLS, cuyo draft se nutre principalmente de jugadores que vienen del nivel universitario. Y si tu camino no acaba siendo el profesional, te gradúas con un título americano.",
      },
      {
        icon: HeartPulse,
        q: "¿Qué pasa si me lesiono?",
        a: "Estás cubierto por el seguro deportivo oficial de la universidad. Una lesión deportiva no pone en riesgo tu beca, siempre que mantengas tu elegibilidad académica.",
      },
      {
        icon: ScrollText,
        q: "¿Puedo optar a un máster?",
        a: "Sí. El programa también aplica a graduados que quieran cursar un máster en EE.UU.",
      },
    ],
  },
  {
    label: "Requisitos y proceso",
    items: [
      {
        icon: ListChecks,
        q: "¿Qué necesito para aplicar?",
        a: "Tres cosas: un vídeo destacado de 4 a 6 minutos con tus mejores jugadas; haber terminado el bachillerato o estar en tu último año, con una edad de entre 16 y 23 años; y una puntuación válida en una prueba de inglés. Con eso ya puedes recibir ofertas.",
      },
      {
        icon: Languages,
        q: "¿Necesito hablar inglés perfectamente?",
        a: "No es obligatorio de entrada, pero sí tendrás que demostrar un nivel mínimo mediante TOEFL, IELTS o Duolingo English Test, según la universidad. Si tu nivel actual no llega, te orientamos para prepararlo dentro del calendario del proceso.",
      },
      {
        icon: TrendingUp,
        q: "¿Qué nivel deportivo necesito?",
        a: "Nivel competitivo: Liga Preferente, Nacional, División de Honor, Regional o equivalente en tu país. Los entrenadores piden currículum deportivo y vídeos de respaldo, incluidos partidos completos. Si dudas de tu nivel, la evaluación gratuita te da una respuesta clara.",
        link: { to: PROFILES_ANCHOR, label: "Encuentra tu perfil" },
      },
      {
        icon: CalendarClock,
        q: "¿Cuándo debo empezar y cuánto tarda?",
        a: "De media, entre 9 y 18 meses desde que empezamos a trabajar contigo hasta que te incorporas. La mayoría de jugadores entran en agosto, para la temporada de otoño (fall), que es cuando se juega la competición oficial. Los entrenadores reparten un presupuesto anual fijo por orden de llegada, así que empezar con tiempo te da acceso a más fondos.",
      },
      {
        icon: ShieldAlert,
        q: "¿Afecta haber jugado en un equipo semiprofesional o profesional?",
        a: "Sí, y conviene revisarlo desde el primer día. La NCAA certifica tu estatus de amateur: haber firmado contratos, cobrado salarios o primas, o haber jugado en categoría sénior puede afectar a tu elegibilidad. NAIA y NJCAA tienen sus propias normas. Revisamos cada caso individualmente antes de presentarte a ninguna universidad.",
      },
      {
        icon: FileText,
        q: "¿Qué documentación hay que entregar?",
        a: "Expediente académico, pasaporte, vídeo de highlights, historial de clubes y licencias federativas, informe médico y el registro en el NCAA Eligibility Center. Te pasamos el checklist completo y te vamos pidiendo cada documento a su tiempo.",
      },
      {
        icon: Plane,
        q: "¿Cómo obtengo la visa de estudiante (F-1)?",
        a: "Cuando una universidad te acepta, te ayudamos con la solicitud junto al departamento internacional de la universidad. Al estar admitido en una institución acreditada el proceso suele ser sencillo, pero la aprobación final la deciden las autoridades migratorias, no nosotros.",
      },
    ],
  },
  {
    label: "Costes y trámites",
    items: [
      {
        icon: MapPin,
        q: "¿Hay que viajar a Estados Unidos durante el proceso?",
        a: "No para la admisión ni para la mayoría de trámites, que se hacen online. Sí para la entrevista de visado, que en España se realiza en el Consulado General de Estados Unidos en Madrid. Y, por supuesto, para la incorporación a la universidad.",
      },
      {
        icon: RefreshCcw,
        q: "¿Qué pasa si no llegan ofertas?",
        a: "Trabajamos con todo el abanico de divisiones justo para que eso pase lo menos posible. Y antes de aceptar a nadie hacemos la evaluación gratuita, porque solo tomamos casos cuando estamos seguros de poder ayudar. Si aun así el proceso no avanza, lo hablamos con transparencia con la familia y decidimos juntos los siguientes pasos.",
      },
      {
        icon: Receipt,
        q: "¿Qué gastos hay que tener en cuenta?",
        a: "Además de lo que cubra la beca, hay tasas obligatorias que se pagan directamente a cada organismo: registro de elegibilidad, examen de inglés, legalización y traducción de documentos, tasas del visado y seguro médico. Las tienes todas desglosadas en la guía de costes.",
        link: { to: "/recursos/costes-y-financiacion", label: "Ver la tabla de costes" },
      },
      {
        icon: ShieldCheck,
        q: "¿Qué probabilidades tengo de conseguir una beca?",
        a: "Para saberlo necesitamos tu perfil. Una vez lo evaluamos te contamos con claridad tus posibilidades: en FUA solo aceptamos deportistas cuando estamos seguros de que podemos ayudarlos.",
      },
    ],
  },
];

const GROUPS_EN: FaqGroup[] = [
  {
    label: "The agency",
    items: [
      {
        icon: HelpCircle,
        q: "What is FutbolUAgency and how does it help me get a scholarship?",
        a: "FutbolUAgency LLC is a Spanish sports agency, registered in the United States, that helps international footballers earn a scholarship to study and compete at U.S. universities. We analyse your profile, prepare the material coaches need to see, negotiate your scholarship with them, and guide you through admissions and the visa until you arrive on campus.",
      },
      {
        icon: Award,
        q: "What makes us different?",
        a: "It was founded by student-athletes who were left without the support they expected from their own agencies. That's why every family gets a personal agent from day one and we only take on a case when we are confident we can help.",
      },
      {
        icon: Users,
        q: "Can we talk to families who have already been through this?",
        a: "Yes. If it helps, we put you in touch with families and players already studying and competing in the United States so they can tell you about it first-hand.",
      },
      {
        icon: ClipboardList,
        q: "What does the service include and how long does the support last?",
        a: "It includes the athletic and academic evaluation, the highlight video, your player profile for coaches, outreach and negotiation with them, the scholarship search, managing the language exams, the admissions process, eligibility certification, the visa application and trip preparation. Support lasts all four years: if an academic, athletic or personal issue comes up, or you need to transfer, we are still there.",
      },
    ],
  },
  {
    label: "Scholarships & universities",
    items: [
      {
        icon: GraduationCap,
        q: "What is an athletic scholarship and what does it cover?",
        a: "It's financial aid a university offers you in exchange for competing on its team. Depending on your profile and the university, it can cover part or almost all of your study and living costs: tuition, housing and meals. The final amount is decided by each university.",
      },
      {
        icon: Wallet,
        q: "Does the scholarship cover every expense?",
        a: "It depends on the offer. In football, the scholarships we handle range from 75% to 100%. If it's partial, the family covers the difference. In the free evaluation we tell you what to expect based on your level.",
      },
      {
        icon: Building2,
        q: "Which universities and divisions do we work with?",
        a: "NCAA Division I, II and III programs, NAIA and NJCAA. Working across the whole range is exactly what multiplies your real options. We look for the balance between your level of play, your academic goals and what your family expects.",
      },
      {
        icon: Wallet,
        q: "What types of scholarship exist?",
        a: "Mainly two, and they are often combined: the athletic one, awarded by the soccer program itself, and the academic one, which depends on your record. The percentage varies by university, division and your level, and it doesn't always reach 100%.",
      },
      {
        icon: Users,
        q: "Who chooses the final university?",
        a: "You and your family, always. We present real options, with the details of the soccer program, the degree, the campus and the scholarship offered, and we support you through the decision. The final word is yours.",
      },
      {
        icon: BookOpen,
        q: "Can I study any major?",
        a: "You can choose whichever interests you most. We factor it into the university search, because not all of them offer the same programs.",
      },
      {
        icon: Trophy,
        q: "Is it possible to play professionally?",
        a: "Yes. College soccer is one of the direct routes into leagues like MLS, whose draft draws mainly on players coming out of the college game. And if the professional path isn't yours, you graduate with an American degree.",
      },
      {
        icon: HeartPulse,
        q: "What happens if I get injured?",
        a: "You're covered by the university's official athletic insurance. A sports injury doesn't put your scholarship at risk, as long as you keep your academic eligibility.",
      },
      {
        icon: ScrollText,
        q: "Can I apply for a master's degree?",
        a: "Yes. The program also applies to graduates who want to pursue a master's in the U.S.",
      },
    ],
  },
  {
    label: "Requirements & process",
    items: [
      {
        icon: ListChecks,
        q: "What do I need to apply?",
        a: "Three things: a highlight video of 4 to 6 minutes with your best plays; having finished high school or being in your final year, aged between 16 and 23; and a valid score on an English test. With that you can already receive offers.",
      },
      {
        icon: Languages,
        q: "Do I need to speak perfect English?",
        a: "It isn't required up front, but you will have to show a minimum level through TOEFL, IELTS or the Duolingo English Test, depending on the university. If your current level falls short, we guide you on preparing it within the process timeline.",
      },
      {
        icon: TrendingUp,
        q: "What athletic level do I need?",
        a: "Competitive level: top regional, national, first division or the equivalent in your country. Coaches ask for an athletic CV and supporting videos, including full matches. If you're unsure about your level, the free evaluation gives you a clear answer.",
        link: { to: PROFILES_ANCHOR, label: "Find your profile" },
      },
      {
        icon: CalendarClock,
        q: "When should I start and how long does it take?",
        a: "On average, 9 to 18 months from when we start working with you until you enrol. Most players start in August for the fall season, when the official competition is played. Coaches assign a fixed annual budget on a first-come basis, so starting early gives you access to more funds.",
      },
      {
        icon: ShieldAlert,
        q: "Does having played semi-pro or professionally affect me?",
        a: "Yes, and it's worth reviewing from day one. The NCAA certifies your amateur status: having signed contracts, received salaries or bonuses, or played at senior level can affect your eligibility. NAIA and NJCAA have their own rules. We review every case individually before presenting you to any university.",
      },
      {
        icon: FileText,
        q: "What documents do I need to provide?",
        a: "Academic transcript, passport, highlight video, club history and federation licences, medical report, and registration with the NCAA Eligibility Center. We give you the full checklist and request each document at the right time.",
      },
      {
        icon: Plane,
        q: "How do I get the student visa (F-1)?",
        a: "Once a university accepts you, we help with the application alongside the university's international department. Being admitted to an accredited institution usually makes the process straightforward, but final approval rests with immigration authorities, not with us.",
      },
    ],
  },
  {
    label: "Costs & paperwork",
    items: [
      {
        icon: MapPin,
        q: "Do we have to travel to the United States during the process?",
        a: "Not for admissions or most of the paperwork, which is done online. You do for the visa interview, held in Spain at the U.S. Consulate General in Madrid. And of course to travel out for enrolment.",
      },
      {
        icon: RefreshCcw,
        q: "What if no offers arrive?",
        a: "We work across the whole range of divisions precisely so that happens as rarely as possible. And before taking anyone on we run the free evaluation, because we only accept cases when we are confident we can help. If the process still does not move, we discuss it openly with the family and decide the next steps together.",
      },
      {
        icon: Receipt,
        q: "Which costs should we plan for?",
        a: "Beyond whatever the scholarship covers, there are mandatory fees paid directly to each body: eligibility registration, the English test, legalising and translating documents, visa fees and health insurance. They are all broken down in the costs guide.",
        link: { to: "/recursos/costes-y-financiacion", label: "See the cost table" },
      },
      {
        icon: ShieldCheck,
        q: "How likely am I to get a scholarship?",
        a: "To know that we need your profile. Once we evaluate it we tell you clearly what your chances are: at FUA we only take on athletes when we're confident we can help them.",
      },
    ],
  },
];

const FaqSection = () => {
  const { language } = useLanguage();
  const isEs = language === "es";
  const groups = isEs ? GROUPS_ES : GROUPS_EN;

  const [active, setActive] = useState(0);
  const activeGroup = groups[active];

  return (
    <section
      id="faq"
      className="section-padding"
      style={{ backgroundColor: "hsl(var(--section-alt))" }}
    >
      <div className="container-wide px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block font-body text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">
            FAQ
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            {isEs ? "Preguntas frecuentes" : "Frequently asked questions"}
          </h2>
          <p className="font-body text-muted-foreground text-base sm:text-lg leading-relaxed">
            {isEs
              ? "Todo lo que necesitas saber sobre becas deportivas en Estados Unidos."
              : "Everything you need to know about athletic scholarships in the United States."}
          </p>
        </div>

        {/* Category tabs */}
        <div
          role="tablist"
          aria-label={isEs ? "Categorías de preguntas" : "Question categories"}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10"
        >
          {groups.map((group, i) => {
            const isActive = i === active;
            return (
              <button
                key={group.label}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActive(i)}
                className={`font-body text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-full border transition-colors duration-200 ${
                  isActive
                    ? "bg-secondary text-white border-transparent"
                    : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {group.label}
              </button>
            );
          })}
        </div>

        {/* Questions for the active category */}
        <div className="max-w-3xl mx-auto">
          <AccordionPrimitive.Root
            key={activeGroup.label}
            type="single"
            collapsible
            className="flex flex-col gap-3"
          >
            {activeGroup.items.map((item, i) => {
              const Icon = item.icon;
              return (
                <AccordionPrimitive.Item
                  key={item.q}
                  value={`item-${i}`}
                  className="group/item border border-border rounded-xl overflow-hidden transition-colors duration-200 data-[state=open]:border-primary/40"
                  style={{ backgroundColor: "hsl(var(--card))" }}
                >
                  <AccordionPrimitive.Header className="flex">
                    <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between gap-4 px-4 sm:px-5 py-4 text-left transition-colors duration-200 data-[state=open]:bg-primary/[0.04]">
                      <span className="flex items-center gap-4 min-w-0">
                        <span className="shrink-0 grid place-items-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                          <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
                        </span>
                        <span className="font-body font-semibold text-foreground text-[15px] sm:text-base leading-snug group-hover/item:text-primary transition-colors">
                          {item.q}
                        </span>
                      </span>
                      <Plus
                        className="w-5 h-5 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]/item:rotate-45 group-data-[state=open]/item:text-primary"
                        strokeWidth={2}
                      />
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>

                  <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="px-4 sm:px-5 pb-5 sm:pl-[4.5rem]">
                      <p className="font-body text-muted-foreground text-[15px] leading-relaxed">
                        {item.a}
                      </p>
                      {item.link && (
                        <Link
                          to={item.link.to}
                          className="inline-flex items-center gap-1.5 mt-4 font-body text-sm font-bold text-primary hover:text-primary-hover transition-colors"
                        >
                          {item.link.label}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </AccordionPrimitive.Content>
                </AccordionPrimitive.Item>
              );
            })}
          </AccordionPrimitive.Root>

          <p className="mt-10 text-center font-body text-sm leading-relaxed text-muted-foreground">
            {isEs ? "¿Necesitas más detalle? Todo esto está explicado a fondo en " : "Need more detail? All of this is explained in depth in "}
            <Link
              to="/recursos"
              className="font-semibold text-primary underline-offset-4 transition-colors hover:text-primary-hover hover:underline"
            >
              {isEs ? "nuestras guías" : "our guides"}
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
