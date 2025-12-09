import ncaaLogo from "@/assets/ncaa-new.png";
import naiaLogo from "@/assets/naia-new.png";
import njcaaLogo from "@/assets/njcaa-new.png";
import clemsonLogo from "@/assets/clemson-new.png";
import wakeforestLogo from "@/assets/wakeforest-new.png";
import uclaLogo from "@/assets/ucla.png";
import williamPennLogo from "@/assets/william-penn.png";
import stMarysLogo from "@/assets/st-marys.svg";
import syracuseLogo from "@/assets/syracuse-logo.png";
import pennstateLogo from "@/assets/pennstate-logo.png";
import kentuckyLogo from "@/assets/kentucky-logo.png";
import indianaLogo from "@/assets/indiana-logo.png";
import pennWesternLogo from "@/assets/penn-western-logo.svg";
import charlestonLogo from "@/assets/charleston-logo.png";
import smuLogo from "@/assets/smu-logo.png";
import ucfLogo from "@/assets/ucf-logo.png";
import usfLogo from "@/assets/usf-logo.png";
import notreDameLogo from "@/assets/notre-dame-logo.png";
import dukeLogo from "@/assets/duke-logo.png";

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
  ];

  return (
    <section className="py-12 bg-background-alt overflow-hidden">
      <div className="relative flex">
        <div className="flex animate-scroll">
          {logos.map((item, index) => (
            <div
              key={`first-${item.name}-${index}`}
              className="flex-shrink-0 mx-8 md:mx-12 lg:mx-16"
            >
              <img
                src={item.logo}
                alt={item.name}
                className="h-12 md:h-16 w-auto object-contain brightness-100 contrast-100"
              />
            </div>
          ))}
        </div>
        <div className="flex animate-scroll">
          {logos.map((item, index) => (
            <div
              key={`second-${item.name}-${index}`}
              className="flex-shrink-0 mx-8 md:mx-12 lg:mx-16"
            >
              <img
                src={item.logo}
                alt={item.name}
                className="h-12 md:h-16 w-auto object-contain brightness-100 contrast-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel;
