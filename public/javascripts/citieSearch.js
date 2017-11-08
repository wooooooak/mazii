
const options = {
  valueNames: [ 'city', 'nation',{attr:'href',name:'link'} ],
  item: '<li> <a class="link" /> <h3 class="city"></h3>  <span class="nation"></span></li>'
};

const values = [
    { city: 'Paris', nation:'France',link:'city/Paris' }
  , { city: 'Lyon', nation:'France',link:'city/Lyon' }
  , { city: 'Tokyo', nation:'Japan',link:'city/Tokyo' }
  , { city: 'HongKong', nation:'China',link:'city/HongKong' }
  , { city: 'Osaka', nation:'Japan',link:'city/Osaka' }
  , { city: 'Rome', nation:'Italy',link:'city/Rome' }
  , { city: 'Venice', nation:'Italy',link:'city/Venice' }
  , { city: 'Hanoi', nation:'Vietnam',link:'city/Hanoi' }
  , { city: 'Sidney', nation:'Australia',link:'city/Sidney' }
  , { city: 'Bangkok', nation:'Thailand',link:'city/Bangkok' }
  , { city: 'Prague', nation:'Czech Republic',link:'city/Prague' }
  , { city: 'Seoul', nation:'Korea',link:'city/Seoul' }
  , { city: 'Jeju', nation:'Korea',link:'city/Jeju' }
  , { city: 'Busan', nation:'Korea',link:'city/Busan' }
  , { city: 'Istanbul', nation:'Turkey',link:'city/Istanbul' }
  , { city: 'Madrid', nation:'Spain',link:'city/Madrid' }
  , { city: 'Granada', nation:'Spain',link:'city/Granada' }
  , { city: 'Athine', nation:'Greece',link:'city/Athine' }
  , { city: 'Amsterdam', nation:'Netherlands',link:'city/Amsterdam' }
  , { city: 'London', nation:'the United Kingdom',link:'city/London' }
  , { city: 'Lisbon', nation:'Portugal',link:'city/Lisbon' }
  , { city: 'Berlin', nation:'Germany',link:'city/Berlin' }
  , { city: 'Ottawa', nation:'Canada',link:'city/Ottawa' }
  , { city: 'Singapore', nation:'Singapore',link:'city/Singapore' }
  , { city: 'Washington D.C', nation:'the United States',link:'city/Washington D.C' }
  , { city: 'New York', nation:'the United States',link:'city/New York' }
  , { city: 'Las Vegas', nation:'the United States',link:'city/Las Vegas' }
  , { city: 'Maxico city', nation:'Maxico',link:'city/Maxico city' }
  , { city: 'Beijing', nation:'China',link:'city/Beijing' }
];

const cityList = new List('city-list', options, values);