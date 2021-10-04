const input = document.querySelector('.input');
const btn = document.getElementById('btn-action');

const getWords = val => {
    return val.replace(/<div>/g, "\n").replace(/<\S.*?>|<\/\w+>/g, '');
}

const isBlank = val => val == '' || val.search(/^\s+$/) >= 0;

btn.addEventListener('click', function() {
    const separator = /\.|,|;|\?|\!|\-| |\n/;
    const words = getWords(input.innerHTML);
    
    const arrayWords = words.split(separator);
    let totalWords = 0;

    for(const word of arrayWords) {
        if(word != '&nbsp' && !isBlank(word)) {
            totalWords++;
        }
    }

    const counter = document.querySelector('.counter #value');
    counter.innerHTML = totalWords;
});