

var options = {
  valueNames: [ 'city', 'nation',{attr:'href',name:'link'} ],
  item: '<li> <a class="link" /> <h3 class="city"></h3>  <span class="nation"></span></li>'
};

var values = [
  { city: 'Paris', nation:'France',link:'Paris' }
  , { city: 'Lyon', nation:'France',link:'Lyon' }
  , { city: 'Tokyo', nation:'Japan',link:'Tokyo' }
  , { city: 'HongKong', nation:'China',link:'HongKong' }
  , { city: 'Osaka', nation:'Japan',link:'Osaka' }
  , { city: 'Rome', nation:'Italy',link:'Rome' }
  , { city: 'Venice', nation:'Italy',link:'Venice' }
  , { city: 'Hanoi', nation:'Vietnam',link:'Hanoi' }
  , { city: 'Sidney', nation:'Australia',link:'Sidney' }
  , { city: 'Bangkok', nation:'Thailand',link:'Bangkok' }
  , { city: 'Prague', nation:'Czech Republic',link:'Prague' }
  , { city: 'Seoul', nation:'Korea',link:'Seoul' }
  , { city: 'Jeju', nation:'Korea',link:'Jeju' }
  , { city: 'Busan', nation:'Korea',link:'Busan' }
  , { city: 'Istanbul', nation:'Turkey',link:'Istanbul' }
  , { city: 'Madrid', nation:'Spain',link:'Madrid' }
  , { city: 'Granada', nation:'Spain',link:'Granada' }
  , { city: 'Athine', nation:'Greece',link:'Athine' }
  , { city: 'Amsterdam', nation:'Netherlands',link:'Amsterdam' }
  , { city: 'London', nation:'the United Kingdom',link:'London' }
  , { city: 'Lisbon', nation:'Portugal',link:'Lisbon' }
  , { city: 'Berlin', nation:'Germany',link:'Berlin' }
  , { city: 'Ottawa', nation:'Canada',link:'Ottawa' }
  , { city: 'Singapore', nation:'Singapore',link:'Singapore' }
  , { city: 'Washington D.C', nation:'the United States',link:'Washington D.C' }
  , { city: 'New York', nation:'the United States',link:'New York' }
  , { city: 'Las Vegas', nation:'the United States',link:'Las Vegas' }
  , { city: 'Maxico city', nation:'Maxico',link:'Maxico city' }
  , { city: 'Venice', nation:'Moroco',link:'Venice' }
  , { city: 'Beijing', nation:'China',link:'Beijing' }
];

var cityList = new List('city-list', options, values);