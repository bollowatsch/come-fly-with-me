const pictureData = {
    alicante: {
        city: 'alicante', picture: 'https://images.pexels.com/photos/17125402/pexels-photo-17125402/free-photo-of-alicante-puerto.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, amalfi: {
        city: 'amalfi', picture: 'https://images.pexels.com/photos/10436112/pexels-photo-10436112.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, barcelona: {
        city: 'barcelona', picture: 'https://images.pexels.com/photos/1386444/pexels-photo-1386444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, cannes: {
        city: 'cannes', picture: 'https://images.pexels.com/photos/17230747/pexels-photo-17230747/free-photo-of-sonnenuntergang-frankreich-wahrzeichen-gebaude.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, corfu: {
        city: 'corfu', picture: 'https://images.pexels.com/photos/9213280/pexels-photo-9213280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, dubrovnik: {
        city: 'dubrovnik', picture: 'https://images.pexels.com/photos/3566139/pexels-photo-3566139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, faro: {
        city: 'faro', picture: 'https://images.pexels.com/photos/8424862/pexels-photo-8424862.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, ibiza: {
        city: 'ibiza', picture: 'https://images.pexels.com/photos/11631647/pexels-photo-11631647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, lagos: {
        city: 'lagos', picture: 'https://images.pexels.com/photos/5373705/pexels-photo-5373705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, lisbon: {
        city: 'lisbon', picture: 'https://images.pexels.com/photos/1534560/pexels-photo-1534560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, malaga: {
        city: 'malaga', picture: 'https://images.pexels.com/photos/1884417/pexels-photo-1884417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, mallorca: {
        city: 'mallorca', picture: 'https://images.pexels.com/photos/17218895/pexels-photo-17218895/free-photo-of-stadt-hafen-reise-reisen.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, monaco: {
        city: 'monaco', picture: 'https://images.pexels.com/photos/3586/port-yachts-monaco-luxury.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, mykonos: {
        city: 'mykonos', picture: 'https://images.pexels.com/photos/388452/pexels-photo-388452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, nice: {
        city: 'nice', picture: 'https://www.cotedazur.de/images/Nizza.jpg'
    }, palma: {
        city: 'palma', picture: 'https://images.pexels.com/photos/17218895/pexels-photo-17218895/free-photo-of-stadt-hafen-reise-reisen.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, paphos: {
        city: 'paphos', picture: 'https://images.pexels.com/photos/19118898/pexels-photo-19118898/free-photo-of-meer-wahrzeichen-welle-reise.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, porto: {
        city: 'porto', picture: 'https://images.pexels.com/photos/2549572/pexels-photo-2549572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, rimini: {
        city: 'rimini', picture: 'https://www.christophorus.at/wp-content/uploads/2022/09/rimini-strand.jpg'
    }, santorini: {
        city: 'santorini', picture: 'https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, split: {
        city: 'split', picture: 'https://dsvsbigncb06y.cloudfront.net/site/cruise/croatia/cruise--croatia-split-xl.jpg'
    }, tenerife: {
        city: 'tenerife', picture: 'https://images.pexels.com/photos/3932700/pexels-photo-3932700.jpeg'
    }, valencia: {
        city: 'valencia', picture: 'https://images.pexels.com/photos/19702982/pexels-photo-19702982/free-photo-of-stadt-der-kunste-und-wissenschaften.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, vigo: {
        city: 'vigo', picture: 'https://images.pexels.com/photos/18622107/pexels-photo-18622107/free-photo-of-stadt-menschen-reise-reisen.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, zadar: {
        city: 'zadar', picture: 'https://images.pexels.com/photos/17218261/pexels-photo-17218261/free-photo-of-meer-skyline-hafen-kuste.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, amsterdam: {
        city: 'amsterdam', picture: 'https://images.pexels.com/photos/2031706/pexels-photo-2031706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, athens: {
        city: 'athens', picture: 'https://images.pexels.com/photos/951539/pexels-photo-951539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, berlin: {
        city: 'berlin', picture: 'https://images.pexels.com/photos/2570063/pexels-photo-2570063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, bratislava: {
        city: 'bratislava', picture: 'https://images.pexels.com/photos/280173/pexels-photo-280173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, bruges: {
        city: 'bruges', picture: 'https://images.pexels.com/photos/3922964/pexels-photo-3922964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, budapest: {
        city: 'budapest', picture: 'https://images.pexels.com/photos/789614/pexels-photo-789614.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, copenhagen: {
        city: 'copenhagen', picture: 'https://images.pexels.com/photos/416024/pexels-photo-416024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, edinburgh: {
        city: 'edinburgh', picture: 'https://images.pexels.com/photos/968705/pexels-photo-968705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, florence: {
        city: 'florence', picture: 'https://images.pexels.com/photos/208213/pexels-photo-208213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, helsinki: {
        city: 'helsinki', picture: 'https://images.pexels.com/photos/19337103/pexels-photo-19337103/free-photo-of-stadt-stadtisch-urban-fassade.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, istanbul: {
        city: 'istanbul', picture: 'https://images.pexels.com/photos/6152260/pexels-photo-6152260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, krakow: {
        city: 'krakow', picture: 'https://images.pexels.com/photos/4552456/pexels-photo-4552456.jpeg'
    }, ljubljana: {
        city: 'ljubljana', picture: 'https://images.pexels.com/photos/6594360/pexels-photo-6594360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, madrid: {
        city: 'madrid', picture: 'https://images.pexels.com/photos/3757144/pexels-photo-3757144.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, milan: {
        city: 'milan', picture: 'https://images.pexels.com/photos/8430364/pexels-photo-8430364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, munich: {
        city: 'munich', picture: 'https://images.pexels.com/photos/4213372/pexels-photo-4213372.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, paris: {
        city: 'paris', picture: 'https://images.pexels.com/photos/3105066/pexels-photo-3105066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, prague: {
        city: 'prague', picture: 'https://images.pexels.com/photos/1269805/pexels-photo-1269805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, reykjavik: {
        city: 'reykjavik', picture: 'https://images.pexels.com/photos/24205320/pexels-photo-24205320/free-photo-of-island-meer-stadt-boot.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, rome: {
        city: 'rome', picture: 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, salzburg: {
        city: 'salzburg', picture: 'https://images.pexels.com/photos/6148044/pexels-photo-6148044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, seville: {
        city: 'seville', picture: 'https://images.pexels.com/photos/16778471/pexels-photo-16778471/free-photo-of-wahrzeichen-fluss-reise-reisen.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, stockholm: {
        city: 'stockholm', picture: 'https://images.pexels.com/photos/3030468/pexels-photo-3030468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, tallinn: {
        city: 'tallinn', picture: 'https://images.pexels.com/photos/19542665/pexels-photo-19542665/free-photo-of-stadt-gebaude-kuste-reise.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, venice: {
        city: 'venice', picture: 'https://images.pexels.com/photos/3546189/pexels-photo-3546189.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, vienna: {
        city: 'vienna', picture: 'https://images.pexels.com/photos/3741463/pexels-photo-3741463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, warsaw: {
        city: 'warsaw', picture: 'https://www.telegraph.co.uk/content/dam/travel/2023/10/17/TELEMMGLPICT000353346157_16975480872940_trans_NvBQzQNjv4BqRo0U4xU-30oDveS4pXV-Vv4Xpit_DMGvdp2n7FDd82k.jpeg'
    }, innsbruck: {
        city: 'innsbruck', picture: 'https://images.pexels.com/photos/19059264/pexels-photo-19059264/free-photo-of-wahrzeichen-gebaude-berg-bunt.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, lech: {
        city: 'lech', picture: 'https://www.europas-wanderdoerfer.com/wp-content/uploads/2018/02/Europas-Wanderdorf_Lech-am-Arlberg_Copyright-LechZuersTourismus-e1521023942314.jpg'
    }, 'mont blanc': {
        city: 'mont blanc', picture: 'https://images.pexels.com/photos/416779/pexels-photo-416779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, 'st. moritz': {
        city: 'st. moritz', picture: 'https://cdn.indebergen.nl/media/3jojlhf1/st-moritz.jpeg?anchor=center&mode=crop&width=1080&height=608&format=webp&quality=80'
    }, 'zell am see': {
        city: 'zell am see', picture: 'https://www.zellamsee-kaprun.com/bilder/landschaft/sommer/6207/image-thumb__6207__lightbox/zell-am-see-insel-von-oben---zell-am-see-from-above-c-zell-am-see-kaprun-tourismus.jpg'
    }, brussels: {
        city: 'brussels', picture: 'https://images.pexels.com/photos/1595085/pexels-photo-1595085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, bucharest: {
        city: 'bucharest', picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Bucharest_city_center.jpg/800px-Bucharest_city_center.jpg'
    }, dublin: {
        city: 'dublin', picture: 'https://images.pexels.com/photos/2416653/pexels-photo-2416653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, hamburg: {
        city: 'hamburg', picture: 'https://images.pexels.com/photos/167676/pexels-photo-167676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, london: {
        city: 'london', picture: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, naples: {
        city: 'naples', picture: 'https://images.pexels.com/photos/67918/pexels-photo-67918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, oslo: {
        city: 'oslo', picture: 'https://images.pexels.com/photos/4150060/pexels-photo-4150060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, zurich: {
        city: 'zurich', picture: 'https://images.pexels.com/photos/9639686/pexels-photo-9639686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, fuerteventura: {
        city: 'fuerteventura', picture: 'https://images.pexels.com/photos/11436423/pexels-photo-11436423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, lanzarote: {
        city: 'lanzarote', picture: 'https://images.pexels.com/photos/15173067/pexels-photo-15173067/free-photo-of-berge-dorf-reise-reisen.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }, marseille: {
        city: 'marseille', picture: 'https://www.sncf-connect.com/assets/media/2021-08/vue-sur-le-vieux-port-de-marseille.jpg'
    }, turin: {
        city: 'turin', picture: 'https://images.pexels.com/photos/26087493/pexels-photo-26087493/free-photo-of-olympus-digitalkamera.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
}

module.exports.pictureData = pictureData;