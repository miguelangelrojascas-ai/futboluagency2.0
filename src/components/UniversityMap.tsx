import { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const STATE_DATA: Record<string, number> = {
  CA: 31, TX: 28, FL: 25, NY: 22, PA: 19, VA: 11, NC: 15, OH: 14, IL: 14, MI: 12,
  MN: 7, WI: 7, WY: 7, CO: 7, AZ: 8, WA: 9, NJ: 9, GA: 10, MO: 6, TN: 6,
  LA: 5, MS: 5, AL: 5, SC: 5, KY: 5, IN: 8, AR: 3, IA: 3, UT: 3, NV: 3,
  MA: 3, CT: 4, OR: 4, ID: 2, MT: 1, ND: 1, SD: 1, NE: 2, KS: 3, OK: 4,
  NM: 2, WV: 2, MD: 2, VT: 2, NH: 2, ME: 1, DE: 1, RI: 1,
};

// Map FIPS state IDs (used by us-atlas) to USPS abbreviations + full name
const FIPS_TO_STATE: Record<string, { abbr: string; name: string }> = {
  "01": { abbr: "AL", name: "Alabama" },
  "02": { abbr: "AK", name: "Alaska" },
  "04": { abbr: "AZ", name: "Arizona" },
  "05": { abbr: "AR", name: "Arkansas" },
  "06": { abbr: "CA", name: "California" },
  "08": { abbr: "CO", name: "Colorado" },
  "09": { abbr: "CT", name: "Connecticut" },
  "10": { abbr: "DE", name: "Delaware" },
  "11": { abbr: "DC", name: "District of Columbia" },
  "12": { abbr: "FL", name: "Florida" },
  "13": { abbr: "GA", name: "Georgia" },
  "15": { abbr: "HI", name: "Hawaii" },
  "16": { abbr: "ID", name: "Idaho" },
  "17": { abbr: "IL", name: "Illinois" },
  "18": { abbr: "IN", name: "Indiana" },
  "19": { abbr: "IA", name: "Iowa" },
  "20": { abbr: "KS", name: "Kansas" },
  "21": { abbr: "KY", name: "Kentucky" },
  "22": { abbr: "LA", name: "Louisiana" },
  "23": { abbr: "ME", name: "Maine" },
  "24": { abbr: "MD", name: "Maryland" },
  "25": { abbr: "MA", name: "Massachusetts" },
  "26": { abbr: "MI", name: "Michigan" },
  "27": { abbr: "MN", name: "Minnesota" },
  "28": { abbr: "MS", name: "Mississippi" },
  "29": { abbr: "MO", name: "Missouri" },
  "30": { abbr: "MT", name: "Montana" },
  "31": { abbr: "NE", name: "Nebraska" },
  "32": { abbr: "NV", name: "Nevada" },
  "33": { abbr: "NH", name: "New Hampshire" },
  "34": { abbr: "NJ", name: "New Jersey" },
  "35": { abbr: "NM", name: "New Mexico" },
  "36": { abbr: "NY", name: "New York" },
  "37": { abbr: "NC", name: "North Carolina" },
  "38": { abbr: "ND", name: "North Dakota" },
  "39": { abbr: "OH", name: "Ohio" },
  "40": { abbr: "OK", name: "Oklahoma" },
  "41": { abbr: "OR", name: "Oregon" },
  "42": { abbr: "PA", name: "Pennsylvania" },
  "44": { abbr: "RI", name: "Rhode Island" },
  "45": { abbr: "SC", name: "South Carolina" },
  "46": { abbr: "SD", name: "South Dakota" },
  "47": { abbr: "TN", name: "Tennessee" },
  "48": { abbr: "TX", name: "Texas" },
  "49": { abbr: "UT", name: "Utah" },
  "50": { abbr: "VT", name: "Vermont" },
  "51": { abbr: "VA", name: "Virginia" },
  "53": { abbr: "WA", name: "Washington" },
  "54": { abbr: "WV", name: "West Virginia" },
  "55": { abbr: "WI", name: "Wisconsin" },
  "56": { abbr: "WY", name: "Wyoming" },
};

// Approximate centroids [lon, lat] for state bubble placement
const STATE_CENTROIDS: Record<string, [number, number]> = {
  AL: [-86.79, 32.81], AK: [-152.4, 64.2], AZ: [-111.66, 34.17], AR: [-92.44, 34.75],
  CA: [-119.68, 36.78], CO: [-105.55, 39.06], CT: [-72.76, 41.6], DE: [-75.51, 38.99],
  FL: [-81.69, 27.77], GA: [-83.64, 32.68], HI: [-157.5, 21.1], ID: [-114.48, 44.24],
  IL: [-89.0, 40.35], IN: [-86.26, 39.85], IA: [-93.21, 42.01], KS: [-96.73, 38.53],
  KY: [-84.67, 37.65], LA: [-91.87, 31.17], ME: [-69.38, 44.69], MD: [-76.8, 39.06],
  MA: [-71.53, 42.23], MI: [-84.54, 43.33], MN: [-93.9, 45.69], MS: [-89.68, 32.74],
  MO: [-92.29, 38.46], MT: [-110.45, 46.92], NE: [-98.27, 41.13], NV: [-117.06, 38.31],
  NH: [-71.56, 43.45], NJ: [-74.52, 40.3], NM: [-106.25, 34.84], NY: [-75.0, 42.95],
  NC: [-79.81, 35.63], ND: [-99.78, 47.53], OH: [-82.76, 40.39], OK: [-96.93, 35.57],
  OR: [-122.07, 44.57], PA: [-77.21, 40.59], RI: [-71.51, 41.68], SC: [-80.95, 33.86],
  SD: [-99.44, 44.3], TN: [-86.69, 35.75], TX: [-97.56, 31.05], UT: [-111.86, 40.15],
  VT: [-72.71, 44.04], VA: [-78.17, 37.77], WA: [-121.49, 47.4], WV: [-80.95, 38.49],
  WI: [-89.62, 44.27], WY: [-107.3, 42.75],
};

const UniversityMap = () => {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);

  return (
    <section className="section-padding bg-background">
      <div className="container-wide px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block mb-4 text-[#b00717] font-body text-xs tracking-[0.15em] uppercase font-bold">
            250+ Universidades Partner
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nuestra Red en EE.UU.
          </h2>
          <p className="font-body text-muted-foreground text-base leading-relaxed">
            Una red consolidada de contactos directos con coaches a lo largo del país.
          </p>
        </div>

        {/* Map - hidden on mobile */}
        <div className="hidden md:block relative max-w-5xl mx-auto">
          <ComposableMap
            projection="geoAlbersUsa"
            projectionConfig={{ scale: 1000 }}
            width={980}
            height={560}
            style={{ width: "100%", height: "auto" }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const fips = String(geo.id).padStart(2, "0");
                  const state = FIPS_TO_STATE[fips];
                  const count = state ? STATE_DATA[state.abbr] : undefined;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={(e) => {
                        if (state && count) {
                          setTooltip({
                            x: e.clientX,
                            y: e.clientY,
                            text: `${state.name}: ${count} universidades`,
                          });
                        }
                      }}
                      onMouseMove={(e) => {
                        if (state && count) {
                          setTooltip({
                            x: e.clientX,
                            y: e.clientY,
                            text: `${state.name}: ${count} universidades`,
                          });
                        }
                      }}
                      onMouseLeave={() => setTooltip(null)}
                      style={{
                        default: {
                          fill: "#dce6f0",
                          stroke: "#ffffff",
                          strokeWidth: 1,
                          outline: "none",
                          transition: "fill 0.2s",
                        },
                        hover: {
                          fill: "#b00717",
                          stroke: "#ffffff",
                          strokeWidth: 1,
                          outline: "none",
                          cursor: "pointer",
                        },
                        pressed: {
                          fill: "#b00717",
                          stroke: "#ffffff",
                          strokeWidth: 1,
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {Object.entries(STATE_DATA).map(([abbr, count]) => {
              const coords = STATE_CENTROIDS[abbr];
              if (!coords) return null;
              const radius = count >= 20 ? 14 : count >= 10 ? 12 : count >= 5 ? 10 : 8;
              return (
                <Marker key={abbr} coordinates={coords}>
                  <circle
                    r={radius}
                    fill="#ffffff"
                    stroke="#12213a"
                    strokeWidth={1}
                    style={{ pointerEvents: "none" }}
                  />
                  <text
                    textAnchor="middle"
                    dy={3}
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: count >= 10 ? 10 : 9,
                      fontWeight: 700,
                      fill: "#12213a",
                      pointerEvents: "none",
                    }}
                  >
                    {count}
                  </text>
                </Marker>
              );
            })}
          </ComposableMap>

          {tooltip && (
            <div
              className="fixed pointer-events-none z-50 bg-[#12213a] text-white font-body text-xs font-semibold px-3 py-1.5 rounded-md shadow-lg"
              style={{ left: tooltip.x + 12, top: tooltip.y + 12 }}
            >
              {tooltip.text}
            </div>
          )}
        </div>

        {/* Stats row */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { value: "250+", label: "Universidades" },
            { value: "40+", label: "Estados" },
            { value: "D1 · D2 · D3 · NAIA", label: "Divisiones" },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center bg-white rounded-xl border border-border p-6 ring-1 ring-[#12213a]/10 shadow-[0_0_30px_rgba(18,33,58,0.06)]"
            >
              <div className="font-display text-2xl sm:text-3xl font-bold text-[#12213a] italic mb-2">
                {stat.value}
              </div>
              <p className="font-body text-xs sm:text-sm tracking-[0.15em] uppercase text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UniversityMap;
