let input = document.querySelector('#input');
let searchBtn = document.querySelector('.search');
let notFound = document.querySelector('.not_found');
let defBox = document.querySelector('.def');
let audioBox = document.querySelector('.audio');
let loading = document.querySelector('.loading');
let apiKey = '0aae6de8-7d84-4edc-8eea-e33c23787b6c'

searchBtn.addEventListener('click', function(e){
    e.preventDefault();

    // clear data

    audioBox.innerHTML = '';
    notFound.innerText = '';
    defBox.innerText = '';

    //get input data
    let word = input.value;
    // call api get data
    if(word === ''){
        alert('Word is requred');
        return;
    }

    getData(word);
})


async function getData(word){
// loading
loading.style.display = 'block';

    // Ajax call
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);

    const data = await response.json();

    // if emty result
    if (!data.length){
        loading.style.display = 'none';
        notFound.innerText = 'No result found';
        return;
    }

    // if result is suggetions
     if (typeof data [0] === 'string'){
        loading.style.display = 'none';
        let heading = document.createElement('h3');
        heading.innerText = 'Did you mean?'
        notFound.appendChild(heading);
        data.forEach(element => {
            let suggetions = document.createElement('span')
            suggetions.classList.add('suggested');
            suggetions.innerText = element;
            notFound.appendChild(suggetions);
        });
     }

     // result found
     loading.style.display = 'none';
     let defination = data[0].shortdef[0];
     defBox.innerText = defination;

     //sound
     const soundName = data[0].hwi.prs[0].sound.audio;
     if(soundName){
        renderSound(soundName);
     }

    console.log(data);
}

// function renderSound (soundName){

// }

function renderSound (soundName){

// https://media.merriam-webster.com/soundc11

let subfolder = soundName.charAt(0);

let soundSrc=`https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey}`;


let aud = document.createElement('audio');
aud.src = soundSrc;
aud.controls = true;
audioBox.appendChild(aud);



}
