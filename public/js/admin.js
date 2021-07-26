const editAnimal = document.querySelector('.edit-animal');
const editPrice = document.querySelector('.edit-price');
let btn_price_ch = document.querySelector('#btn_price_ch');

let btn_price_ad = document.querySelector('#btn_price_ad');
/*--------------------------------*/

if (editAnimal) {
  // редактируем животных
  editAnimal.addEventListener('click', async (e) => {
    document.querySelector('.right-box').innerHTML = '';
    // выводим названия всех животных из базы
    e.preventDefault();
    const response = await fetch(`/admin/show`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    //условия отображения
    if (document.querySelector('.price-wrapper')) {
      document
        .querySelector('.left-box')
        .removeChild(document.querySelector('.price-wrapper'));
    }

    if (!document.querySelector('.animal-wrapper')) {
      const animals = document.createElement('div');
      animals.className = 'animal-wrapper';
      animals.style.display = 'block';
      let content = `<p class='wild-add'><i class="fas fa-plus-circle"></i></p>`;
      result.forEach((el) => {
        content += `<p class='wild'>${el}</p>`;
      });
      animals.innerHTML = content;
      document.querySelector('.left-box').appendChild(animals);
      // находим всех животных и выборочно редактируем
      document.querySelectorAll('.wild').forEach((el) => {
        el.addEventListener('click', () => {
          document.querySelector('.right-box').innerHTML = '';
          const wildWrapper = document.createElement('div');
          wildWrapper.className = 'wild-wrapper';
          wildWrapper.innerHTML = ` <div class="card card-edit-admin" style="width: 18rem;">
        <img src="..." class="card-img-top" alt="...">
        <div class="input-group">
          <span class="input-group-text" id="inputGroup-sizing-default">Название</span>
          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        </div>
        <div class="form-floating">
          <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
          <label for="floatingTextarea2">Description</label>
        </div>
        <button type="button" class="btn btn-secondary">Сохранить</button>
        <button type="button" class="btn btn-danger">Удалить</button>
      </div>`;
          document.querySelector('.right-box').appendChild(wildWrapper);
        });
      });
    }
    // если в правом блоке нет обертки для редактирования животных, то по нажатию на + добавляем форму
    if (document.querySelector('.wild-add')) {
      document.querySelector('.wild-add').addEventListener('click', () => {
        document.querySelector('.right-box').innerHTML = '';
        const wildWrapper = document.createElement('div');
        wildWrapper.className = 'wild-wrapper';
        wildWrapper.innerHTML = ` <div class="card animal-add-form">
          <img src="..." class="card-img-top" alt="...">
          <form id="formUploadSubmit" action="/profile/foto" method="post" enctype="multipart/form-data">
          <input type="file" name="pictures" />
          <button>Загрузить</button>
          </form>
          <div class="input-group">
            <span class="input-group-text" id="inputGroup-sizing-default">Название</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
          </div>
          <div class="form-floating">
            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
            <label for="floatingTextarea2">Description</label>
          </div>
          <button type="button" class="btn btn-secondary">Сохранить</button>
          <button type="button" class="btn btn-danger">Удалить</button>
        </div>`;
        document.querySelector('.right-box').appendChild(wildWrapper);
      });
    }
  });
}

if (editPrice) {
  // редактируем тарифы
  editPrice.addEventListener('click', () => {
    document.querySelector('.right-box').innerHTML = '';
    if (document.querySelector('.animal-wrapper')) {
      document
        .querySelector('.left-box')
        .removeChild(document.querySelector('.animal-wrapper'));
    }
    if (!document.querySelector('.price-wrapper')) {
      const price = document.createElement('div');
      price.className = 'price-wrapper';
      price.style.display = 'block';
      price.innerHTML = `
        <p class='child'>Редактировать тарифы</p>
         `;
      document.querySelector('.left-box').appendChild(price);
      document.querySelector('.child').addEventListener('click', () => {
        document.querySelector('.right-box').innerHTML = '';
        const childWrapper = document.createElement('div');
        childWrapper.innerHTML = `
        
    <div class="form-group mb-3">
        <label for="exampleFormControlSelect1">Время посещения</label>
        <select class="form-control" id="Select1">
          <option>Выходные и праздники</option>
          <option>Будни</option>
        </select>
    </div>
  <div class="input-group mb-3">
    <span  name = "price" class="input-group-text" id="inputGroup-sizing-default">Цена для детей</span>
    <input id = "price_ch" name = "price" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
  </div>
  <div class="input-group mb-3">
    <span  name = "price" class="input-group-text" id="inputGroup-sizing-default">Цена для взрослых</span>
    <input id = "price_ad" name = "price" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
  </div>
  <button id = "btn_price_ch" type="button" class="btn btn-secondary">Сохранить</button>
        `;
        childWrapper.className = 'child-wrapper';
        document.querySelector('.right-box').appendChild(childWrapper);

        //---------------------------------------------//
        if (!btn_price_ch) {
          let price_ch = document.querySelector('#price_ch');
          // console.log(price_ch.value);
          let price_ad = document.querySelector('#price_ad');
          let select_ch = document.querySelector('#Select1');
          // console.log(select_ch);

          let btn_price_ch = document.querySelector('#btn_price_ch');
          btn_price_ch.addEventListener('click', async (event) => {
            event.preventDefault();
            console.log(select_ch.value, price_ch.value, price_ad.value);

            const status = select_ch.value === 'Будни' ? true : false;

            console.log(status);

            const response = await fetch(`/price/add`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                select_ch: status,
                priceChild: price_ch.value,
                priceAdult: price_ad.value,
              }),
            });
            const result = await response.json();
            console.log(result);
            window.location.href = `/admin`;
          });
        }

        //---------------------------------------------//
      });
      // взрослые
      document.querySelector('.adult').addEventListener('click', () => {
        document.querySelector('.right-box').innerHTML = '';
        const adultWrapper = document.createElement('div');
        adultWrapper.innerHTML = `

  <div class="input-group mb-3">
    <span class="input-group-text" id="inputGroup-sizing-default">Цена</span>
    <input id = "price_ad" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
  </div>
  <button id = "btn_price_ad" type="button" class="btn btn-secondary">Сохранить</button>
        `;
        adultWrapper.className = 'adult-wrapper';
        document.querySelector('.right-box').appendChild(adultWrapper);

        // if (!btn_price_ad) {
        //   let price_ad = document.querySelector('#price_ad');
        //   // console.log(price_ch.value);
        //   let select_ad = document.querySelector('#Select2');
        //   // console.log(select_ch);
        //   let btn_price_ad = document.querySelector('#btn_price_ad');
        //   btn_price_ad.addEventListener('click', async (event) => {
        //     event.preventDefault();

        //     const response = await fetch(`/price/addAd`, {
        //       method: 'POST',
        //       headers: { 'Content-Type': 'application/json' },
        //       body: JSON.stringify({
        //         select_ch: select_ad.value,
        //         price_ch: price_ad.value,
        //       }),
        //     });
        //     const result = await response.json();
        //     window.location.href = `/admin`;
        //   });
        // }
      });
    }
  });
}

/*--------------------------------*/
