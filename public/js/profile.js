const search = document.getElementById('search');
const searchInput = document.getElementById('searchInput');
const save = document.getElementById('save')

// const newFormHandler = async (event) => {
//   event.preventDefault();

//   const name = document.querySelector('#project-name').value.trim();
//   const needed_funding = document.querySelector('#project-funding').value.trim();
//   const description = document.querySelector('#project-desc').value.trim();

//   if (name && needed_funding && description) {
//     const response = await fetch(`/api/projects`, {
//       method: 'POST',
//       body: JSON.stringify({ name, needed_funding, description }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       document.location.replace('/profile');
//     } else {
//       alert('Failed to create project');
//     }
//   }
// };

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/saved/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete country');
    }
  }
};

search.addEventListener('click', function(){
  const saved = document.getElementById('saved');
  saved.innerHTML = ''
  fetch(`https://restcountries.com/v3.1/name/${searchInput.value}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    
    console.log(data);
    const name = data[0].name.common;
    console.log(name);
    const nameDiv = document.getElementById('name');
    nameDiv.innerHTML = name;
    const capital = data[0].capital[0];
    console.log(capital);
    const capDiv = document.getElementById('capital');
    capDiv.innerHTML = `Capital: ${capital}`;
    const continent = data[0].continents[0];
    console.log(continent);
    const conDiv = document.getElementById('continent');
    conDiv.innerHTML = `Continent: ${continent}`;
    const currencies = data[0].currencies;
    const currenciesKeys = Object.keys(currencies);
    console.log(currencies);
    const currDiv = document.getElementById('currencies');
    currDiv.innerHTML = `Currency used: ${currenciesKeys[0]}`;
    const languages = data[0].languages;
    const languageKeys = Object.keys(languages);
    console.log(languageKeys);
    console.log(`Main Language: ${languages[languageKeys[0]]}`);
    const langDiv = document.getElementById('languages');
    langDiv.innerHTML = `First language spoken: ${languageKeys[0]}`;
    const timezone = data[0].timezones[0];
    console.log(timezone);
    const timeDiv = document.getElementById('timezone');
    timeDiv.innerHTML = `Timezone: ${timezone}`;
    const maps = data[0].maps;
    const mapKeys = Object.keys(maps);
    console.log(maps);
    const mapDiv = document.getElementById('maps');
    mapDiv.innerHTML = `Google Maps: ${mapKeys[0]}`;
    
  const visa = document.getElementById('visa');
    if (name === 'China') {
      visa.innerHTML = `Visa requirements: Visa Required`
    } else if (name === 'Thailand') {
      visa.innerHTML = `Visa requirements: Visa Required`
    } else if (name === 'Italy') {
      visa.innerHTML = `Visa requirements: Not required for less than 90 days`
    } else if (name === 'France') {
      visa.innerHTML = `Visa requirements: Not required for less than 90 days`
    } else if (name === 'Spain') {
      visa.innerHTML = `Visa requirements: Not required for less than 90 days`
    } else if (name === 'Germany') {
      visa.innerHTML = `Visa requirements: Not required for less than 90 days`
    } else if (name === 'Turkey') {
      visa.innerHTML = `Visa requirements: Not required for less than 90 days`
    } else if (name === 'Mexico') {
      visa.innerHTML = `Visa requirements: Not required for less than 180 days`
    } else if (name === 'United Kingdom') {
      visa.innerHTML = `Visa requirements: Not required for less than 180 days`
    } else if (name === 'Greece') {
      visa.innerHTML = `Visa requirements: Not required for less than 90 days`
    } else {
      visa.innerHTML = `Unable to find visa requirements`
    };

    save.addEventListener('click', function() {
      console.log("You clicked me!");
      fetch(`/api/saved`, {
              method: 'POST',
              body: JSON.stringify({ name }),
              headers: {
                'Content-Type': 'application/json',
              },
    })

   
    saved.innerHTML = `Saved! Feel free to search for another country or visit your homepage`
  
  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
  });
});
})


// document
//   .querySelector('.new-project-form')
//   .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.project-list')
//   .addEventListener('click', delButtonHandler)
