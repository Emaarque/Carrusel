let dir = "html/"
i = 0;
let mapsNum = [], backUpMapsNum = [], filteredNum = []; //indicadores de mapa
let vehicleAll = [], circuitAll = [], monthAll = [], dayAll = [], zoneAll = [], lapsusAll = [], extentionAll = [], garbageDumpAll = [];
let vehicleFil = [], circuitFil = [], monthFil = [], dayFil = [], zoneFil = [], lapsusFil = [], extentionFil = [], garbageDumpFil = [];

function ini(){
    maps = JSON.parse(data);
    maxMaps = maps.length;
    let cont = 0;
    for (element of maps){
        
        vehicleAll[cont] = element.slice(6, 9);
        circuitAll[cont] = element.slice(1, 5);
        monthAll[cont] = element.slice(10, 12);
        dayAll[cont] = element.slice(13, 15);
        zoneAll[cont] = element.slice(16, 22);
        lapsusAll[cont] = element.slice(23, 24);
        extentionAll[cont] = element.slice(25, 26);
        garbageDumpAll[cont] = element.slice(27, 28);
        mapsNum[cont] = cont + 1;
        cont++;
        
    };
    vehicleFil = [... new Set(vehicleAll)];
    circuitFil = [... new Set(circuitAll)];
    monthFil = [... new Set(monthAll)];
    dayFil = [... new Set(dayAll)];
    zoneFil = [... new Set(zoneAll)];
    lapsusFil = [... new Set(lapsusAll)];
    extentionFil = [... new Set(extentionAll)];
    garbageDumpFil = [... new Set(garbageDumpAll)];
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
    reset();
    preFiltered = mapsNum;
    filteredNum = mapsNum;
    console.log(preFiltered);
    let confirm, filter = 0, valid = 0;

    if (document.getElementById("vehicle").checked){
        filter++;
        confirm = 0;
        let vehicle = document.getElementById("vehicleSet").value;
        vehicle = vehicle.padStart(3,"0");
        if(vehicleFil.includes(vehicle)){
            filteredNum = [];
            for (let k = 0 ; k < maxMaps ; k++){
                if (vehicleAll[k] == vehicle){
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

    if (document.getElementById("circuit").checked == true){
        filter++;
        confirm = 0;
        let circuit = document.getElementById("circuitSet").value;
        circuit = circuit.padStart(4,"0");
        if(circuitFil.includes(circuit)){
            filteredNum = [];
            for (let k = 0 ; k < maxMaps ; k++){
                if (circuitAll[k] == circuit){
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

    if (document.getElementById("month").checked == true){
        filter++;
        confirm = 0;
        let month = document.getElementById("monthSet").value;
        month = month.padStart(2,"0");
        if(monthFil.includes(month)){
            filteredNum = [];
            for (let k = 0 ; k < maxMaps ; k++){
                if (monthAll[k] == month){
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

    if (document.getElementById("day").checked == true){
        filter++;
        confirm = 0;
        let day = document.getElementById("daySet").value;
        day = day.padStart(2,"0");
        console.log(day);
        console.log(dayAll);
        console.log(dayFil);
        if(dayFil.includes(day)){
            filteredNum = [];
            for (let k = 0 ; k < maxMaps ; k++){
                if (dayAll[k] == day){
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

    if (document.getElementById("zone").checked == true){
        filter++;
        confirm = 0;
        let zone = document.getElementById("zoneSet").value;
        zone = zone.padStart(6,"0");
        if(zoneFil.includes(zone)){
            filteredNum = [];
            for (let k = 0 ; k < maxMaps ; k++){
                if (zoneAll[k] == zone){
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

    if (document.getElementById("lapsus").checked == true){
        filter++;
        confirm = 0;
        let lapsus = document.getElementById("lapsusSet").value;
        if(lapsusFil.includes(lapsus)){
            filteredNum = [];
            for (let k = 0 ; k < maxMaps ; k++){
                if (lapsusAll[k] == lapsus){
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

    if (document.getElementById("extention").checked == true){
        filter++;
        confirm = 0;
        let extention = document.getElementById("extentionSet").value;
        if(extentionFil.includes(extention)){
            filteredNum = [];
            for (let k = 0 ; k < maxMaps ; k++){
                if (extentionAll[k] == extention){
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

    if (document.getElementById("garbageDump").checked == true){
        filter++;
        confirm = 0;
        let garbageDump = document.getElementById("garbageDumpSet").value;
        if(garbageDumpFil.includes(garbageDump)){
            filteredNum = [];
            for (let k = 0 ; k < maxMaps ; k++){
                if (garbageDumpAll[k] == garbageDump){
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

    if (valid == filter){
    console.log(filteredNum);
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
function reset(){
    mapsNum = backUpMapsNum;
    maxMaps = maps.length;
    i = 0;
    modify();
    console.log(mapsNum);
}
function modify(){
    document.getElementById("carr").src = dir + maps[mapsNum[i]-1]; //modifica el enlace
    document.getElementById("nom").innerHTML = maps[mapsNum[i]-1];
    document.getElementById("num").innerHTML = "Circuito numero: " + (mapsNum[i]); //Funcion para moficar numero de circuito
    document.getElementById("c").innerHTML = "Circuito: "+maps[mapsNum[i]-1].substring(1, 5);
    document.getElementById("v").innerHTML = "Vehiculo: "+maps[mapsNum[i]-1].substring(6, 9);
    document.getElementById("m").innerHTML = "Mes: "+maps[mapsNum[i]-1].substring(10, 12);
    document.getElementById("d").innerHTML = "Dia: "+maps[mapsNum[i]-1].substring(13, 15);
    document.getElementById("z").innerHTML = "Zona: "+maps[mapsNum[i]-1].substring(16, 22);
    document.getElementById("l").innerHTML = "Lapso: "+maps[mapsNum[i]-1].substring(23, 24);
    document.getElementById("e").innerHTML = "Extension: "+maps[mapsNum[i]-1].substring(25, 26);
    document.getElementById("b").innerHTML = "Basural: "+maps[mapsNum[i]-1].substring(27, 28);
    

    console.log(maps[mapsNum[i]-1]);
    console.log(mapsNum[i]-1);
    console.log(i);
}

