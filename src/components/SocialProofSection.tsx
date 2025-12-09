import ncaaLogo from "@/assets/ncaa-logo.png";
import njcaaLogo from "@/assets/njcaa-logo.jpg";
import naiaLogo from "@/assets/naia-logo.jpg";
import clemsonLogo from "@/assets/clemson-logo.png";
import wakeforestLogo from "@/assets/wakeforest-logo.png";

const SocialProofSection = () => {
  const organizations = [
    { name: "NCAA", logo: ncaaLogo },
    { name: "NJCAA", logo: njcaaLogo },
    { name: "NAIA", logo: naiaLogo },
  ];

  const universities = [
    { name: "Clemson", logo: clemsonLogo },
    { name: "Wake Forest", logo: wakeforestLogo },
  ];

  return (
    <section className="section-padding bg-surface-light">
      <div className="container-wide">
        {/* Organizations */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16 mb-16">
          {organizations.map((org) => (
            <div
              key={org.name}
              className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100 flex items-center justify-center hover:shadow-md transition-shadow"
            >
              <img
                src={org.logo}
                alt={org.name}
                className="h-16 md:h-20 w-auto object-contain"
              />
            </div>
          ))}
        </div>

        {/* Universities */}
        <div className="text-center">
          <p className="text-secondary font-body text-sm tracking-[0.15em] uppercase mb-8">
            Universidades Partner
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-4xl mx-auto">
            {universities.map((uni) => (
              <div
                key={uni.name}
                className="bg-white rounded-lg px-8 py-4 shadow-sm border border-gray-100 hover:border-primary/30 transition-colors flex items-center justify-center"
              >
                <img
                  src={uni.logo}
                  alt={uni.name}
                  className="h-12 md:h-16 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
