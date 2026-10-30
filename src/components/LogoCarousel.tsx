import ncaaLogoAsset from "@/assets/ncaa-new.png";
import naiaLogoAsset from "@/assets/naia-new.png";
import njcaaLogoAsset from "@/assets/njcaa-new.png";
import clemsonLogoAsset from "@/assets/clemson-new.png";
import wakeforestLogoAsset from "@/assets/wakeforest-new.png";
import uclaLogoAsset from "@/assets/ucla.png";
import williamPennLogoAsset from "@/assets/william-penn.png";
import stMarysLogoAsset from "@/assets/st-marys.svg";
import syracuseLogoAsset from "@/assets/syracuse-logo.png";
import pennstateLogoAsset from "@/assets/pennstate-logo.png";
import kentuckyLogoAsset from "@/assets/kentucky-logo.png";
import indianaLogoAsset from "@/assets/indiana-logo.png";
import pennWesternLogoAsset from "@/assets/penn-western-logo.svg";
import charlestonLogoAsset from "@/assets/charleston-logo.png";
import smuLogoAsset from "@/assets/smu-logo.png";
import ucfLogoAsset from "@/assets/ucf-logo.png";
import usfLogoAsset from "@/assets/usf-logo.png";
import notreDameLogoAsset from "@/assets/notre-dame-logo.png";
import dukeLogoAsset from "@/assets/duke-logo.png";
import jmuLogoAsset from "@/assets/jmu-logo.png";

/* Next resolves an image import to an object; the components want the URL. */
const ncaaLogo = ncaaLogoAsset.src;
const naiaLogo = naiaLogoAsset.src;
const njcaaLogo = njcaaLogoAsset.src;
const clemsonLogo = clemsonLogoAsset.src;
const wakeforestLogo = wakeforestLogoAsset.src;
const uclaLogo = uclaLogoAsset.src;
const williamPennLogo = williamPennLogoAsset.src;
const stMarysLogo = stMarysLogoAsset.src;
const syracuseLogo = syracuseLogoAsset.src;
const pennstateLogo = pennstateLogoAsset.src;
const kentuckyLogo = kentuckyLogoAsset.src;
const indianaLogo = indianaLogoAsset.src;
const pennWesternLogo = pennWesternLogoAsset.src;
const charlestonLogo = charlestonLogoAsset.src;
const smuLogo = smuLogoAsset.src;
const ucfLogo = ucfLogoAsset.src;
const usfLogo = usfLogoAsset.src;
const notreDameLogo = notreDameLogoAsset.src;
const dukeLogo = dukeLogoAsset.src;
const jmuLogo = jmuLogoAsset.src;

const LogoCarousel = () => {
  const logos = [
    { name: "NCAA", logo: ncaaLogo },
    { name: "NAIA", logo: naiaLogo },
    { name: "NJCAA", logo: njcaaLogo },
    { name: "Clemson", logo: clemsonLogo },
    { name: "Wake Forest", logo: wakeforestLogo },
    { name: "UCLA", logo: uclaLogo },
    { name: "William Penn", logo: williamPennLogo },
    { name: "St. Mary's", logo: stMarysLogo },
    { name: "Syracuse", logo: syracuseLogo },
    { name: "Penn State", logo: pennstateLogo },
    { name: "Kentucky", logo: kentuckyLogo },
    { name: "Indiana", logo: indianaLogo },
    { name: "Penn Western", logo: pennWesternLogo },
    { name: "Charleston", logo: charlestonLogo },
    { name: "SMU", logo: smuLogo },
    { name: "UCF", logo: ucfLogo },
    { name: "USF", logo: usfLogo },
    { name: "Notre Dame", logo: notreDameLogo },
    { name: "Duke", logo: dukeLogo },
    { name: "JMU", logo: jmuLogo },
  ];

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="py-8 overflow-hidden" style={{ backgroundColor: "hsl(var(--section-alt))" }}>
      <div className="relative">
        {/* Fade overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #f5f4f2, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #f5f4f2, transparent)" }} />
        
        {/* Scrolling logos */}
        <div className="flex animate-scroll w-max">
          {duplicatedLogos.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="flex-shrink-0 px-8 md:px-12 lg:px-16"
            >
              <img
                src={item.logo}
                alt={item.name}
                className="h-12 md:h-16 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel;
