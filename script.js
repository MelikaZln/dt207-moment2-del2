// URL till backend-webbtjänsten
const apiUrl = 'http://localhost:3101/api/workexperience';

// Funktion för att ta bort arbetslivserfarenhet
function deleteWorkExperience(workId) {
    fetch(apiUrl + `/${workId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {

        // Uppdatera listan med arbetslivserfarenheter efter borttagning
        getWorkExperience();
    })
    .catch(error => console.error('Error deleting workexperience:', error));
}

// Funktion för att skapa en knapp för varje arbetslivserfarenhet
function createDeleteButton(workId) {
    const button = document.createElement('button');
    button.textContent = 'Ta bort';
    button.addEventListener('click', () => {
        deleteWorkExperience(workId);
    });
    return button;
}
// Funktion för att hämta arbetslivserfarenheter och visa dem på startsidan
function getWorkExperience() {

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const workexperienceList = document.getElementById('workexperience-list');
        if (workexperienceList) {
            // Rensa listan först
            workexperienceList.innerHTML = '';
            // Lägg till arbetslivserfarenheterna igen
            data.forEach(work => {
                const listItemHTML = `
                    <li>
                        Företagsnamn: ${work.companyname}, Jobbtitel: ${work.jobtitle}, Plats: ${work.location}
                        <button onclick="deleteWorkExperience(${work.id})">Ta bort</button>
                    </li>
                `;
                workexperienceList.insertAdjacentHTML('beforeend', listItemHTML);
            });
        }
    })
    .catch(error => console.error('Error:', error));
}


// Funktion för att ladda arbetslivserfarenheter när sidan laddas
function loadData() {
    getWorkExperience();
}
// Funktion för att lägga till ny arbetslivserfarenhet från add.html
function addWorkExperience(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const postData = {};
        // Validera formuläret
        if (!formData.get('companyname') || !formData.get('jobtitle') || !formData.get('location')) {
            alert('Fyll i alla fält');
            return;
        }
    formData.forEach((value, key) => {
        postData[key] = value;
    });
    // Skicka anropet till servern
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => Promise.reject(error));
        }
        return response.json();
    })
    .then(data => {
        form.reset();
        // Visa meddelandet som tas emot från backend
        alert(data.message);
    })
    .catch(error => {
        // Visa felmeddelandet för användaren
        alert(error.error); 
    });
}


// Lyssna på submit-event för att lägga till ny arbetslivserfarenhet från add.html
if (document.getElementById('add-workexperience-form')) {
    document.getElementById('add-workexperience-form').addEventListener('submit', addWorkExperience);
}