let dir = "html/"
i = 0;
let actual = 0;
let mapsNum = [], backUpMapsNum = [], filteredNum = []; //indicadores de mapa
let all = [[],[],[],[],[],[],[],[]];
let filters = [[],[],[],[],[],[],[],[]];
const slice = ["c", "v", "m", "d", "z", "l", "e", "b"];

function ini(){
    maps = JSON.parse(data);
    maxMaps = maps.length;
    let cont = 0;
    for (let map of maps){
        for (let n = 0 ; n < slice.length; n++){
            cutIni = maps[0].indexOf(slice[n])+1;
            cutFin = maps[0].indexOf(slice[n+1]);
            if (cutFin == -1){
                cutFin = maps[0].length-5;
            }
            all[n][cont] = map.slice(cutIni,cutFin);
        }
        mapsNum[cont] = cont + 1;
        cont++;
    }
    for (let l = 0; l < 8 ; l++){
        filters[l] = [... new Set(all[l])];
    }
    backUpMapsNum = mapsNum;
    modify(); 
    filtered(actual);
}

ini();

function anterior(){
    i--;
    if (i < 0){
        i = maxMaps-1;
    }
    modify();
    filtered(0);
}

function siguiente(){ //funcion boton siguiente
    i++;
    if (i > maxMaps-1){ //Si llega al final, vuelve desde el 0
        i=0;
    }
    modify();
    filtered(0);
}

function selection(){
    maxMaps = maps.length;
    preFiltered = backUpMapsNum;
    filteredNum = backUpMapsNum;
    i = 0;
    let confirm, filter = 0, valid = 0;
    let fils = [circuit, vehicle, month, day, zone, lapsus, extention, garbageDump];
    const nameFils = ["circuit", "vehicle", "month", "day", "zone", "lapsus", "extention", "garbageDump"];
    const checkboxes = [1,2,5,6,7];
    for (let m = 0; m < 8 ; m++){
        if (document.getElementById(nameFils[m]).checked){
            filter++;
            confirm = 0;
            if (checkboxes.includes(m)) {
                filteredNum = [];
                for (let v = 0 ; v < filters[m].length ; v++){
                    if (document.getElementById(nameFils[m]+filters[m][v]).checked){
                        fils[m] = filters[m][v];
                        for (let k = 0 ; k < maxMaps ; k++){
                            if (all[m][k] == fils[m]){
                                if (preFiltered.includes(k+1)){
                                    confirm ++;
                                    filteredNum.push(k+1);
                                }
                            }
                        }
                    }
                }
                if (confirm > 0){
                    valid++;
                }
                preFiltered = filteredNum;
            }

            else if (m == 4) {
                filteredNum = [];
                let filZone = 0;
                for (let v = 0 ; v < filters[m][0].length ; v++){
                    if (document.getElementById(nameFils[m]+(v+1)).checked){
                        filComp = 1 * 10 ** (5-v);
                        filZone = filZone + filComp;
                    }
                }
                fils[m] = filZone.toString();
                fils[m] = fils[m].padStart(filters[m][0].length,"0");
                for (let k = 0 ; k < maxMaps ; k++){
                    if (all[m][k] == fils[m]){
                        if (preFiltered.includes(k+1)){
                            confirm ++;
                            filteredNum.push(k+1);
                        }
                    }
                }
                if (confirm > 0){
                    valid++;
                }
                preFiltered = filteredNum;    
            }
              
            else {
            fils[m] = document.getElementById(nameFils[m]+"Set").value;
            fils[m] = fils[m].padStart(filters[m][0].length,"0");
            if(filters[m].includes(fils[m])){
                filteredNum = [];
                for (let k = 0 ; k < maxMaps ; k++){
                    if (all[m][k] == fils[m]){
                        if (preFiltered.includes(k+1)){
                            confirm ++;
                            filteredNum.push(k+1);
                        }
                    }
                }
                if (confirm > 0){
                    valid++;
                }
                preFiltered = filteredNum;
                }
            }
        }
    }

    if (valid == filter){
        document.getElementById("show").innerHTML = "";
        maxMaps = filteredNum.length;     
        mapsNum = filteredNum;
        i = 0;
        modify();
        filtered(0);
    }
    else {
        document.getElementById("show").innerHTML = "Filtro sin coincidencia";
    }
}

