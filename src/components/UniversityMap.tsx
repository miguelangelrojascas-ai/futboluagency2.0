import { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { X } from "lucide-react";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

type University = { name: string; division: string };
type StateData = { count: number; universities: University[] };

const universitiesByState: Record<string, StateData> = {
  CA: { count: 31, universities: [
    { name: "UCLA", division: "D1" }, { name: "Stanford University", division: "D1" },
    { name: "UC Santa Barbara", division: "D1" }, { name: "San Jose State", division: "D1" },
    { name: "UC Davis", division: "D1" }, { name: "Cal Poly SLO", division: "D1" },
    { name: "Pepperdine University", division: "D1" }, { name: "UC Irvine", division: "D1" },
    { name: "Cal State Fullerton", division: "D1" }, { name: "University of San Diego", division: "D1" },
    { name: "Santa Clara University", division: "D1" }, { name: "Sacramento State", division: "D1" },
    { name: "Cal State Northridge", division: "D1" }, { name: "Long Beach State", division: "D1" },
    { name: "UC Riverside", division: "D1" }, { name: "UC San Diego", division: "D1" },
    { name: "Cal State Bakersfield", division: "D2" }, { name: "Dominican University", division: "D2" },
    { name: "Point Loma Nazarene", division: "D2" }, { name: "Biola University", division: "D2" },
    { name: "Azusa Pacific University", division: "D2" }, { name: "Fresno Pacific", division: "NAIA" },
    { name: "Vanguard University", division: "NAIA" }, { name: "The Master's University", division: "NAIA" },
    { name: "Hope International", division: "NAIA" }, { name: "William Jessup", division: "NAIA" },
    { name: "Westmont College", division: "NAIA" }, { name: "Cal Baptist University", division: "D1" },
    { name: "Grand Canyon University", division: "D1" }, { name: "Holy Names University", division: "D2" },
    { name: "Academy of Art University", division: "NAIA" },
  ]},
  TX: { count: 28, universities: [
    { name: "SMU", division: "D1" }, { name: "TCU", division: "D1" },
    { name: "Texas A&M", division: "D1" }, { name: "UT Austin", division: "D1" },
    { name: "Texas Tech", division: "D1" }, { name: "University of Houston", division: "D1" },
    { name: "UTSA", division: "D1" }, { name: "UT Arlington", division: "D1" },
    { name: "Stephen F. Austin", division: "D1" }, { name: "Sam Houston State", division: "D1" },
    { name: "Lamar University", division: "D1" }, { name: "Texas Southern", division: "D1" },
    { name: "North Texas", division: "D1" }, { name: "Texas State", division: "D1" },
    { name: "Abilene Christian", division: "D1" }, { name: "Incarnate Word", division: "D1" },
    { name: "Tarleton State", division: "D1" }, { name: "UTRGV", division: "D1" },
    { name: "West Texas A&M", division: "D2" }, { name: "Dallas Baptist", division: "D2" },
    { name: "St. Edward's University", division: "D2" }, { name: "Texas A&M Commerce", division: "D2" },
    { name: "Lubbock Christian", division: "D2" }, { name: "Texas Wesleyan", division: "NAIA" },
    { name: "Our Lady of the Lake", division: "NAIA" }, { name: "Wayland Baptist", division: "NAIA" },
    { name: "Texas A&M International", division: "D2" }, { name: "Sul Ross State", division: "D3" },
  ]},
  FL: { count: 25, universities: [
    { name: "University of Florida", division: "D1" }, { name: "Florida State", division: "D1" },
    { name: "UCF", division: "D1" }, { name: "University of Miami", division: "D1" },
    { name: "USF", division: "D1" }, { name: "FIU", division: "D1" },
    { name: "FAU", division: "D1" }, { name: "FGCU", division: "D1" },
    { name: "Jacksonville University", division: "D1" }, { name: "Stetson University", division: "D1" },
    { name: "Bethune-Cookman", division: "D1" }, { name: "North Florida", division: "D1" },
    { name: "Lipscomb University", division: "D1" }, { name: "Florida Gulf Coast", division: "D1" },
    { name: "Rollins College", division: "D2" }, { name: "Florida Southern", division: "D2" },
    { name: "Barry University", division: "D2" }, { name: "Nova Southeastern", division: "D2" },
    { name: "Lynn University", division: "D2" }, { name: "Palm Beach Atlantic", division: "D2" },
    { name: "Warner University", division: "NAIA" }, { name: "Keiser University", division: "NAIA" },
    { name: "Southeastern University", division: "NAIA" }, { name: "Ave Maria University", division: "NAIA" },
    { name: "Florida National University", division: "NAIA" },
  ]},
  NY: { count: 22, universities: [
    { name: "Syracuse University", division: "D1" }, { name: "Columbia University", division: "D1" },
    { name: "Cornell University", division: "D1" }, { name: "Fordham University", division: "D1" },
    { name: "Hofstra University", division: "D1" }, { name: "St. John's University", division: "D1" },
    { name: "Stony Brook University", division: "D1" }, { name: "Binghamton University", division: "D1" },
    { name: "Albany", division: "D1" }, { name: "Buffalo", division: "D1" },
    { name: "Niagara University", division: "D1" }, { name: "Colgate University", division: "D1" },
    { name: "Marist College", division: "D1" }, { name: "Iona University", division: "D1" },
    { name: "LIU", division: "D1" }, { name: "New York University", division: "D3" },
    { name: "Adelphi University", division: "D2" }, { name: "Molloy University", division: "D2" },
    { name: "Roberts Wesleyan", division: "D2" }, { name: "Mercy University", division: "D2" },
    { name: "NYIT", division: "D2" }, { name: "Dominican College", division: "D2" },
  ]},
  PA: { count: 19, universities: [
    { name: "Penn State", division: "D1" }, { name: "Temple University", division: "D1" },
    { name: "Drexel University", division: "D1" }, { name: "Duquesne University", division: "D1" },
    { name: "La Salle University", division: "D1" }, { name: "Saint Joseph's", division: "D1" },
    { name: "Villanova University", division: "D1" }, { name: "Lehigh University", division: "D1" },
    { name: "Lafayette College", division: "D1" }, { name: "Bucknell University", division: "D1" },
    { name: "Robert Morris", division: "D1" }, { name: "Rider University", division: "D1" },
    { name: "Lock Haven", division: "D2" }, { name: "West Chester", division: "D2" },
    { name: "Bloomsburg University", division: "D2" }, { name: "Indiana University PA", division: "D2" },
    { name: "Millersville University", division: "D2" }, { name: "Shippensburg", division: "D2" },
    { name: "Messiah University", division: "D3" },
  ]},
  NC: { count: 15, universities: [
    { name: "Wake Forest", division: "D1" }, { name: "UNC Chapel Hill", division: "D1" },
    { name: "Duke University", division: "D1" }, { name: "NC State", division: "D1" },
    { name: "Gardner-Webb", division: "D1" }, { name: "Campbell University", division: "D1" },
    { name: "UNC Wilmington", division: "D1" }, { name: "Elon University", division: "D1" },
    { name: "High Point University", division: "D1" }, { name: "UNC Greensboro", division: "D1" },
    { name: "Appalachian State", division: "D1" }, { name: "Queens University", division: "D2" },
    { name: "Wingate University", division: "D2" }, { name: "Barton College", division: "D2" },
    { name: "Pfeiffer University", division: "D3" },
  ]},
  VA: { count: 11, universities: [
    { name: "Virginia (UVA)", division: "D1" }, { name: "Virginia Tech", division: "D1" },
    { name: "George Mason", division: "D1" }, { name: "VCU", division: "D1" },
    { name: "ODU", division: "D1" }, { name: "James Madison", division: "D1" },
    { name: "William & Mary", division: "D1" }, { name: "Longwood University", division: "D1" },
    { name: "Liberty University", division: "D1" }, { name: "Radford University", division: "D1" },
    { name: "Shenandoah University", division: "D3" },
  ]},
  OH: { count: 14, universities: [
    { name: "Ohio State", division: "D1" }, { name: "Xavier University", division: "D1" },
    { name: "Akron", division: "D1" }, { name: "Cleveland State", division: "D1" },
    { name: "Wright State", division: "D1" }, { name: "Bowling Green", division: "D1" },
    { name: "Ohio University", division: "D1" }, { name: "Youngstown State", division: "D1" },
    { name: "Cincinnati", division: "D1" }, { name: "Dayton", division: "D1" },
    { name: "Findlay University", division: "D2" }, { name: "Cedarville University", division: "D2" },
    { name: "Ohio Dominican", division: "D2" }, { name: "Tiffin University", division: "D2" },
  ]},
  IL: { count: 14, universities: [
    { name: "Northwestern", division: "D1" }, { name: "DePaul University", division: "D1" },
    { name: "Loyola Chicago", division: "D1" }, { name: "SIU Edwardsville", division: "D1" },
    { name: "Illinois State", division: "D1" }, { name: "Northern Illinois", division: "D1" },
    { name: "Western Illinois", division: "D1" }, { name: "Eastern Illinois", division: "D1" },
    { name: "Chicago State", division: "D1" }, { name: "Bradley University", division: "D1" },
    { name: "Quincy University", division: "D2" }, { name: "Lewis University", division: "D2" },
    { name: "Olivet Nazarene", division: "NAIA" }, { name: "Trinity Christian", division: "NAIA" },
  ]},
  MI: { count: 12, universities: [
    { name: "Michigan State", division: "D1" }, { name: "University of Michigan", division: "D1" },
    { name: "Oakland University", division: "D1" }, { name: "Western Michigan", division: "D1" },
    { name: "Eastern Michigan", division: "D1" }, { name: "Central Michigan", division: "D1" },
    { name: "Detroit Mercy", division: "D1" }, { name: "Grand Valley State", division: "D2" },
    { name: "Michigan Tech", division: "D2" }, { name: "Saginaw Valley", division: "D2" },
    { name: "Cornerstone University", division: "NAIA" }, { name: "Aquinas College", division: "NAIA" },
  ]},
  GA: { count: 10, universities: [
    { name: "Georgia Tech", division: "D1" }, { name: "Georgia State", division: "D1" },
    { name: "Georgia Southern", division: "D1" }, { name: "Mercer University", division: "D1" },
    { name: "Kennesaw State", division: "D1" }, { name: "USC Upstate", division: "D1" },
    { name: "Jacksonville State", division: "D1" }, { name: "Young Harris College", division: "D2" },
    { name: "Emmanuel College", division: "NAIA" }, { name: "Berry College", division: "D3" },
  ]},
  WA: { count: 9, universities: [
    { name: "Washington", division: "D1" }, { name: "Washington State", division: "D1" },
    { name: "Seattle University", division: "D1" }, { name: "Eastern Washington", division: "D1" },
    { name: "Western Washington", division: "D2" }, { name: "Seattle Pacific", division: "D2" },
    { name: "Central Washington", division: "D2" }, { name: "Saint Martin's", division: "D2" },
    { name: "Northwest University", division: "NAIA" },
  ]},
  NJ: { count: 9, universities: [
    { name: "Rutgers", division: "D1" }, { name: "Seton Hall", division: "D1" },
    { name: "Princeton", division: "D1" }, { name: "Monmouth University", division: "D1" },
    { name: "Fairleigh Dickinson", division: "D1" }, { name: "NJIT", division: "D1" },
    { name: "Rider University", division: "D1" }, { name: "Bloomfield College", division: "D2" },
    { name: "Caldwell University", division: "D2" },
  ]},
  AZ: { count: 8, universities: [
    { name: "Arizona State", division: "D1" }, { name: "University of Arizona", division: "D1" },
    { name: "Northern Arizona", division: "D1" }, { name: "Grand Canyon University", division: "D1" },
    { name: "Arizona Christian", division: "NAIA" }, { name: "Ottawa University AZ", division: "NAIA" },
    { name: "Embry-Riddle AZ", division: "NAIA" }, { name: "Benedictine University AZ", division: "NAIA" },
  ]},
  IN: { count: 8, universities: [
    { name: "Indiana University", division: "D1" }, { name: "Notre Dame", division: "D1" },
    { name: "Butler University", division: "D1" }, { name: "IUPUI", division: "D1" },
    { name: "Valparaiso", division: "D1" }, { name: "Fort Wayne", division: "D1" },
    { name: "Indiana Wesleyan", division: "NAIA" }, { name: "Marian University", division: "NAIA" },
  ]},
  MN: { count: 7, universities: [
    { name: "Minnesota", division: "D1" }, { name: "Minnesota State Mankato", division: "D2" },
    { name: "St. Cloud State", division: "D2" }, { name: "Concordia St. Paul", division: "D2" },
    { name: "Minnesota Duluth", division: "D2" }, { name: "Bethel University", division: "D3" },
    { name: "St. Olaf College", division: "D3" },
  ]},
  WI: { count: 7, universities: [
    { name: "Wisconsin", division: "D1" }, { name: "Marquette", division: "D1" },
    { name: "Milwaukee", division: "D1" }, { name: "Green Bay", division: "D1" },
    { name: "Wisconsin-Parkside", division: "D2" }, { name: "Cardinal Stritch", division: "NAIA" },
    { name: "Wisconsin Lutheran", division: "D3" },
  ]},
  CO: { count: 7, universities: [
    { name: "Colorado", division: "D1" }, { name: "Colorado State", division: "D1" },
    { name: "Denver", division: "D1" }, { name: "Air Force", division: "D1" },
    { name: "Colorado Mines", division: "D2" }, { name: "Colorado Mesa", division: "D2" },
    { name: "Colorado Christian", division: "D2" },
  ]},
  WY: { count: 7, universities: [
    { name: "Wyoming", division: "D1" }, { name: "Western Wyoming CC", division: "NJCAA" },
    { name: "Casper College", division: "NJCAA" }, { name: "Eastern Wyoming", division: "NJCAA" },
    { name: "Laramie CC", division: "NJCAA" }, { name: "Northwest College", division: "NJCAA" },
    { name: "Sheridan College", division: "NJCAA" },
  ]},
  TN: { count: 6, universities: [
    { name: "Tennessee", division: "D1" }, { name: "Vanderbilt", division: "D1" },
    { name: "Memphis", division: "D1" }, { name: "Belmont University", division: "D1" },
    { name: "Tennessee Tech", division: "D1" }, { name: "Lipscomb University", division: "D1" },
  ]},
  MO: { count: 6, universities: [
    { name: "Missouri", division: "D1" }, { name: "Saint Louis University", division: "D1" },
    { name: "Missouri State", division: "D1" }, { name: "UMKC", division: "D1" },
    { name: "Drury University", division: "D2" }, { name: "William Jewell", division: "D2" },
  ]},
  KY: { count: 5, universities: [
    { name: "Kentucky", division: "D1" }, { name: "Louisville", division: "D1" },
    { name: "Bellarmine University", division: "D2" }, { name: "Campbellsville", division: "NAIA" },
    { name: "Lindsey Wilson", division: "NAIA" },
  ]},
  SC: { count: 5, universities: [
    { name: "Clemson", division: "D1" }, { name: "South Carolina", division: "D1" },
    { name: "Charleston Southern", division: "D1" }, { name: "Coastal Carolina", division: "D1" },
    { name: "Wofford College", division: "D1" },
  ]},
  MS: { count: 5, universities: [
    { name: "Ole Miss", division: "D1" }, { name: "Mississippi State", division: "D1" },
    { name: "Southern Miss", division: "D1" }, { name: "William Carey", division: "NAIA" },
    { name: "Belhaven University", division: "NAIA" },
  ]},
  AL: { count: 5, universities: [
    { name: "Alabama", division: "D1" }, { name: "Auburn", division: "D1" },
    { name: "UAB", division: "D1" }, { name: "Huntingdon College", division: "D3" },
    { name: "Spring Hill College", division: "D3" },
  ]},
  LA: { count: 5, universities: [
    { name: "LSU", division: "D1" }, { name: "Tulane", division: "D1" },
    { name: "Louisiana Tech", division: "D1" }, { name: "UL Lafayette", division: "D1" },
    { name: "Centenary College", division: "D3" },
  ]},
  OR: { count: 4, universities: [
    { name: "Oregon", division: "D1" }, { name: "Portland", division: "D1" },
    { name: "Portland State", division: "D1" }, { name: "Oregon State", division: "D1" },
  ]},
  OK: { count: 4, universities: [
    { name: "Oklahoma", division: "D1" }, { name: "Oklahoma State", division: "D1" },
    { name: "Oral Roberts", division: "D1" }, { name: "Tulsa", division: "D1" },
  ]},
  CT: { count: 4, universities: [
    { name: "Connecticut", division: "D1" }, { name: "Yale", division: "D1" },
    { name: "Sacred Heart", division: "D1" }, { name: "Fairfield University", division: "D1" },
  ]},
  MA: { count: 3, universities: [
    { name: "Boston College", division: "D1" }, { name: "Harvard", division: "D1" },
    { name: "Boston University", division: "D1" },
  ]},
  AR: { count: 3, universities: [
    { name: "Arkansas", division: "D1" }, { name: "Little Rock", division: "D1" },
    { name: "Arkansas State", division: "D1" },
  ]},
  IA: { count: 3, universities: [
    { name: "Iowa", division: "D1" }, { name: "Iowa State", division: "D1" },
    { name: "Drake University", division: "D1" },
  ]},
  NV: { count: 3, universities: [
    { name: "UNLV", division: "D1" }, { name: "Nevada Reno", division: "D1" },
    { name: "Nevada Las Vegas", division: "D1" },
  ]},
  UT: { count: 3, universities: [
    { name: "Utah", division: "D1" }, { name: "BYU", division: "D1" },
    { name: "Utah State", division: "D1" },
  ]},
  KS: { count: 3, universities: [
    { name: "Kansas", division: "D1" }, { name: "Kansas State", division: "D1" },
    { name: "Wichita State", division: "D1" },
  ]},
  NE: { count: 2, universities: [
    { name: "Nebraska", division: "D1" }, { name: "Creighton", division: "D1" },
  ]},
  ID: { count: 2, universities: [
    { name: "Idaho", division: "D1" }, { name: "Boise State", division: "D1" },
  ]},
  WV: { count: 2, universities: [
    { name: "West Virginia", division: "D1" }, { name: "Marshall", division: "D1" },
  ]},
  MD: { count: 2, universities: [
    { name: "Maryland", division: "D1" }, { name: "UMBC", division: "D1" },
  ]},
  VT: { count: 2, universities: [
    { name: "Vermont", division: "D1" }, { name: "Middlebury College", division: "D3" },
  ]},
  NH: { count: 2, universities: [
    { name: "New Hampshire", division: "D1" }, { name: "Dartmouth", division: "D1" },
  ]},
  MT: { count: 1, universities: [{ name: "Montana", division: "D1" }] },
  ND: { count: 1, universities: [{ name: "North Dakota State", division: "D1" }] },
  SD: { count: 1, universities: [{ name: "South Dakota State", division: "D1" }] },
  ME: { count: 1, universities: [{ name: "Maine", division: "D1" }] },
  DE: { count: 1, universities: [{ name: "Delaware", division: "D1" }] },
  RI: { count: 1, universities: [{ name: "Providence College", division: "D1" }] },
};

const FIPS_TO_STATE: Record<string, { abbr: string; name: string }> = {
  "01": { abbr: "AL", name: "Alabama" }, "02": { abbr: "AK", name: "Alaska" },
  "04": { abbr: "AZ", name: "Arizona" }, "05": { abbr: "AR", name: "Arkansas" },
  "06": { abbr: "CA", name: "California" }, "08": { abbr: "CO", name: "Colorado" },
  "09": { abbr: "CT", name: "Connecticut" }, "10": { abbr: "DE", name: "Delaware" },
  "11": { abbr: "DC", name: "District of Columbia" }, "12": { abbr: "FL", name: "Florida" },
  "13": { abbr: "GA", name: "Georgia" }, "15": { abbr: "HI", name: "Hawaii" },
  "16": { abbr: "ID", name: "Idaho" }, "17": { abbr: "IL", name: "Illinois" },
  "18": { abbr: "IN", name: "Indiana" }, "19": { abbr: "IA", name: "Iowa" },
  "20": { abbr: "KS", name: "Kansas" }, "21": { abbr: "KY", name: "Kentucky" },
  "22": { abbr: "LA", name: "Louisiana" }, "23": { abbr: "ME", name: "Maine" },
  "24": { abbr: "MD", name: "Maryland" }, "25": { abbr: "MA", name: "Massachusetts" },
  "26": { abbr: "MI", name: "Michigan" }, "27": { abbr: "MN", name: "Minnesota" },
  "28": { abbr: "MS", name: "Mississippi" }, "29": { abbr: "MO", name: "Missouri" },
  "30": { abbr: "MT", name: "Montana" }, "31": { abbr: "NE", name: "Nebraska" },
  "32": { abbr: "NV", name: "Nevada" }, "33": { abbr: "NH", name: "New Hampshire" },
  "34": { abbr: "NJ", name: "New Jersey" }, "35": { abbr: "NM", name: "New Mexico" },
  "36": { abbr: "NY", name: "New York" }, "37": { abbr: "NC", name: "North Carolina" },
  "38": { abbr: "ND", name: "North Dakota" }, "39": { abbr: "OH", name: "Ohio" },
  "40": { abbr: "OK", name: "Oklahoma" }, "41": { abbr: "OR", name: "Oregon" },
  "42": { abbr: "PA", name: "Pennsylvania" }, "44": { abbr: "RI", name: "Rhode Island" },
  "45": { abbr: "SC", name: "South Carolina" }, "46": { abbr: "SD", name: "South Dakota" },
  "47": { abbr: "TN", name: "Tennessee" }, "48": { abbr: "TX", name: "Texas" },
  "49": { abbr: "UT", name: "Utah" }, "50": { abbr: "VT", name: "Vermont" },
  "51": { abbr: "VA", name: "Virginia" }, "53": { abbr: "WA", name: "Washington" },
  "54": { abbr: "WV", name: "West Virginia" }, "55": { abbr: "WI", name: "Wisconsin" },
  "56": { abbr: "WY", name: "Wyoming" },
};

const STATE_CENTROIDS: Record<string, [number, number]> = {
  AL: [-86.79, 32.81], AZ: [-111.66, 34.17], AR: [-92.44, 34.75],
  CA: [-119.68, 36.78], CO: [-105.55, 39.06], CT: [-72.76, 41.6], DE: [-75.51, 38.99],
  FL: [-81.69, 27.77], GA: [-83.64, 32.68], ID: [-114.48, 44.24],
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

const divisionColor = (div: string) => {
  switch (div) {
    case "D1": return "bg-[#b00717] text-white";
    case "D2": return "bg-[#12213a] text-white";
    case "D3": return "bg-[#1a6e3c] text-white";
    case "NAIA": return "bg-[#d97706] text-white";
    case "NJCAA": return "bg-[#1e3a6e] text-white";
    default: return "bg-muted text-foreground";
  }
};

const UniversityMap = () => {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);
  const [selected, setSelected] = useState<{ abbr: string; name: string } | null>(null);

  useEffect(() => {
    if (selected) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [selected]);

  const selectedData = selected ? universitiesByState[selected.abbr] : null;

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
            Una red consolidada de contactos directos con coaches a lo largo del país. Haz clic en un estado para ver las universidades.
          </p>
        </div>

        <div className="hidden md:block relative w-full max-w-6xl mx-auto" style={{ minHeight: 400 }}>
          <ComposableMap
            projection="geoAlbersUsa"
            projectionConfig={{ scale: 1300 }}
            width={980}
            height={560}
            style={{ width: "100%", height: "auto", minHeight: 400 }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies
                  .filter((geo) => {
                    const fips = String(geo.id).padStart(2, "0");
                    return fips !== "02" && fips !== "15";
                  })
                  .map((geo) => {
                    const fips = String(geo.id).padStart(2, "0");
                    const state = FIPS_TO_STATE[fips];
                    const data = state ? universitiesByState[state.abbr] : undefined;
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={(e) => {
                          if (state && data) {
                            setTooltip({
                              x: e.clientX,
                              y: e.clientY,
                              text: `${state.name}: ${data.count} universidades`,
                            });
                          }
                        }}
                        onMouseMove={(e) => {
                          if (state && data) {
                            setTooltip({
                              x: e.clientX,
                              y: e.clientY,
                              text: `${state.name}: ${data.count} universidades`,
                            });
                          }
                        }}
                        onMouseLeave={() => setTooltip(null)}
                        onClick={() => {
                          if (state && data) {
                            setTooltip(null);
                            setSelected({ abbr: state.abbr, name: state.name });
                          }
                        }}
                        style={{
                          default: {
                            fill: "#c5d5e8",
                            stroke: "#ffffff",
                            strokeWidth: 1.2,
                            outline: "none",
                            transition: "fill 0.2s",
                          },
                          hover: {
                            fill: "#b00717",
                            stroke: "#ffffff",
                            strokeWidth: 1.2,
                            outline: "none",
                            cursor: data ? "pointer" : "default",
                          },
                          pressed: {
                            fill: "#b00717",
                            stroke: "#ffffff",
                            strokeWidth: 1.2,
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
              }
            </Geographies>

            {Object.entries(universitiesByState).map(([abbr, data]) => {
              const coords = STATE_CENTROIDS[abbr];
              if (!coords) return null;
              const count = data.count;
              const radius = count >= 20 ? 16 : count >= 10 ? 14 : 12;
              return (
                <Marker key={abbr} coordinates={coords}>
                  <g style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.25))", pointerEvents: "none" }}>
                    <circle
                      r={radius}
                      fill="#ffffff"
                      stroke="#12213a"
                      strokeWidth={1.2}
                    />
                    <text
                      textAnchor="middle"
                      dy={3.5}
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 10,
                        fontWeight: 800,
                        fill: "#12213a",
                      }}
                    >
                      {count}
                    </text>
                  </g>
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

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { value: "250+", label: "Universidades" },
            { value: "40+", label: "Estados" },
            { value: "45+", label: "Divisiones" },
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

      {/* Side panel */}
      {selected && selectedData && (
        <div className="fixed inset-0 z-[100]">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setSelected(null)}
          />
          <aside
            className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
            role="dialog"
            aria-label={`Universidades en ${selected.name}`}
          >
            <div className="flex items-start justify-between p-6 border-b border-border">
              <div>
                <span className="font-body text-xs tracking-[0.15em] uppercase text-[#b00717] font-bold block mb-2">
                  {selectedData.count} Universidades
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#12213a]">
                  {selected.name}
                </h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5 text-[#12213a]" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <ul className="space-y-2">
                {selectedData.universities.map((uni, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-3 p-3 rounded-lg border border-border hover:border-[#12213a]/30 hover:bg-muted/40 transition-colors"
                  >
                    <span className="font-body text-sm text-foreground font-medium">
                      {uni.name}
                    </span>
                    <span className={`font-body text-[10px] font-bold px-2 py-1 rounded tracking-wider ${divisionColor(uni.division)}`}>
                      {uni.division}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
};

export default UniversityMap;
