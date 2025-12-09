const SocialProofSection = () => {
  const organizations = ["NCAA", "NJCAA", "NAIA", "MLS"];
  
  const universities = [
    "Kentucky", "Wisconsin", "UCLA", "Stanford",
    "Duke", "North Carolina", "Indiana", "Syracuse"
  ];

  return (
    <section className="section-padding bg-surface-light">
      <div className="container-wide">
        {/* Organizations */}
        <div className="text-center mb-16">
          <p className="text-secondary font-body text-sm tracking-[0.15em] uppercase mb-8">
            Organizaciones donde colocamos jugadores
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {organizations.map((org) => (
              <div
                key={org}
                className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100 flex items-center justify-center hover:shadow-md transition-shadow"
              >
                <span className="font-display text-2xl md:text-3xl font-bold text-secondary">
                  {org}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Universities */}
        <div className="text-center">
          <p className="text-secondary font-body text-sm tracking-[0.15em] uppercase mb-8">
            Universidades Partner
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-5xl mx-auto">
            {universities.map((uni) => (
              <div
                key={uni}
                className="bg-white rounded-lg px-6 py-3 shadow-sm border border-gray-100 hover:border-primary/30 transition-colors"
              >
                <span className="font-body text-secondary font-medium">
                  {uni}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