function circuit(){
    if (document.getElementById("circuit").checked){
        document.getElementById("c").innerHTML = '<input class="textbox" type="text" placeholder="1610" id="circuitSet"></input>';
    }
    else {
        document.getElementById("c").innerHTML = "";    
    }
}

function vehicle(){
    if (document.getElementById("vehicle").checked){
        for (let v = 0 ; v < filters[1].length ; v++){
            const vehicleAdd = document.getElementById('v');
            let vehicleCheckbox = '<label  class="sndcheckbox-container" for="vehicle' + filters[1][v] + '">' + '<input type="checkbox" id="vehicle' + filters[1][v] + '">' + 
            '<span class="txtitlebox">' + filters[1][v] + '</span>'+'</label>';
            vehicleAdd.insertAdjacentHTML('beforeend', vehicleCheckbox);
        }  
    }
    else {
        document.getElementById("v").innerHTML = "";    
    }
}

function month(){
    if (document.getElementById("month").checked){
        for (let m = 0 ; m < filters[2].length ; m++){
            const monthAdd = document.getElementById('m');
            let monthCheckbox =  '<label  class="sndcheckbox-container" for="month' + filters[2][m] + '">'+'<input type="checkbox" id="month' + filters[2][m] + '">' + 
            '<span class="txtitlebox">' + Number(filters[2][m]) + '</span>'+'</label>';
            monthAdd.insertAdjacentHTML('beforeend', monthCheckbox);
        }  
    }
    else {
        document.getElementById("m").innerHTML = "";    
    }
}

function day(){
    if (document.getElementById("day").checked){
        const dayAdd = document.getElementById("d");
        dayText = '<input class="textbox" type="text" placeholder="dd" id="daySet"></input>';
        dayAdd.insertAdjacentHTML('beforeend', dayText);
    }
    else {
        document.getElementById("d").innerHTML = "";    
    }
}

function zone(){
    if (document.getElementById("zone").checked){
        const zones = ["1prl" , "1prp","2","3","4","5"];
        for (let z = 0 ; z < filters[4][0].length ; z++){
            const zoneAdd = document.getElementById('z');
            let zoneCheckbox = '<label  class="sndcheckbox-container" for="zone' + (z+1) + '">'+ '<input class="checkbox" type="checkbox" id="zone' + (z+1) + '">' +
            '<span class="txtitlebox">'+ zones[z] + '</span>'+'</label>';
            zoneAdd.insertAdjacentHTML('beforeend', zoneCheckbox);
        }  
    }
    else {
        document.getElementById("z").innerHTML = "";    
    }
}

function lapsus(){
    if (document.getElementById("lapsus").checked){
        lapsuses = ["1 a 54min", "55min a 228min","229min a 275min","276min a 338min","339min a 698min"]
        for (let l = 0 ; l < filters[5].length ; l++){
            const lapsusAdd = document.getElementById('l');
            let lapsusRadio =  '<label  class="radio-container" for="lapsus' + (l+1) + '">'+'<input type="radio" name="lap" id="lapsus'+(l+1)+'" value="'+(l+1)+'">'+
            '<span class="txtitlebox">'+ lapsuses[l] + '</span>'+'</label>';
            lapsusAdd.insertAdjacentHTML('beforeend', lapsusRadio);
        }  
    }
    else {
        document.getElementById("l").innerHTML = "";    
    }
}

