const allPeople = 'http://api.open-notify.org/astros.json';
const wiki = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

function getPeople(url, callback) {
  const xmlRequest = new XMLHttpRequest();
  xmlRequest.open('GET', url);
  xmlRequest.onload = () => {
    if(xmlRequest.status === 200) {
      let data = JSON.parse(xmlRequest.responseText);
      return callback(data);
    }
  };
  xmlRequest.send();
}

//Add anonymous function for the event listener!
btn.addEventListener('click', () => {
  btn.style.display = 'none';
  getPeople(allPeople, (jsonData) => {
    jsonData.people.map( person => {
      getPeople(wiki+person.name, generateHTML);
    })
  });

});

// Generate the markup for each profile
function generateHTML(data) {
  const section = document.createElement('section');
  peopleList.appendChild(section);
  // Check if request returns a 'standard' page from Wiki
  if (data.type === 'standard') {
    section.innerHTML = `
      <img src=${data.thumbnail.source}>
      <h2>${data.title}</h2>
      <p>${data.description}</p>
      <p>${data.extract}</p>`;
  } else {
    section.innerHTML = `<img src="img/profile.jpg" alt="ocean clouds seen from space">
      <h2>${data.title}</h2>
      <p>Results unavailable for ${data.title}</p>
      ${data.extract_html}`;
  }
}