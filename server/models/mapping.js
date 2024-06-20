const cityMapping = {
    BEACH: ["alicante", "amalfi", "barcelona", "cannes", "corfu", "dubrovnik", "faro", "ibiza", "lagos", "lisbon", "malaga", "mallorca", "monaco", "mykonos", "nice", "palma", "paphos", "porto", "rimini", "santorini", "split", "tenerife", "valencia", "vigo", "zadar"],
    CULTURAL: ["amsterdam", "athens", "barcelona", "berlin", "bratislava", "bruges", "budapest", "copenhagen", "dubrovnik", "edinburgh", "florence", "helsinki", "istanbul", "krakow", "lisbon", "ljubljana", "madrid", "milan", "munich", "paris", "prague", "reykjavik", "rome", "salzburg", "seville", "stockholm", "tallinn", "venice", "vienna", "warsaw"],
    ADVENTURE: ["mont blanc", "lech", "zell am see"],
    CITY: ["amsterdam", "athens", "barcelona", "berlin", "brussels", "bucharest", "budapest", "copenhagen", "dublin", "edinburgh", "florence", "hamburg", "helsinki", "istanbul", "lisbon", "london", "madrid", "milan", "munich", "naples", "oslo", "paris", "porto", "prague", "rome", "stockholm", "tallinn", "vienna", "warsaw", "zurich"],
    SPORT: ["chamonix", "fuerteventura", "innsbruck", "lanzarote", "mallorca", "marbella", "marseille", "milan", "munich", "oberstdorf", "porto", "st. moritz", "turin", "valencia", "zurich"]
};

const allCities = ["alicante", "amalfi", "barcelona", "cannes", "corfu", "dubrovnik", "faro", "ibiza", "lagos", "lisbon", "malaga", "mallorca", "monaco", "mykonos", "nice", "palma", "paphos", "porto", "rimini", "santorini", "split", "tenerife", "valencia", "vigo", "zadar", "amsterdam", "athens", "berlin", "bratislava", "bruges", "budapest", "copenhagen", "edinburgh", "florence", "helsinki", "istanbul", "krakow", "ljubljana", "madrid", "milan", "munich", "paris", "prague", "reykjavik", "rome", "salzburg", "seville", "stockholm", "tallinn", "venice", "vienna", "warsaw", "brussels", "bucharest", "dublin", "hamburg", "london", "naples", "oslo", "zurich", "fuerteventura", "lanzarote", "marseille"];

