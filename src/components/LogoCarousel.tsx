import ncaaLogo from "@/assets/ncaa-logo.png";
import njcaaLogo from "@/assets/njcaa-logo.jpg";
import naiaLogo from "@/assets/naia-logo.jpg";
import clemsonLogo from "@/assets/clemson-logo.png";
import wakeforestLogo from "@/assets/wakeforest-logo.png";

const LogoCarousel = () => {
  const logos = [
    { name: "NCAA", logo: ncaaLogo },
    { name: "NJCAA", logo: njcaaLogo },
    { name: "NAIA", logo: naiaLogo },
    { name: "Clemson", logo: clemsonLogo },
    { name: "Wake Forest", logo: wakeforestLogo },
  ];

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-12 bg-background overflow-hidden">
      <div className="group relative">
        <div className="flex animate-scroll group-hover:[animation-play-state:paused]">
          {duplicatedLogos.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
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
