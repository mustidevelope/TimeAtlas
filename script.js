const countrySelect = document.getElementById("country-select");
const citySelect = document.getElementById("city-select");
const timeDisplay = document.getElementById("time-display");

const cityData = {
  TR: ["İstanbul", "Ankara", "İzmir", "Bursa", "Adana", "Antalya", "Gaziantep", "Konya", "Kayseri", "Mersin", "Diyarbakır", "Samsun", "Trabzon", "Erzurum", "Malatya", "Sakarya", "Eskişehir", "Manisa", "Denizli", "Kahramanmaraş", "Van", "Şanlıurfa", "Batman", "Ordu", "Aydın", "Balıkesir", "Afyon", "Kocaeli", "Rize", "Zonguldak", "Hatay", "Kütahya", "Elazığ", "Çanakkale", "Tekirdağ", "Isparta", "Muğla", "Yozgat", "Tokat", "Uşak", "Nevşehir", "Sivas", "Karabük", "Giresun", "Aksaray", "Bolu", "Niğde", "Bartın", "Bilecik"],
  US: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "Fort Worth", "Columbus", "San Francisco", "Charlotte", "Indianapolis", "Seattle", "Denver", "Washington", "Boston", "El Paso", "Detroit", "Nashville", "Portland", "Memphis", "Oklahoma City", "Las Vegas", "Louisville", "Baltimore", "Milwaukee", "Albuquerque", "Tucson", "Fresno", "Sacramento", "Kansas City", "Mesa", "Atlanta", "Miami", "Cleveland", "Minneapolis", "Tulsa", "Wichita", "Arlington", "Tampa", "Bakersfield", "Aurora", "Honolulu", "Anaheim", "Lexington", "Stockton", "Plano"],
  BR: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza", "Belo Horizonte", "Manaus", "Curitiba", "Recife", "Porto Alegre", "Belém", "Goiânia", "Guarulhos", "Campinas", "São Luís", "São Gonçalo", "Maceió", "Duque de Caxias", "Nova Iguaçu", "São Bernardo do Campo"],
  // Diğer ülkeleri benzer şekilde ekleyebilirsin...
};

countrySelect.addEventListener("change", () => {
  const selectedCountry = countrySelect.value;
  citySelect.innerHTML = '<option value="">Şehir Seçiniz</option>';

  if (selectedCountry && cityData[selectedCountry]) {
    cityData[selectedCountry].forEach(city => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });

    citySelect.classList.remove("hidden");
  } else {
    citySelect.classList.add("hidden");
    timeDisplay.classList.add("hidden");
  }
});

citySelect.addEventListener("change", () => {
  const city = citySelect.value;
  if (!city) return;

  fetch(`https://worldtimeapi.org/api/timezone`)
    .then(res => res.json())
    .then(data => {
      const timezone = data.find(zone => zone.toLowerCase().includes(city.toLowerCase()));
      if (timezone) {
        fetch(`https://worldtimeapi.org/api/timezone/${timezone}`)
          .then(res => res.json())
          .then(timeData => {
            const time = new Date(timeData.datetime);
            const hours = time.getHours().toString().padStart(2, '0');
            const minutes = time.getMinutes().toString().padStart(2, '0');
            timeDisplay.textContent = `${hours}:${minutes}`;
            timeDisplay.classList.remove("hidden");

            document.body.classList.toggle("night", hours < 6 || hours > 18);
            document.body.classList.toggle("day", hours >= 6 && hours <= 18);
          });
      } else {
        timeDisplay.textContent = "Zaman alınamadı";
      }
    });
});
