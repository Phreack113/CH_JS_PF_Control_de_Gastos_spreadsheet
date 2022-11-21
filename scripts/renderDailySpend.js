const spendDailyList = document.querySelector('.spendDailyList');
const gastoDiaDetalle = document.querySelector('.gastoDiaDetalle');
const monthFilter = document.querySelector('.monthFilter');
const catFilter = document.querySelector('.catFilter');

const constBut = (cat, tag) => {
    const but = document.createElement('button');
    but.innerHTML = cat;
    but.classList.add(tag);
    but.classList.add('catBut');
    but.addEventListener('click', e => {
        console.log(e.target.innerHTML);
        let xSelected;
        if (e.target.classList.contains('cate')){
            const xSelected = catFilter.querySelector('.butSelected');    
            xSelected.classList.remove('butSelected');
        }
        if (e.target.classList.contains('mes')){
            const xSelected = monthFilter.querySelector('.butSelected');    
            xSelected.classList.remove('butSelected');
        }
        e.target.classList.add('butSelected');
    });
    return but;
}

const renderCatFilter = cat => {
    catFilter.innerHTML = '';
    catFilter.append(constBut('Todas', 'cate'));
    // catFilter.querySelector('.catBut').classList.add('butSelected');
    cat.forEach( e => catFilter.append(constBut(e.name, 'cate')));
    catFilter.querySelector('.catBut:first-child').classList.add('butSelected');
}

const renderMonthFilter = spend => {
    monthFilter.innerHTML = '';
    catFilter.append(constBut('Todos'));
    const options = { year: 'numeric', month: 'short'};
    let month = spend.map(m => new Date(m.date).toLocaleDateString("es-ES", options));
    month = [...new Set(month)];
    month.forEach( e => monthFilter.append(constBut(e, 'mes')));
    monthFilter.querySelector('.catBut:first-child').classList.add('butSelected');
}


const compSpend = e => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', weekday: 'long'};
    let month = new Date(e.date).toLocaleDateString("es-ES", options);
    const div = document.createElement('div');
    div.classList.add('df-r');
    div.classList.add('spendCard');
    div.innerHTML = `
    <div class="df-r mp">
        <i class="fa-solid fa-circle-check"></i>
    </div>
    <div class="df-c mp">
        <div>${month}</div>
        <div class="df-r detalles">
            <div>${e.categoria}</div>
            <div>${e.origen}</div>
        </div>
        <div>${e.desc}</div>
    </div>
    <div class="mp">${e.monto}</div>
    <div class="df-r mp">
        <i class="fa-solid fa-trash" data-id=${e.id}></i>
    </div>
    `; 

    div.addEventListener('click', async e => {
        const newState = await req(`?action=delete&id=${e.target.dataset.id}`);
        renderAll(newState);
    });
    return div;
}


const renderDailySpend = (spend, filterCat, filterMonth) => {
    spendDailyList.innerHTML = '';
    spend.filter( e => {
        const options = { year: 'numeric', month: 'short'};
        const month = new Date(e.date).toLocaleDateString("es-ES", options);
        return (filterMonth == month && (filterCat == e.categoria || filterCat == 'Todas'));
    })
        .reverse()
        .forEach( e => spendDailyList.append(compSpend(e)));
}