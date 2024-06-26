let trArr = document.querySelectorAll('tr.dataset');
trArr.forEach(item => {
  fillModalDataTable(item.dataset.id);
  item.addEventListener('click', function () {
    let id = this.dataset.id
      , text = this.querySelector('.data').textContent;
    modalOpen(id, text);
  })
});
let closeModal = document.querySelectorAll(".substrate, .close-popup");
closeModal.forEach(item => {
  item.addEventListener('click', function () {
    modalclose();
  })
})
let saveDataBtn = document.querySelector('.btn-save');
saveDataBtn.addEventListener('click', function () {
  saveData(modal.dataset.id);
});
let addSubRow = document.querySelector('.btn-add-sub-row');
addSubRow.addEventListener('click', function () {
  let input = document.createElement('input')
    , tr = document.createElement('tr')
    , table = modal.querySelector('table')
    , p = document.createElement('p')
    , btnDelete = document.createElement('button');
  input.type = 'text';
  input.name = 'data-input';
  input.classList.add('input-data');
  btnDelete.classList.add('btn', 'btn-delete');
  btnDelete.textContent = 'X';
  btnDelete.onclick = deleteRow;
  table.appendChild(tr);
  tr.appendChild(document.createElement("td")).appendChild(input);
  tr.appendChild(document.createElement("td")).appendChild(btnDelete);
  getTotalSum();
})
let firstRequest = true
  , modal = document.querySelector('.popup');

function saveData(id) {
  let dataInput = document.querySelectorAll('.popup table tr input')
    , arrayToSend = []
    , words = ''
    , sum = 0;
  for (let i = 0; i < dataInput.length; i++) {
    if (i % 2 !== 1 && dataInput[i].value !== '') {
      sum += parseInt(dataInput[i].value);
    }
    else {
      words += dataInput[i].value + ' ';
    }
  }
  arrayToSend.push(words.trim(), ' ' + sum);
  if (arrayToSend.length !== 0 && (sum > 0 || words !== '')) {
    const url = '/data/save/';
    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url + id);
      xhr.responseType = 'json';
      xhr.onload = function () {
        if (this.status === 200) {
          alert('ok!');
        }
        else {
          alert('something went wrong');
        }
      };
      xhr.send(arrayToSend);
      modalclose();
    }
    catch (e) {
      console.error(e);
    }
  }
}

function fillModalDataTable(id) {
  const url = '/data/getSubData/';
  try {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url + id);
    xhr.responseType = 'json';
    xhr.onload = function () {
      if (this.status === 200) {
        var json = ''
          , $resultRow = '';
        json = this.response;
        for (let i = 0; i < json.length; i++) {
          $resultRow += '<p>' + json[i]['subdata'] + '</p>';
        }
        document.querySelector('#sub-data-' + id).innerHTML = $resultRow ? $resultRow : '-';
      }
      else {
        console.log('something went wrong');
      }
    };
    xhr.send();
    firstRequest = false;
  }
  catch (e) {
    console.error(e);
  }
}

function modalOpen(id, text) {
  modal.style.display = 'block';
  modal.querySelector('.container-popup .title-popup').innerHTML = text;
  modal.setAttribute('data-id', id);
}

function modalclose() {
  modal.style.display = 'none';
  modal.querySelector('table').innerHTML = '';
  firstRequest = true;
  document.querySelector('#sum').innerHTML = 0;
}

function deleteRow() {
  this.closest('tr').remove();
  getTotalSum();
}

function getTotalSum() {
  var sum = 0;
  var inputs = document.querySelectorAll('.popup table tr input');
  for (let i = 0; i < inputs.length; i++) {
    var val = parseInt(inputs[i].value);
    if (i % 2 !== 1) {
      inputs[i].value = inputs[i].value = !!inputs[i].value && Math.abs(inputs[i].value) >= 0 ? Math.abs(inputs[i].value) : null;
    }
    if (i % 2 !== 1 && !isNaN(val)) {
      sum += val;
    }
  }
  document.querySelector('#sum').innerHTML = sum;
}