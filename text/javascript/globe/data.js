const table = [
    "H", "Hydrogen", "1.00794", 1, 1,
    "He", "Helium", "4.002602", 18, 1,
    "Li", "Lithium", "6.941", 1, 2,
    "Be", "Beryllium", "9.012182", 2, 2,
    "B", "Boron", "10.811", 13, 2,
    "C", "Carbon", "12.0107", 14, 2,
    "N", "Nitrogen", "14.0067", 15, 2,
    "O", "Oxygen", "15.9994", 16, 2,
    "F", "Fluorine", "18.9984032", 17, 2,
    "Ne", "Neon", "20.1797", 18, 2,
    "Na", "Sodium", "22.98976...", 1, 3,
    "Mg", "Magnesium", "24.305", 2, 3,
    "Al", "Aluminium", "26.9815386", 13, 3,
    "Si", "Silicon", "28.0855", 14, 3,
    "P", "Phosphorus", "30.973762", 15, 3,
    "S", "Sulfur", "32.065", 16, 3,
    "Cl", "Chlorine", "35.453", 17, 3,
    "Ar", "Argon", "39.948", 18, 3,
    "K", "Potassium", "39.948", 1, 4,
    "Ca", "Calcium", "40.078", 2, 4,
    "Sc", "Scandium", "44.955912", 3, 4,
    "Ti", "Titanium", "47.867", 4, 4,
    "V", "Vanadium", "50.9415", 5, 4,
    "Cr", "Chromium", "51.9961", 6, 4,
    "Mn", "Manganese", "54.938045", 7, 4,
    "Fe", "Iron", "55.845", 8, 4,
    "Co", "Cobalt", "58.933195", 9, 4,
    "Ni", "Nickel", "58.6934", 10, 4,
    "Cu", "Copper", "63.546", 11, 4,
    "Zn", "Zinc", "65.38", 12, 4,
    "Ga", "Gallium", "69.723", 13, 4,
    "Ge", "Germanium", "72.63", 14, 4,
    "As", "Arsenic", "74.9216", 15, 4,
    "Se", "Selenium", "78.96", 16, 4,
    "Br", "Bromine", "79.904", 17, 4,
    "Kr", "Krypton", "83.798", 18, 4,
    "Rb", "Rubidium", "85.4678", 1, 5,
    "Sr", "Strontium", "87.62", 2, 5,
    "Y", "Yttrium", "88.90585", 3, 5,
    "Zr", "Zirconium", "91.224", 4, 5,
    "Nb", "Niobium", "92.90628", 5, 5,
    "Mo", "Molybdenum", "95.96", 6, 5,
    "Tc", "Technetium", "(98)", 7, 5,
    "Ru", "Ruthenium", "101.07", 8, 5,
    "Rh", "Rhodium", "102.9055", 9, 5,
    "Pd", "Palladium", "106.42", 10, 5,
    "Ag", "Silver", "107.8682", 11, 5,
    "Cd", "Cadmium", "112.411", 12, 5,
    "In", "Indium", "114.818", 13, 5,
    "Sn", "Tin", "118.71", 14, 5,
    "Sb", "Antimony", "121.76", 15, 5,
    "Te", "Tellurium", "127.6", 16, 5,
    "I", "Iodine", "126.90447", 17, 5,
    "Xe", "Xenon", "131.293", 18, 5,
    "Cs", "Caesium", "132.9054", 1, 6,
    "Ba", "Barium", "132.9054", 2, 6,
    "La", "Lanthanum", "138.90547", 4, 9,
    "Ce", "Cerium", "140.116", 5, 9,
    "Pr", "Praseodymium", "140.90765", 6, 9,
    "Nd", "Neodymium", "144.242", 7, 9,
    "Pm", "Promethium", "(145)", 8, 9,
    "Sm", "Samarium", "150.36", 9, 9,
    "Eu", "Europium", "151.964", 10, 9,
    "Gd", "Gadolinium", "157.25", 11, 9,
    "Tb", "Terbium", "158.92535", 12, 9,
    "Dy", "Dysprosium", "162.5", 13, 9,
    "Ho", "Holmium", "164.93032", 14, 9,
    "Er", "Erbium", "167.259", 15, 9,
    "Tm", "Thulium", "168.93421", 16, 9,
    "Yb", "Ytterbium", "173.054", 17, 9,
    "Lu", "Lutetium", "174.9668", 18, 9,
    "Hf", "Hafnium", "178.49", 4, 6,
    "Ta", "Tantalum", "180.94788", 5, 6,
    "W", "Tungsten", "183.84", 6, 6,
    "Re", "Rhenium", "186.207", 7, 6,
    "Os", "Osmium", "190.23", 8, 6,
    "Ir", "Iridium", "192.217", 9, 6,
    "Pt", "Platinum", "195.084", 10, 6,
    "Au", "Gold", "196.966569", 11, 6,
    "Hg", "Mercury", "200.59", 12, 6,
    "Tl", "Thallium", "204.3833", 13, 6,
    "Pb", "Lead", "207.2", 14, 6,
    "Bi", "Bismuth", "208.9804", 15, 6,
    "Po", "Polonium", "(209)", 16, 6,
    "At", "Astatine", "(210)", 17, 6,
    "Rn", "Radon", "(222)", 18, 6,
    "Fr", "Francium", "(223)", 1, 7,
    "Ra", "Radium", "(226)", 2, 7,
    "Ac", "Actinium", "(227)", 4, 10,
    "Th", "Thorium", "232.03806", 5, 10,
    "Pa", "Protactinium", "231.0588", 6, 10,
    "U", "Uranium", "238.02891", 7, 10,
    "Np", "Neptunium", "(237)", 8, 10,
    "Pu", "Plutonium", "(244)", 9, 10,
    "Am", "Americium", "(243)", 10, 10,
    "Cm", "Curium", "(247)", 11, 10,
    "Bk", "Berkelium", "(247)", 12, 10,
    "Cf", "Californium", "(251)", 13, 10,
    "Es", "Einstenium", "(252)", 14, 10,
    "Fm", "Fermium", "(257)", 15, 10,
    "Md", "Mendelevium", "(258)", 16, 10,
    "No", "Nobelium", "(259)", 17, 10,
    "Lr", "Lawrencium", "(262)", 18, 10,
    "Rf", "Rutherfordium", "(267)", 4, 7,
    "Db", "Dubnium", "(268)", 5, 7,
    "Sg", "Seaborgium", "(271)", 6, 7,
    "Bh", "Bohrium", "(272)", 7, 7,
    "Hs", "Hassium", "(270)", 8, 7,
    "Mt", "Meitnerium", "(276)", 9, 7,
    "Ds", "Darmstadium", "(281)", 10, 7,
    "Rg", "Roentgenium", "(280)", 11, 7,
    "Cn", "Copernicium", "(285)", 12, 7,
    "Nh", "Nihonium", "(286)", 13, 7,
    "Fl", "Flerovium", "(289)", 14, 7,
    "Mc", "Moscovium", "(290)", 15, 7,
    "Lv", "Livermorium", "(293)", 16, 7,
    "Ts", "Tennessine", "(294)", 17, 7,
    "Og", "Oganesson", "(294)", 18, 7
];
var data = [
    {lat: 69.59999999999997,lng:136.20000000000027,label:""}, 
    {lat: 64.49999999999996,lng:-125.59999999999991,label:""}, 
    {lat: 64.49999999999996,lng:95.4000000000002,label:""}, 
    {lat: 62.799999999999955,lng:-47.399999999999814,label:""}, 
    {lat: 61.09999999999995,lng:139.60000000000028,label:""}, 
    {lat: 40.69999999999992,lng:119.20000000000024,label:""}, 
    {lat: 32.1999999999999,lng:13.800000000000175,label:""}, 
    {lat: 32.1999999999999,lng:88.6000000000002,label:""}, 
    {lat: 25.399999999999906,lng:7.000000000000174,label:""}, 
    {lat: 10.099999999999913,lng:10.400000000000174,label:""}, 
    {lat: 8.399999999999913,lng:-3.1999999999998257,label:""}, 
    {lat: 8.399999999999913,lng:3.600000000000174,label:""}, 
    {lat: -0.10000000000008713,lng:102.20000000000022,label:""}, 
    {lat: -6.900000000000087,lng:37.600000000000165,label:""}, 
    {lat: -12.000000000000085,lng:20.600000000000172,label:""}, 
    {lat: -27.30000000000008,lng:20.600000000000172,label:""}, 
    {lat: -27.30000000000008,lng:30.800000000000168,label:""}, 
    {lat: 60.24999999999996,lng:15.500000000000158,label:""}, 
    {lat: 58.549999999999955,lng:-127.29999999999993,label:""}, 
    {lat: 58.549999999999955,lng:93.70000000000019,label:""}, 
    {lat: 56.84999999999995,lng:90.30000000000018,label:""}, 
    {lat: 50.04999999999994,lng:-106.89999999999989,label:""}, 
    {lat: 48.34999999999994,lng:-66.09999999999982,label:""}, 
    {lat: 46.649999999999935,lng:90.30000000000018,label:""}, 
    {lat: 44.94999999999993,lng:-79.69999999999985,label:""}, 
    {lat: 39.84999999999992,lng:117.50000000000023,label:""}, 
    {lat: 34.749999999999915,lng:-120.49999999999991,label:""}, 
    {lat: 34.749999999999915,lng:-1.4999999999998423,label:""}, 
    {lat: 16.04999999999992,lng:80.10000000000016,label:""}, 
    {lat: -6.050000000000079,lng:-62.699999999999825,label:""}, 
    {lat: -26.450000000000074,lng:124.30000000000024,label:""}, 
    {lat: -26.450000000000074,lng:151.50000000000028,label:""}, 
    {lat: -33.25000000000007,lng:-69.49999999999983,label:""}, 
    {lat: -45.15000000000009,lng:168.5000000000003,label:""}, 
    {lat: 79.79999999999998,lng:-26.999999999999822,label:""}, 
    {lat: 74.69999999999997,lng:98.80000000000021,label:""}, 
    {lat: 72.99999999999997,lng:-122.1999999999999,label:""}, 
    {lat: 64.49999999999996,lng:-122.1999999999999,label:""}, 
    {lat: 50.899999999999935,lng:-98.39999999999986,label:""}, 
    {lat: 49.19999999999993,lng:119.20000000000024,label:""}, 
    {lat: 47.49999999999993,lng:27.40000000000017,label:""}, 
    {lat: 44.09999999999992,lng:-115.39999999999989,label:""}, 
    {lat: 32.1999999999999,lng:54.60000000000016,label:""}, 
    {lat: 30.499999999999904,lng:-94.99999999999986,label:""}, 
    {lat: 28.799999999999905,lng:119.20000000000024,label:""}, 
    {lat: 21.999999999999908,lng:10.400000000000174,label:""}, 
    {lat: 18.59999999999991,lng:-71.19999999999982,label:""}, 
    {lat: 15.19999999999991,lng:-3.1999999999998257,label:""}, 
    {lat: 13.499999999999911,lng:105.60000000000022,label:""}, 
    {lat: 8.399999999999913,lng:-71.19999999999982,label:""}, 
    {lat: -0.10000000000008713,lng:-54.19999999999981,label:""}, 
    {lat: -13.700000000000085,lng:-64.3999999999998,label:""}, 
    {lat: -13.700000000000085,lng:30.800000000000168,label:""}, 
    {lat: -18.800000000000082,lng:47.80000000000016,label:""}, 
    {lat: -22.20000000000008,lng:27.40000000000017,label:""}, 
    {lat: 72.14999999999998,lng:52.90000000000015,label:""}, 
    {lat: 68.74999999999997,lng:-103.49999999999989,label:""}, 
    {lat: 58.549999999999955,lng:52.90000000000015,label:""}, 
    {lat: 56.84999999999995,lng:-62.699999999999825,label:""}, 
    {lat: 50.04999999999994,lng:25.700000000000156,label:""}, 
    {lat: 46.649999999999935,lng:22.300000000000157,label:""}, 
    {lat: 46.649999999999935,lng:83.50000000000017,label:""}, 
    {lat: 36.44999999999992,lng:-96.69999999999987,label:""}, 
    {lat: 33.04999999999991,lng:117.50000000000023,label:""}, 
    {lat: 27.949999999999914,lng:103.9000000000002,label:""}, 
    {lat: 19.449999999999918,lng:-89.89999999999986,label:""}, 
    {lat: 19.449999999999918,lng:42.70000000000015,label:""}, 
    {lat: 5.8499999999999215,lng:-69.49999999999983,label:""}, 
    {lat: -14.550000000000077,lng:-59.29999999999983,label:""}, 
    {lat: -19.650000000000077,lng:124.30000000000024,label:""}, 
    {lat: -89.35000000000016,lng:-35.49999999999984,label:""}, 

    {lat:42.35843,lng:-71.05977, label: "Boston"},
    {lat:25.77427,lng:-80.19366, label: "Miami"},
    {lat:37.77493,lng:-122.41942, label: "San Francisco"},
    {lat:-23.5475,lng:-46.63611, label: "Sao Paulo"},
    {lat:-12.04318,lng:-77.02824, label: "Lima"},
    {lat:21.30694,lng:-157.85833, label: "Honolulu"},
    {lat:-31.95224,lng:115.8614, label: "Perth"},
    {lat:-33.86785,lng:151.20732, label: "Sydney"},
    {lat: -42, lng: 174, label: "New Zealand"},
    {lat:22.28552,lng:114.15769, label: "Hong Kong"},
    {lat:19.07283,lng:72.88261, label: "Mumbai"},
    {lat:30.06263,lng:31.24967, label:"Cairo"},
    {lat:-33.92584,lng:18.42322, label:"Cape Town"},
    {lat:52.52437,lng:13.41053, label:"Berlin"},
    {lat:55.95206,lng:-3.19648, label:"Edinburgh"},
    {lat:55.75222,lng:37.61556, label:"Moscow"},


]
