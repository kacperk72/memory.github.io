// document.getElementById('write').innerHTML = window.location.search;
const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span');
// Result popup
const modal_container1 = document.querySelector('.modal_container1');
const modal_container2 = document.querySelector('.modal_container2');
const close_window1 = document.querySelector('#close1');
const close_window2 = document.querySelector('#close2');

// Choose level
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

const livesArray = [3,5,6,7,8,9];
let cardAmount;


// Generate data
const getData = () => [
    { imgSrc: 'img1.png', name: 'kotserce'},
    { imgSrc: 'img1.png', name: 'kotserce'},
    { imgSrc: 'img2.png', name: 'kotplacze'},
    { imgSrc: 'img2.png', name: 'kotplacze'},
    { imgSrc: 'img3.png', name: 'malpkawow'},
    { imgSrc: 'img3.png', name: 'malpkawow'},
    { imgSrc: 'img4.png', name: 'niedzwiedz'},
    { imgSrc: 'img4.png', name: 'niedzwiedz'},
    { imgSrc: 'img5.png', name: 'zaba'},
    { imgSrc: 'img5.png', name: 'zaba'},
    { imgSrc: 'img6.png', name: 'lama'},
    { imgSrc: 'img6.png', name: 'lama'},
    { imgSrc: 'img7.png', name: 'tygrys'},
    { imgSrc: 'img7.png', name: 'tygrys'},
    { imgSrc: 'img8.png', name: 'kotzly'},
    { imgSrc: 'img8.png', name: 'kotzly'},
    { imgSrc: 'img9.png', name: 'ryba'},
    { imgSrc: 'img9.png', name: 'ryba'},
    { imgSrc: 'img10.png', name: 'malpkawesola'},
    { imgSrc: 'img10.png', name: 'malpkawesola'},
    { imgSrc: 'img11.png', name: 'mysz'},
    { imgSrc: 'img11.png', name: 'mysz'},
    { imgSrc: 'img12.png', name: 'kot'},
    { imgSrc: 'img12.png', name: 'kot'},
    { imgSrc: 'img13.png', name: 'kotwesoly'},
    { imgSrc: 'img13.png', name: 'kotwesoly'},
    { imgSrc: 'img14.png', name: 'kosmita'},
    { imgSrc: 'img14.png', name: 'kosmita'},
    { imgSrc: 'img15.png', name: 'goryl'},
    { imgSrc: 'img15.png', name: 'goryl'},
];

let playerLives;
let lives;
// playerLivesCount.textContent = playerLives;

const randomize = () => {
    // get choosen lvl
    const lvl = getUrlVars().memory;
    // get img data 
    let cardData = getData();

    switch (lvl) {
        case('first-level'):
            cardAmount = 8; //liczba kart
            playerLives = livesArray[0];
            section.style.gridTemplateColumns = 'repeat(4,8rem)'; //style budujące siatkę
            section.style.gridTemplateRows = 'repeat(2,8rem)';
            cardData.splice(8,30); // uzycie mniejszej ilosci kart
            break;
        case('second-level'):
            cardAmount = 12; 
            playerLives = livesArray[1];
            section.style.gridTemplateColumns = 'repeat(4,8rem)';
            section.style.gridTemplateRows = 'repeat(3,8rem)';
            cardData.splice(12,30); // uzycie mniejszej ilosci kart
            break;
        case('third-level'):
            playerLives = livesArray[2];
            cardAmount = 16; //liczba kart
            section.style.gridTemplateColumns = 'repeat(4,8rem)';
            section.style.gridTemplateRows = 'repeat(4,8rem)';
            cardData.splice(16,30); // uzycie mniejszej ilosci kart
            break;
        case('fourth-level'):
            playerLives = livesArray[3];
            cardAmount = 20; //liczba kart
            section.style.gridTemplateColumns = 'repeat(5,8rem)';
            section.style.gridTemplateRows = 'repeat(4,8rem)';
            cardData.splice(20,30); // uzycie mniejszej ilosci kart
            break;
        case('fifth-level'):
            cardAmount = 24; //liczba kart
            playerLives = livesArray[4];
            section.style.gridTemplateColumns = 'repeat(6,8rem)';
            section.style.gridTemplateRows = 'repeat(4,8rem)';
            cardData.splice(24,30); // uzycie mniejszej ilosci kart
            break;
        case('sixth-level'):
            cardAmount = 30; //liczba kart
            playerLives = livesArray[5];
            section.style.gridTemplateColumns = 'repeat(6,8rem)';
            section.style.gridTemplateRows = 'repeat(5,8rem)';
            break;
        default:
            console.log('blad');
            break;
    }
    // Mieszanie kart
    cardData.sort(() => Math.random() - 0.5);
    lives = playerLives; //zmienna pomocnicza
    return cardData;
};

const drawLives = () => { 
    for(let i = 0; i <lives;i++) {
        const heart = document.createElement('img');
        heart.classList = 'heart';
        heart.id = `serce${i}`;
        heart.src = 'heart_icon.jpg';
        document.getElementById('header').appendChild(heart);
    }
};

const takeLive = (livesLeft) => {
    indexOfHearth = lives - livesLeft - 1;
    // document.getElementById(`serce${indexOfHearth}`).style.display = 'none';
    document.getElementById(`serce${indexOfHearth}`).remove();
}

const cardGenerator = () => {
    const cardData = randomize();
    // Generate HTML  
    drawLives();
    cardData.forEach(item => {
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('div');
        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';
        // Attach info to the cards
        face.src = item.imgSrc;
        card.setAttribute('name', item.name);
        // Attach cards to the section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click', (event) => {
            card.classList.toggle('toggleCard');
            checkCards(event);
        })
    });
};

// Check cards
const checkCards = (event) => {
    const clickedCard = event.target;
    clickedCard.classList.add('flipped');
    const flippedCards = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll('.toggleCard');

    if(flippedCards.length === 2) {
        if(
            flippedCards[0].getAttribute('name') === 
            flippedCards[1].getAttribute('name')
        ) {
            // Find match cards
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                card.style.pointerEvents = 'none';
            })
        } else {
            // Not find match
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                setTimeout(() => card.classList.remove('toggleCard'), 1000)
            });
            // Odejmowanie życia
            playerLives--;
            // playerLivesCount.textContent = playerLives;
            takeLive(playerLives);
            // Lose game
            if(playerLives === 0){
                restart("lose");
            }
        }
    }
    if(toggleCard.length === cardAmount){
        restart("win")
    }  
};

const result = (message) => {
    if(message === 'win') {
        // window.alert("WIN");
        modal_container1.classList.add('show');
        close_window1.addEventListener('click', () => {
            modal_container1.classList.remove('show');
        });
    } else if(message === 'lose') {
        // window.alert("LOSE");
        modal_container2.classList.add('show');
        close_window2.addEventListener('click', () => {
            modal_container2.classList.remove('show');
        });
    } else return
}

const restart = (message) => {
    let cardData = randomize();
    drawLives();
    let faces = document.querySelectorAll('.face');
    let cards = document.querySelectorAll('.card');
    section.style.pointerEvents = 'none';
    cardData.forEach((item,index) => {
        cards[index].classList.remove('toggleCard');
        // Randomize
        setTimeout(() => {
            cards[index].style.pointerEvents = 'all';
            faces[index].src = item.imgSrc;
            cards[index].setAttribute('name', item.name);
            section.style.pointerEvents = 'all';
        }, 1000);
        
    });
    playerLives = lives;
    // playerLivesCount.textContent =playerLives; 
    setTimeout(() => result(message),100)
}

cardGenerator();

