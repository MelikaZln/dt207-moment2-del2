## Moment 2- del 2
Den här delen är fortsättningen till förra delen. I denna del ska jag skapa en webbapplikation som konsumerar webbtjänsten. Denna del ska vara fristående från webbtjänsten alltså den ska inte vara baserad på Express/Ejs. Webbappen ska läsa ut befintliga poster (arbetserfarenheter) och det ska vara möjligt att lägga till nya arbetserfarenheter via ett formulär. Webbapplikationen använder Fetch API för att göra GET-, POST- och DELETE-förfrågningarna. Webbapplikationen är gjort med HTML, CSS och JavaScript. 

Webbappen har tre olika undersidor: 
1- startsidan: i den kan man se alla befintliga arbetslivserfarenheter.
2- lägga till nya kurser: I denna sida har vi en formulär som man kan lägga till nya poerfarenheter  genom det.   
3- om sida: i denna sida kan vi läsa vad hela uppgiften handlar om.

Här nere ska jag beskriva JavaScript-koden:
I början har jag const apiUrl = 'http://localhost:3101/api/workexperience'; det är url:en till backend-webbtjänsten där erfarenheterna lagras.

function deleteWorkExperience(workId) {...} här har jag en function som tar emot en arbetserfarenhet-ID som parameter, och använder fetch() för att skicka DELETE-begäran till backenden med det angivna arbets-ID:et. och till slut uppdateras listen med erfarenheterna eftersom en erfarenhet är borta. 

function createDeleteButton(workId) {...} den här funktionen skapar en tabort-knapp, när man klickar på denna knapp som anropas deleteWorkExperience() alltså funktionen som tar bort erfarenheten.

function getWorkExperience() {...} med denna funktion kan man hämta arbetserfarenheterna genom fetch(), och med den hämtade erfarenheten uppdateras listan på startsidan. För att skapa html-element till varje erfarenhet och lägga den till listan  använde jag forEach-loop.

function loadData() {...} denna funktion anropas när sidan laddas för att initiera hämtningen av arbetslivserfarenheter.

function addWorkExperience(event) {...} denna funktion anropas när man lägger till en ny erfarenhet i add.html sidan, 
det fångar data från formulären och skapar ett JSON-objekt av den.
Den här funktionen använder sig av fetch() för att skucka en POST-begäran till backenden med den nya erfarenheten. Till slut återställs formuläret efter att erfarenheten har lagts till. 

if (document.getElementById('add-workexperience-form')) {
    document.getElementById('add-workexperience-form').addEventListener('submit', addWorkExperience); 
} den här delen kontrollerar om formuläret med add-workexperience-formID finns i htmlen, om det finns så kallas addWorkExperience(), när formuläret skickas in. Så man kan säga att denna kod säker ställer att lyssnaren för submit-evenemanget endast läggs till om ett formulär med add-workexperience-formID finns i html. det förhindrar att en händelselyssnare läggs till på ett formulär som inte fnns vilket skulle resultera i del JavaScript-koden. 


