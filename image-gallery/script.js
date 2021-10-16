const gambarTampil = document.querySelector('.gambar-tampil .gambar');
const gambarList = document.querySelector('.gambar-list');

gambarList.addEventListener('click', function(e) {
    if(e.target.className == 'gambar-item') {
        let src = e.target.querySelector('img').getAttribute('src');
        
        gambarList.querySelector('.gambar-item.active').classList.remove('active');
        e.target.classList.add('active');
        gambarTampil.setAttribute('src', src);
    }
});