const hasil = document.getElementById('hasil');
const itemAll = document.querySelectorAll('.row .item');

itemAll.forEach(valItem => {
    valItem.addEventListener('click', function(evt) {
        let nilai = this.innerHTML;
        let hasilStr = hasil.innerHTML;
        let nilaiSebelum = hasilStr.substring(hasilStr.length - 1);

        if(nilai == '=') {
            tampilkanHasil(hasil);
            return false;
        } else if(nilai.toLowerCase() == 'del') {
            hasil.innerHTML = del(hasilStr).trim();
            return false;
        } else if(nilai.toLowerCase() == 'clear') {
            hasil.innerHTML = '&nbsp;';
            return false;
        }

        if(isOperasi(nilaiSebelum) && isOperasi(nilai)) {
            hasil.innerHTML = del(hasilStr);
        }

        hasil.innerHTML += isSpace(nilai) ? ` ${nilai}` : nilai;
    });
});

function isOperasi(nilai) {
    return nilai.search(/x|\+|\/|-/) >= 0;
}

function isSpace(nilai) {
    let hasilStr = hasil.innerHTML;
    let itemSebelum = hasilStr.substring(hasilStr.length - 1);

    return isOperasi(nilai) || isOperasi(itemSebelum);
}

function del(hasilStr) {
    if(hasilStr.length == 1) {
        return '&nbsp;';
    }
    
    return hasilStr.substring(0, hasilStr.length - 1);
}

function removeWhiteSpace(str) {
    return str.replace(/\s+/g, '');
}

function tampilkanHasil() {
    let hasilStr = removeWhiteSpace( hasil.innerHTML.replace('&nbsp;', '').trim() );
    hasil.innerHTML = eval(hasilStr.replace(/x/g, '*'));
}