function extention(){
    if (document.getElementById("extention").checked){
        extentions = ["101m a 9137m", "9138m a 42363m","42364m a 57049m","57050m a 70349m","70350m a 161687"]
        for (let e = 0 ; e < filters[6].length ; e++){
            const extentionAdd = document.getElementById('e');
            let extentionRadio =  '<label  class="radio-container" for="extention' + (e+1) + '">'+'<input type="radio" name="ex" id="extention'+(e+1)+'" value="'+(e+1)+'">'+
            '<span class="txtitlebox">'+ extentions[e] + '</span>'+'</label>';
            extentionAdd.insertAdjacentHTML('beforeend', extentionRadio);
        }  
    }
    else {
        document.getElementById("e").innerHTML = "";    
    }
}

function garbageDump(){
    if (document.getElementById("garbageDump").checked){
        for (let g = 0 ; g < filters[7].length ; g++){
            const garbageDumpAdd = document.getElementById('b');
            let garbageDumpRadio = '<label class="radio-container" for="garbageDump' + g + '">'+//verificar puse primero el label
            '<input type="radio" name="gb" id="garbageDump'+g+'" value="'+g+'">'+ '<span class="txtitlebox">' + g + '</span>'+'</label>'; 
            garbageDumpAdd.insertAdjacentHTML('beforeend', garbageDumpRadio);
        }  
    }
    else {
        document.getElementById("b").innerHTML = "";    
    }
}

function reset(){
    mapsNum = backUpMapsNum;
    maxMaps = maps.length;
    i = 0;
    modify();
    clean();
    ini();
}

function modify(){
    document.getElementById("carr").src = dir + maps[mapsNum[i]-1]; //modifica el enlace
    document.getElementById("carr").href = dir + maps[mapsNum[i]-1];
    const tableAdd = document.getElementById('data');
    tableAdd.innerHTML = "";
    const tableHead = '<thead> <tr> <th>Circuito</th> <th>Vehiculo</th> <th>Mes</th> <th>Dia</th> <th>Zona</th> <th>Lapso</th> <th>Extension</th> <th>Basural</th> </tr> </thead>';
    tableAdd.insertAdjacentHTML('afterbegin', tableHead);
    tableAdd.insertAdjacentHTML('beforeend', table(i));
}   

function filtered(fils){
    const tableAdd = document.getElementById('data');
    tableAdd.innerHTML = "";
    modify();
    actual += fils;
    if (maxMaps < 10){
        actual = 0;
        console.log(actual);
    }
    else if (actual < 0){
        actual = maxMaps - 10;
        console.log(actual);
    }
    else if (actual + 10 > maxMaps){
        actual = 0;
    }
    for (let r = actual ; r < actual+10 ; r++ ){
        tableAdd.insertAdjacentHTML('beforeend', table(r));
    }
}

function table(row) {
    const zones = ["1prl" , "1prp","2","3","4","5"];
    const tableAdd = document.getElementById('data');
    let tableMaps;
    tableMaps = '<tr>';
    for (let d = 0 ; d < filters.length ; d++){
        if (d == 4){
            let compZone = all[d][mapsNum[row]-1];
            tableMaps +=  '<td>';
            for (z = 0; z < filters[d][0].length; z++){
                if (compZone[z] == "1"){
                    tableMaps = tableMaps + zones[z] +", ";
                }
            }
            tableMaps = tableMaps.replace(/,\s$/, "");
            tableMaps = tableMaps.replace(/,(?=\s(?=\d(?=\s*$)))/, " y");
            //modifyData = modifyData.replace(NULL, "Indefinida");
            tableMaps = tableMaps + '</td>';
        }
        else if (d != 4) {
            tableMaps +=  '<td>' + Number(all[d][mapsNum[row]-1]) + '</td>';
        }
        
    }
    tableMaps += '</tr>';            
    
    return tableMaps;
}

function clean(){
    const clean = document.getElementsByTagName("input");
    for ( let c=0 ; c < clean.length ; c++ ){
        if (clean[c].type == "checkbox" || clean[c].type == "radio"){
            clean[c].checked = false;
        }
    }
    for ( let s=0 ; s < slice.length ; s++ ){
        document.getElementById(slice[s]).innerHTML = "";    
    }
    document.getElementById("show").innerHTML = "";
    document.getElementById("data").innerHTML = "";
    actual = 0;
}