const airportData = {
    alicante: {
        city: 'alicante', airports_icao: 'LEAL', airports_iata: 'ALC', airports_name: 'Alicante Airport'
    }, amalfi: {
        city: 'amalfi', airports_icao: 'LIRI', airports_iata: 'QSR', airports_name: "Salerno Costa d'Amalfi Airport"
    }, barcelona: {
        city: 'barcelona', airports_icao: 'LEBL', airports_iata: 'BCN', airports_name: 'Barcelona El Prat Airport'
    }, cannes: {
        city: 'cannes', airports_icao: 'LFMD', airports_iata: 'CEQ', airports_name: 'Cannes Mandelieu Airport'
    }, corfu: {
        city: 'corfu', airports_icao: 'LGKR', airports_iata: 'CFU', airports_name: 'Corfu International Airport'
    }, dubrovnik: {
        city: 'dubrovnik',
        airports_icao: 'LDDU',
        airports_iata: 'DBV',
        airports_name: 'Dubrovnik Rudjer Boskovic Airport'
    }, faro: {
        city: 'faro', airports_icao: 'LPFR', airports_iata: 'FAO', airports_name: 'Faro Airport'
    }, ibiza: {
        city: 'ibiza', airports_icao: 'LEIB', airports_iata: 'IBZ', airports_name: 'Ibiza Airport'
    }, lagos: {
        city: 'lagos', airports_icao: 'DNMM', airports_iata: 'LOS', airports_name: 'Lagos Murtala Mohammed Airport'
    }, lisbon: {
        city: 'lisbon', airports_icao: 'LPPT', airports_iata: 'LIS', airports_name: 'Lisbon Humberto Delgado Airport'
    }, malaga: {
        city: 'malaga', airports_icao: 'LEMG', airports_iata: 'AGP', airports_name: 'Malaga Costa Del Sol Airport'
    }, mallorca: {
        city: 'mallorca', airports_icao: 'LEPA', airports_iata: 'PMI', airports_name: 'Palma de Mallorca Airport'
    }, monaco: {
        city: 'monaco', airports_icao: 'LNMC', airports_iata: 'MCM', airports_name: 'Monte Carlo Monaco Heliport'
    }, mykonos: {
        city: 'mykonos', airports_icao: 'LGMK', airports_iata: 'JMK', airports_name: 'Mykonos Island National Airport'
    }, nice: {
        city: 'nice', airports_icao: 'LFMN', airports_iata: 'NCE', airports_name: "Nice Cote d'Azur Airport"
    }, palma: {
        city: 'palma', airports_icao: 'GCLA', airports_iata: 'SPC', airports_name: 'La Palma Airport'
    }, paphos: {
        city: 'paphos', airports_icao: 'LCPH', airports_iata: 'PFO', airports_name: 'Paphos International Airport'
    }, porto: {
        city: 'porto',
        airports_icao: 'SBPA',
        airports_iata: 'POA',
        airports_name: 'Porto Alegre Salgado Filho International Airport'
    }, rimini: {
        city: 'rimini', airports_icao: 'LIPR', airports_iata: 'RMI', airports_name: 'Rimini Federico Fellini Airport'
    }, santorini: {
        city: 'santorini',
        airports_icao: 'LGSR',
        airports_iata: 'JTR',
        airports_name: 'Santorini Thira National Airport'
    }, split: {
        city: 'split', airports_icao: 'LDSP', airports_iata: 'SPU', airports_name: 'Split Airport'
    }, tenerife: {
        city: 'tenerife', airports_icao: 'GCXO', airports_iata: 'TFN', airports_name: 'Tenerife North Airport'
    }, valencia: {
        city: 'valencia',
        airports_icao: 'SKPP',
        airports_iata: 'PPN',
        airports_name: 'Popayan Guillermo Leon Valencia Airport'
    }, vigo: {
        city: 'vigo', airports_icao: 'LEVX', airports_iata: 'VGO', airports_name: 'Vigo-Peinador Airport'
    }, zadar: {
        city: 'zadar', airports_icao: 'LDZD', airports_iata: 'ZAD', airports_name: 'Zadar Airport'
    }, amsterdam: {
        city: 'amsterdam', airports_icao: 'EHAM', airports_iata: 'AMS', airports_name: 'Amsterdam Schiphol Airport'
    }, athens: {
        city: 'athens', airports_icao: 'KAHN', airports_iata: 'AHN', airports_name: 'Athens Ben Epps Airport'
    }, berlin: {
        city: 'berlin', airports_icao: 'EDDB', airports_iata: 'BER', airports_name: 'Berlin Brandenburg Airport'
    }, bratislava: {
        city: 'bratislava',
        airports_icao: 'LZIB',
        airports_iata: 'BTS',
        airports_name: 'Bratislava M. R. Stefanik Airport'
    }, bruges: {
        city: 'bruges',
        airports_icao: 'EBOS',
        airports_iata: 'OST',
        airports_name: 'Ostend Bruges International Airport'
    }, budapest: {
        city: 'budapest', airports_icao: 'LHBS', airports_iata: 'QHU', airports_name: 'Budapest Budaors Airport'
    }, copenhagen: {
        city: 'copenhagen', airports_icao: 'EKCH', airports_iata: 'CPH', airports_name: 'Copenhagen Airport'
    }, edinburgh: {
        city: 'edinburgh', airports_icao: 'EGPH', airports_iata: 'EDI', airports_name: 'Edinburgh Airport'
    }, florence: {
        city: 'florence', airports_icao: 'LIRQ', airports_iata: 'FLR', airports_name: 'Florence Peretola Airport'
    }, helsinki: {
        city: 'helsinki', airports_icao: 'EFHK', airports_iata: 'HEL', airports_name: 'Helsinki Vantaa Airport'
    }, istanbul: {
        city: 'istanbul', airports_icao: 'LTFM', airports_iata: 'IST', airports_name: 'Istanbul Airport'
    }, krakow: {
        city: 'krakow',
        airports_icao: 'EPKK',
        airports_iata: 'KRK',
        airports_name: 'Krakow John Paul II International Airport'
    }, ljubljana: {
        city: 'ljubljana', airports_icao: 'LJLJ', airports_iata: 'LJU', airports_name: 'Ljubljana Joze Pucnik Airport'
    }, madrid: {
        city: 'madrid', airports_icao: 'LEMD', airports_iata: 'MAD', airports_name: 'Madrid Barajas Airport'
    }, milan: {
        city: 'milan', airports_icao: 'KGNT', airports_iata: 'GNT', airports_name: 'Grants Milan Municipal'
    }, munich: {
        city: 'munich', airports_icao: 'EDDM', airports_iata: 'MUC', airports_name: 'Munich Airport'
    }, paris: {
        city: 'paris', airports_icao: 'LFOB', airports_iata: 'BVA', airports_name: 'Paris Beauvais-Tille Airport'
    }, prague: {
        city: 'prague', airports_icao: 'LKKB', airports_iata: 'QZK', airports_name: 'Prague Kbely Airport'
    }, reykjavik: {
        city: 'reykjavik', airports_icao: 'BIKF', airports_iata: 'KEF', airports_name: 'Keflavik International Airport'
    }, rome: {
        city: 'rome', airports_icao: 'NZGB', airports_iata: 'GBZ', airports_name: 'Claris Great Barrier Aerodrome'
    }, salzburg: {
        city: 'salzburg', airports_icao: 'LOWS', airports_iata: 'SZG', airports_name: 'Salzburg Airport'
    }, seville: {
        city: 'seville', airports_icao: 'LEZL', airports_iata: 'SVQ', airports_name: 'Seville San Pablo Airport'
    }, stockholm: {
        city: 'stockholm', airports_icao: 'ESSA', airports_iata: 'ARN', airports_name: 'Stockholm Arlanda Airport'
    }, tallinn: {
        city: 'tallinn', airports_icao: 'EETN', airports_iata: 'TLL', airports_name: 'Tallinn Lennart Meri Airport '
    }, venice: {
        city: 'venice', airports_icao: 'LIPZ', airports_iata: 'VCE', airports_name: 'Venice Marco Polo Airport'
    }, vienna: {
        city: 'vienna', airports_icao: 'LOWW', airports_iata: 'VIE', airports_name: 'Vienna International Airport'
    }, warsaw: {
        city: 'warsaw', airports_icao: 'EPBC', airports_iata: 'QPB', airports_name: 'Warsaw Babice Airport'
    }, innsbruck: {
        city: 'innsbruck', airports_icao: 'LOWI', airports_iata: 'INN', airports_name: 'Innsbruck Kranebitten Airport'
    }, lech: {
        city: 'lech', airports_icao: 'EPGD', airports_iata: 'GDN', airports_name: 'Gdansk Lech Walesa Airport'
    }, 'mont blanc': {
        city: 'mont blanc', airports_icao: 'LFLP', airports_iata: 'NCY', airports_name: 'Annecy Mont Blanc Airport'
    }, 'st. moritz': {
        city: 'st. moritz', airports_icao: 'LSZS', airports_iata: 'SMV', airports_name: 'St. Moritz Samedan Airport'
    }, 'zell am see': {
        city: 'zell am see', airports_icao: 'LOWZ', airports_iata: 'QOZ', airports_name: 'Zell am See Airport'
    }, brussels: {
        city: 'brussels', airports_icao: 'EBBR', airports_iata: 'BRU', airports_name: 'Brussels Airport'
    }, bucharest: {
        city: 'bucharest', airports_icao: 'LRBS', airports_iata: 'BBU', airports_name: 'Bucharest Aurel Vlaicu Airport'
    }, dublin: {
        city: 'dublin', airports_icao: 'EIDW', airports_iata: 'DUB', airports_name: 'Dublin Airport'
    }, hamburg: {
        city: 'hamburg', airports_icao: 'EDDH', airports_iata: 'HAM', airports_name: 'Hamburg Airport'
    }, london: {
        city: 'london', airports_icao: 'EGAE', airports_iata: 'LDY', airports_name: 'City of Derry Airport'
    }, naples: {
        city: 'naples', airports_icao: 'LIRN', airports_iata: 'NAP', airports_name: 'Naples Airport'
    }, oslo: {
        city: 'oslo', airports_icao: 'ENGM', airports_iata: 'OSL', airports_name: 'Oslo Gardermoen Airport'
    }, zurich: {
        city: 'zurich', airports_icao: 'LSZH', airports_iata: 'ZRH', airports_name: 'Zurich Airport'
    }, fuerteventura: {
        city: 'fuerteventura', airports_icao: 'GCFV', airports_iata: 'FUE', airports_name: 'Fuerteventura Airport'
    }, lanzarote: {
        city: 'lanzarote', airports_icao: 'GCRR', airports_iata: 'ACE', airports_name: 'Lanzarote Airport'
    }, marseille: {
        city: 'marseille', airports_icao: 'LFML', airports_iata: 'MRS', airports_name: 'Marseille Provence Airport'
    }, turin: {
        city: 'turin', airports_icao: 'SVMT', airports_iata: 'MUN', airports_name: 'Maturin International Airport'
    }
}

const accommodationTypes = {
    hotel: "Hotel",
    hostel: "Hostel",
    bedAndBreakfast: "bedAndBreakfast",
    vacationHomes: "VacationHomes",
}

module.exports.allCities = allCities
module.exports.cityMapping = cityMapping
module.exports.airportData = airportData