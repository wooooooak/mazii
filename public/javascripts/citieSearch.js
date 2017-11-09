
const options = {
  valueNames: [ 'city', 'nation',{attr:'href',name:'link'} ],
  item: '<li> <a class="link" /> <h3 class="city"></h3>  <span class="nation"></span></li>'
};

const values = [
  //유럽
    { city: 'Paris', nation:'France',link:'city/Paris' }  //프랑스
    , { city: 'Lyon', nation:'France',link:'city/Lyon' }
  
    , { city: 'Marseille', nation:'France',link:'city/Marseille' }
    , { city: 'Nice', nation:'France',link:'city/Nice' }
  
  
    , { city: 'Moscow', nation:'Russia',link:'city/Moscow' } //러시아
  
  
    , { city: 'Zagreb', nation:'Croatia',link:'city/Zagreb' } //크로아티아
  
  
    , { city: 'Rome', nation:'Italy',link:'city/Rome' }  //이탈리아
    , { city: 'Venice', nation:'Italy',link:'city/Venice' }
  
    , { city: 'Milan', nation:'Italy',link:'city/Milan' }
    , { city: 'Firenze', nation:'Italy',link:'city/Firenze' }
  
  
    , { city: 'Prague', nation:'Czech Republic',link:'city/Prague' }  //체코
  
  
    , { city: 'Istanbul', nation:'Turkey',link:'city/Istanbul' }  //터키
  
  
    , { city: 'Madrid', nation:'Spain',link:'city/Madrid' }  //스페인
    , { city: 'Granada', nation:'Spain',link:'city/Granada' }
  
    , { city: 'Barcelona', nation:'Spain',link:'city/Barcelona' }
    , { city: 'Valencia', nation:'Spain',link:'city/Valencia' }
    , { city: 'Seville', nation:'Spain',link:'city/Seville' }
  
  
   , { city: 'Athine', nation:'Greece',link:'city/Athine' }  //그리스
  
  
    , { city: 'Amsterdam', nation:'Netherlands',link:'city/Amsterdam' }  //네덜란드
  
    , { city: 'Rotterdam', nation:'Netherlands',link:'city/Rotterdam' }
  
  
    , { city: 'London', nation:'the United Kingdom',link:'city/London' }  //영국
  
    , { city: 'Bristol', nation:'the United Kingdom',link:'city/Bristol' } 
    , { city: 'Liverpool', nation:'the United Kingdom',link:'city/Liverpool' } 
    , { city: 'Edinburgh', nation:'the United Kingdom',link:'city/Edinburgh' } 
  
  
    , { city: 'Lisbon', nation:'Portugal',link:'city/Lisbon' }  //포르투갈
  
  
    , { city: 'Zurich', nation:'Switzerland',link:'city/Zurich' } //스위스
    , { city: 'Bern', nation:'Switzerland',link:'city/Bern' }  
  
  
    , { city: 'Berlin', nation:'Germany',link:'city/Berlin' }  //독일
  
    , { city: 'Hamburg', nation:'Germany',link:'city/Hamburg' } 
    , { city: 'Munchen', nation:'Germany',link:'city/Munchen' } 
    , { city: 'Fussen', nation:'Germany',link:'city/Fussen' } 
    , { city: 'Dresden', nation:'Germany',link:'city/Dresden' } 
  
  
    , { city: 'Brussels', nation:'Belgium',link:'city/Brussels' }  //벨기에
  
  
  //동남아
    , { city: 'Hanoi', nation:'Vietnam',link:'city/Hanoi' }  //베트남
   
    , { city: 'Da Nang', nation:'Vietnam',link:'city/Da Nang' } 
    , { city: 'Ho Chi Minh', nation:'Vietnam',link:'city/Ho Chi Minh' } 
  
  
    , { city: 'Vang Vieng', nation:'Laos',link:'city/Vang Vieng' }  //라오스
    , { city: 'Vientiane', nation:'Laos',link:'city/Vientiane' } 
  
  
    , { city: 'Naypyidaw', nation:'Republic of the Union of Myanmar',link:'city/Naypyidaw' }  //미얀마
  
  
    , { city: 'Bangkok', nation:'Thailand',link:'city/Bangkok' } //태국
  
  
    , { city: 'Phnum Penh', nation:'Cambodia',link:'city/Phnum Penh' } //캄보디아
  
  
  
    , { city: 'Kuala Lumpur', nation:'Malaysia',link:'city/Kuala Lumpur' } //말레이시아
  
  
  
  //오세아니아
    , { city: 'Sidney', nation:'Australia',link:'city/Sidney' } //호주
    , { city: 'Canberra', nation:'Australia',link:'city/Canberra' }
  
  
    , { city: 'Wellington', nation:'New Zealand',link:'city/Wellington' } //뉴질랜드
  
  //동아시아
    , { city: 'Seoul', nation:'Korea',link:'city/Seoul' }  //한국
    , { city: 'Jeju', nation:'Korea',link:'city/Jeju' }
    , { city: 'Busan', nation:'Korea',link:'city/Busan' }
  
  
    , { city: 'Fukuoka', nation:'Japan',link:'city/Fukuoka' } //일본
    , { city: 'Kyoto', nation:'Japan',link:'city/Kyoto' }
    , { city: 'Kobe', nation:'Japan',link:'city/Kobe' }
    , { city: 'Sapporo', nation:'Japan',link:'city/Sapporo' }
  
    , { city: 'Tokyo', nation:'Japan',link:'city/Tokyo' }
    , { city: 'Osaka', nation:'Japan',link:'city/Osaka' }

    , { city: 'Shanghai', nation:'China',link:'city/Shanghai' } //중국
    , { city: 'Tianjin', nation:'China',link:'city/Tianjin' }
    , { city: 'Guangzhou', nation:'China',link:'city/Guangzhou' }
    , { city: 'Macau', nation:'China',link:'city/Macau' }
    , { city: 'Zhangjiajie', nation:'China',link:'city/Zhangjiajie' }
    , { city: 'HongKong', nation:'China',link:'city/HongKong' }
    , { city: 'Beijing', nation:'China',link:'city/Beijing' }
    , { city: 'Taipei', nation:'Taiwan',link:'city/Taipei' }   //대만
    , { city: 'Taizhong', nation:'Taiwan',link:'city/Taizhong' }
    , { city: 'Tamsui', nation:'Taiwan',link:'city/Tamsui' }
    , { city: 'Kaohsiung', nation:'Taiwan',link:'city/Kaohsiung' }
    , { city: 'Singapore', nation:'Singapore',link:'city/Singapore' }  //싱가폴
  
  
    , { city: 'Manila', nation:'Philippines',link:'city/Manila' }   //필리핀
  //북중미
    , { city: 'Washington D.C', nation:'the United States',link:'city/Washington D.C' }  //미국
    , { city: 'New York', nation:'the United States',link:'city/New York' }
    , { city: 'Las Vegas', nation:'the United States',link:'city/Las Vegas' }
    , { city: 'Los Angeles', nation:'the United States',link:'city/Los Angeles' }
    , { city: 'Hawaii', nation:'the United States',link:'city/Hawaii' }
    , { city: 'Guam', nation:'the United States',link:'city/Guam' }
    , { city: 'Maxico city', nation:'Maxico',link:'city/Maxico city' }  //멕시코
   
    , { city: 'Ottawa', nation:'Canada',link:'city/Ottawa' }  //캐나다
    , { city: 'Vancouver', nation:'Canada',link:'city/Vancouver' }
  
  //남미
    , { city: 'Brasilia', nation:'Brazil',link:'city/Brasilia' }  //브라질
    , { city: 'Rio de Janeiro', nation:'Brazil',link:'city/Rio de Janeiro' } 
    , { city: 'Buenos Aires', nation:'Argentina',link:'city/Buenos Aires' }  //아르헨티나
    , { city: 'Lima', nation:'Peru',link:'city/Lima' }  //페루
    , { city: 'Santiago', nation:'Chile',link:'city/Santiago' }  //칠레
  
  //중동
    , { city: 'Dubai', nation:'United Arab Emirates',link:'city/Dubai' }  //아랍에미리트
  
    , { city: 'New Delhi', nation:'India',link:'city/New Delhi' }  //인도
  
  ];

