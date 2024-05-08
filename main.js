const header = document.querySelector('header');
const intro = document.querySelector('.intro');
const menu = document.querySelector('.menu');
const imageEL = document.querySelector('#image');
const titleEL = document.querySelector('#title');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const orderBtn = document.getElementById('order');
const modal = document.querySelector('.modal');
const orderImg = document.getElementById('orderImage');
const orderTitle = document.getElementById('orderTitle');
const closeBtn = document.querySelector('#close');

const openingAudio = new Audio();
openingAudio.src = 'assets/sounds/opening.mp3';
openingAudio.load();
const skipAudio = new Audio();
skipAudio.src = "assets/sounds/skip.mp3";
skipAudio.load();
const enterAudio = new Audio();
enterAudio.src = "assets/sounds/enter.mp3";
enterAudio.load();
const exitAudio = new Audio();
exitAudio.src = 'assets/sounds/back.mp3';
exitAudio.load();

openingAudio.play();

if(intro.classList.contains('active')){
    setTimeout(()=>{
        intro.classList.remove('active');
        openingAudio.pause();
        menu.classList.add('active');
        header.classList.add('active');
    }, 8000);
}

const shopItems = [
    {
        image: 'assets/images/fcBARCELONA.png',
        title: 'FC BARCELONA'
    },
    {
        image: 'assets/images/manUTD.png',
        title: 'MAN UNITED'
    },
    {
        image: 'assets/images/manCITY.png',
        title: 'MAN CITY'
    },
    {
        image: 'assets/images/realMADRID.png',
        title: 'REAL MADRID'
    }
]

var currentIndex = 0;

function displayImage(){
    imageEL.src = shopItems[currentIndex].image;
    titleEL.textContent = shopItems[currentIndex].title;
}

function prevImage(){
    currentIndex = (currentIndex - 1 + shopItems.length) % shopItems.length;
    displayImage();
    skipAudio.play();
}

function nextImage(){
    currentIndex = (currentIndex + 1) % shopItems.length;
    displayImage();
    skipAudio.play();
}

window.addEventListener('keydown', (e) => {
    e.preventDefault();
    if(e.keyCode == 39){
        nextImage();
    }
    else if(e.keyCode == 37){
        prevImage();
    }
})

function generateWhatsappLink(){
    const number = '936029646';
    const message = `Olá, vou querer a camisola do ${shopItems[currentIndex].title}. Quanto custa?`;
    let url = "https://api.whatsapp.com/send?phone=" + number + '&text=' + encodeURIComponent(message);
    return url;
}

function openModal(){
    enterAudio.play();
    modal.classList.add('active');
    orderImg.src = shopItems[currentIndex].image;
    orderTitle.textContent = shopItems[currentIndex].title;
}

function ordering(){
    openModal();
    url = generateWhatsappLink();
    window.open(url, '_blank');
}

function closeModal(){
    exitAudio.play();
    modal.classList.remove('active');
}

closeBtn.addEventListener('click', closeModal);
order.addEventListener('click', ordering);
prevBtn.addEventListener('click', prevImage);
nextBtn.addEventListener('click', nextImage);

displayImage();
