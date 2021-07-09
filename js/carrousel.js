let dir = "html/"
i = 0;
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
    }

ini();

function anterior(){
    i--;
    if (i < 0){
        i = maxMaps-1;
    }
    modify();
    document.getElementById("alert").innerHTML = "";
}

function siguiente(){ //funcion boton siguiente
    i++;
    if (i > maxMaps-1){ //Si llega al final, vuelve desde el 0
        i=0;
    }
    modify();
    document.getElementById("alert").innerHTML = ""; //quita la alerta en caso de existir
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
    }
    else {
        document.getElementById("show").innerHTML = "Filtro no disponible";
    }
}

function circuit(){
    if (document.getElementById("circuit").checked){
        document.getElementById("c").innerHTML = '<input type="text" id="circuitSet"></input>';
    }
    else {
        document.getElementById("c").innerHTML = "";    
    }
}

function vehicle(){
    if (document.getElementById("vehicle").checked){
        for (let v = 0 ; v < filters[1].length ; v++){
            const vehicleAdd = document.getElementById('v');
            let vehicleCheckbox =  '<input type="checkbox" id="vehicle' + filters[1][v] + '">' + 
            '<label for="vehicle' + filters[1][v] + '">' + filters[1][v] + '</label>';
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
            let monthCheckbox =  '<input type="checkbox" id="month' + filters[2][m] + '">' + 
            '<label for="month' + filters[2][m] + '">' + filters[2][m] + '</label>';
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
        dayText = '<input type="text" id="daySet"></input>';
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
            let zoneCheckbox =  '<input type="checkbox" id="zone' + (z+1) + '">' + zones[z];
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
            let lapsusRadio =  '<input type="radio" name="lap" id="lapsus'+(l+1)+'" value="'+(l+1)+'">'+lapsuses[l];
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
            let extentionRadio =  '<input type="radio" name="ex" id="extention'+(e+1)+'" value="'+(e+1)+'">'+extentions[e];
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
            let garbageDumpRadio =  '<input type="radio" name="gb" id="garbageDump'+g+'" value="'+g+'">'+g; 
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
    document.getElementById("num").innerHTML = "Circuito numero: " + (mapsNum[i]); //Funcion para moficar numero de circuito
    document.getElementById("data").innerHTML = "";
    const labels = ["Circuito: ","Vehiculo: ","Mes: ","Dia: ","Zonas: ","Lapso: ","Extension: ","Basural: "];
    const zones = ["1prl" , "1prp","2","3","4","5"];
    let modifyData;
    const dataAdd = document.getElementById('data');
    dataAdd.insertAdjacentHTML('beforeend', '<h3>Circuitos Totales: ' + maxMaps + '</h3>');
    for (let d = 0 ; d < filters.length ; d++){
        if (d == 4){
            let compZone = all[d][mapsNum[i]-1];
            modifyData =  '<h3>' + labels[d];
            for (z = 0; z < filters[d][0].length; z++){
                if (compZone[z] == "1"){
                    modifyData = modifyData + zones[z] +", ";
                }
            }
            modifyData = modifyData.replace(/,\s$/, "");
            modifyData = modifyData.replace(/,(?=\s(?=\d(?=\s*$)))/, " y");
            modifyData = modifyData.replace(/:\s$/, ": Indefinida");
            modifyData = modifyData + '</h3>';
        }
        else if (d != 4) {
            modifyData =  '<h3>' + labels[d] + Number(all[d][mapsNum[i]-1]) + '</h3>';
        }
        dataAdd.insertAdjacentHTML('beforeend', modifyData);
    }  
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
}