// const values = [
//     { city: 'Paris', nation:'France',link:'city/Paris' }
//   , { city: 'Lyon', nation:'France',link:'city/Lyon' }
//   , { city: 'Tokyo', nation:'Japan',link:'city/Tokyo' }
//   , { city: 'HongKong', nation:'China',link:'city/HongKong' }
//   , { city: 'Osaka', nation:'Japan',link:'city/Osaka' }
//   , { city: 'Rome', nation:'Italy',link:'city/Rome' }
//   , { city: 'Venice', nation:'Italy',link:'city/Venice' }
//   , { city: 'Hanoi', nation:'Vietnam',link:'city/Hanoi' }
//   , { city: 'Sidney', nation:'Australia',link:'city/Sidney' }
//   , { city: 'Bangkok', nation:'Thailand',link:'city/Bangkok' }
//   , { city: 'Prague', nation:'Czech Republic',link:'city/Prague' }
//   , { city: 'Seoul', nation:'Korea',link:'city/Seoul' }
//   , { city: 'Jeju', nation:'Korea',link:'city/Jeju' }
//   , { city: 'Busan', nation:'Korea',link:'city/Busan' }
//   , { city: 'Istanbul', nation:'Turkey',link:'city/Istanbul' }
//   , { city: 'Madrid', nation:'Spain',link:'city/Madrid' }
//   , { city: 'Granada', nation:'Spain',link:'city/Granada' }
//   , { city: 'Athine', nation:'Greece',link:'city/Athine' }
//   , { city: 'Amsterdam', nation:'Netherlands',link:'city/Amsterdam' }
//   , { city: 'London', nation:'the United Kingdom',link:'city/London' }
//   , { city: 'Lisbon', nation:'Portugal',link:'city/Lisbon' }
//   , { city: 'Berlin', nation:'Germany',link:'city/Berlin' }
//   , { city: 'Ottawa', nation:'Canada',link:'city/Ottawa' }
//   , { city: 'Singapore', nation:'Singapore',link:'city/Singapore' }
//   , { city: 'Washington D.C', nation:'the United States',link:'city/Washington D.C' }
//   , { city: 'New York', nation:'the United States',link:'city/New York' }
//   , { city: 'Las Vegas', nation:'the United States',link:'city/Las Vegas' }
//   , { city: 'Maxico city', nation:'Maxico',link:'city/Maxico city' }
//   , { city: 'Beijing', nation:'China',link:'city/Beijing' }
// ];

const cityList = new List('city-list', options, values);