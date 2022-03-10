let a = [['ACB CLIENTE','','deposito@fullwork.com.ar; FACTURACION@AGROFEDERAL.NET','0078'],['BCCESORIOS INDUSTRIALES S.R.L.','','DEPOSITO@FULLWORK.COM.AR;ADMINISTRACION@ACCESORIOSINDUSTRIALESSRL.COM','0066'],['ADRIAN BUNGE','','DEPOSITO@FULLWORK.COM.AR','0129'],['ADRIAN DI LAZIO','','DEPOSITO@FULLWORK.COM.AR','0074'],['AL SERVICIO INTEGRAL S.A','','COMPRAS@ALSISA.COM; DEPOSITO@FULLWORK.COM.AR','0042'],['ALBERTO DI FILIPPO','','FUNINDUMENTARIAS@HOTMAIL.COM; DEPOSITO@FULLWORK.COM.AR','0041'],['ALFONSINA REVENDEDORA','','DEPOSITO@FULLWORK.COM.AR','0164'],['ALIMENTOS CORONEL BAIGORRIA','','ADMINISTRACION@ACB.COM.AR','0027'],['AMRO SRL','','COMERCIAL@ACEROSMOLDEADOS.COM.AR;DEPOSITO@FULLWORK.COM.AR','0208']];


//refillTable: dado un array nos rellena la tabla del html

function refillTable(arr){
    if (arr.length == 0) {
        document.getElementById('error').textContent = 'No se encontro ningun registro';    //rellena un parrafo con el error 
        document.getElementById('tbod').innerHTML = ''; 	                                //saca los elemnetos de la tabla
        document.getElementById('thea').style.visibility = "hidden";                        //esconde el titulo de la tabla
    }
    else{
        document.getElementById('thea').style.visibility = "visible";                       //visibiliza el titulo de la tabla
        document.getElementById('error').textContent = '';                                  //elimina el error si es q hay
        let str='';
        
        for (let i = 0; i < arr.length; i++) {
            str+=`<tr`
            if(i%2==0) str+=` class='pair'>`;       //agg la clase pair si el elem toca par
            else str+=` class='odd'>`;              //agg la clase odd si el elem toca impar

            arr[i].forEach(camp => {                //rellena la tabla con los contenidos
                str+=`<td>${camp}</td>`;
            });
            str+=`</tr>`
        }
        document.getElementById('tbod').innerHTML=str;  //agg el str a la tabla
    }
}


//filterArr: dado un array para filtrar el str con la busqueda y los campos donde comparar la busqueda
//      nos devuelve un array con los campos filtrados por la busqueda realizada
function filterArr(arr,str,fields){
    if (str=='') refillTable(arr);
    else{
        str=str.toUpperCase();
        let a =[];
        arr.forEach(element => {
            if( element[0].indexOf(str) != -1){a.push(element)}
        });
        refillTable(a);
        
    }
}

const tab = document.querySelector('#xtablea tbody');
function tablefill(obj,row,ty){
    switch (ty) {
        case 0:
            row.innerHTML += `
                <td>${obj.razsoc}</td>
                <td>${obj.codcli}</td>
                <td>${obj.e_mail.replace(';','\n')}</td>
                <td>${obj.telef}</td>                        
            `;
            break;
    
        default:
            break;
    }
}

async function filterArrJson(str,ty,fields){
    fetch("../cookie.json")
        .then(response => response.json())
        .then(jsondata =>{
            let m =0;
            jsondata.forEach(data =>{
                if (str=='' || data.razsoc.indexOf(str) != -1){ //primero se fja si debe ir el array
                    let row  = document.createElement('tr');
                    if(m%2==0) row.className = 'pair';
                    else row.className = 'odd';
                    tablefill(data,row,ty);                         
                    tab.appendChild(row);
                } ;
                m++;
            })
                
            
            
            
            });
    // else{
    //     str=str.toUpperCase();
    //     let a =[];
    //     arr.forEach(element => {
    //         if( element[0].indexOf(str) != -1){a.push(element)}
    //     });
    //     refillTable(a);
        
    // }
}

filterArrJson('',0);
const input =document.getElementById('areatext');
input.oninput = function() {
    filterArrJson (input.value,0);
  };

