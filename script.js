const countries = {
  "TR": {
    timezone: "Europe/Istanbul",
    cities: ["İstanbul", "Ankara", "İzmir", "Antalya", "Bursa", "Adana", "Konya", "Gaziantep", "Samsun", "Trabzon", "Van", "Kayseri", "Mersin", "Eskişehir", "Erzurum", "Diyarbakır", "Malatya", "Sivas", "Kocaeli", "Denizli", "Manisa", "Aydın", "Balıkesir", "Şanlıurfa", "Hatay", "Çanakkale", "Rize", "Ordu", "Kahramanmaraş", "Tekirdağ", "Zonguldak"]
  },
  "US": {
    timezone: "America/New_York",
    cities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Diego", "Dallas", "Austin", "San Jose"]
  },
  "BR": {
    timezone: "America/Sao_Paulo",
    cities: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza", "Belo Horizonte", "Manaus", "Curitiba", "Recife", "Porto Alegre"]
  },
  "FR": {
    timezone: "Europe/Paris",
    cities: ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille"]
  },
  "RU": {
    timezone: "Europe/Moscow",
    cities: ["Moskova", "St. Petersburg", "Kazan", "Novosibirsk", "Yekaterinburg", "Omsk", "Rostov", "Perm", "Krasnoyarsk", "Vladivostok"]
  },
  "AU": {
    timezone: "Australia/Sydney",
    cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Canberra", "Hobart", "Darwin", "Gold Coast", "Newcastle"]
  },
  "IN": {
    timezone: "Asia/Kolkata",
    cities: ["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Ahmedabad", "Pune", "Jaipur", "Lucknow", "Kolkata"]
  },
  "CN": {
    timezone: "Asia/Shanghai",
    cities: ["Pekin", "Şangay", "Guangzhou", "Shenzhen", "Tianjin", "Wuhan", "Chengdu", "Nanjing", "Hangzhou", "Chongqing"]
  },
  "ZA": {
    timezone: "Africa/Johannesburg",
    cities: ["Cape Town", "Johannesburg", "Durban", "Pretoria", "Port Elizabeth", "Bloemfontein", "Soweto", "East London", "Polokwane", "Kimberley"]
  }
};

const countrySelect = document.getElementById('country-select');
const citySelect = document.getElementById('city-select');
const timeDisplay = document.getElementById('time-display');

countrySelect.addEventListener('change', () => {
  const countryCode = countrySelect.value;
  citySelect.innerHTML = '<option value="">Şehir Seçiniz</option>';
  if (countryCode && countries[countryCode]) {
    const cityList = countries[countryCode].cities;
    cityList.forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });
    citySelect.classList.remove('hidden');
  } else {
    citySelect.classList.add('hidden');
    timeDisplay.classList.add('hidden');
  }
});

citySelect.addEventListener('change', () => {
  const countryCode = countrySelect.value;
  if (countryCode && countries[countryCode]) {
    const timezone = countries[countryCode].timezone;
    showTime(timezone);
  }
});

function showTime(timezone) {
  const now = new Date();
  const localTime = now.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timezone
  });
  timeDisplay.textContent = `Saat: ${localTime}`;
  timeDisplay.classList.remove('hidden');

  // Tema geçişi
  const hour = parseInt(now.toLocaleString("en-US", { hour: "2-digit", hour12: false, timeZone: timezone }));
  if (hour >= 6 && hour < 18) {
    document.body.classList.add('day');
    document.body.classList.remove('night');
  } else {
    document.body.classList.add('night');
    document.body.classList.remove('day');
  }
}
