//================== Funcionamiento:
//  -No tiene paginador 
//  -Se insertan todos los registros en el html y de acuerdo a la busqueda los esconde o los deja

//Utiliza para sacar el mensaje de error 
// msserrorInit:
// id de la tabla y el obj del mnj de error ->   esconde el mensaje y pone visible los titulos
function msserrorInit(idtab,meserror){
    meserror.style.display = "none";
    document.querySelector(`#${idtab} thead`).style.display = "";
}

// Utiliza para mostrar el mensaje de error 
//  msserror: 
//          id de la tabla y el obj del mnj error -> 
function msserror(idtab,meserror){
    document.querySelector(`#${idtab} thead`).style.display = "none";
    meserror.textContent = 'No se encontro ningun registro';
    meserror.style.display = "";
    
}

// filter: filtra la tabla segun el valor q este en el area text
// dado el aray de inic.y el id de la tabla filtra y estiliza los registro de la tabla
function filter(arr,idtab) {
    let input, filter, table, tr, td, i, txtValue,cont=0,meserror;
    
    //buscamos el id del error 
    meserror=document.getElementById("error");
    msserrorInit(idtab,meserror);

    //totamos el elem del buscador 
    input = document.getElementById("areatext");
    filter = input.value.toUpperCase();

    //tomamos elem de la tabla
    table = document.getElementById(`${idtab}`);
    
    // tomamos los registros
    tr = table.getElementsByTagName("tr");
    
    // recorremos los registros
    for (i = 0; i < tr.length; i++) {
                
        // recorremos los elementos a filtrar para compararlos
        for(let ele of arr[2]) {
            
            td = tr[i].getElementsByTagName("td")[ele];
            
            //si no es titulo basicamente 
            if (td) {

                txtValue = td.textContent || td.innerText;              //tomamos el contenido del registro
                if (txtValue.toUpperCase().indexOf(filter) > -1) {          //si se encuentra el registro
                    tr[i].style.display = "";                               //visibilizamos el reg
                    if(cont%2==0) tr[i].className = 'pair';                 // le damos estilo para diferenciar los reg
                    else tr[i].className = 'odd';

                    cont++;
                    break;                                                  //cortamos el lazo xq ya se encuentra
                } else {
                    tr[i].style.display = "none";                       //
                    
                }
            }         
        };
    }

    // si no hay registros llamo al error
    if(cont==0) {
        msserror(idtab,meserror)
    }
}

// -----Relleno de la tabla con json
//fillTitle : rellena los titulo de la tabla con los ingresados por el array
//          dado el array init y el id de la tabla -> rellena los titulos de la tabla 
function fillTitle(arr,idtab){
    let tabhead = document.querySelector(`#${idtab} thead`);
    let row  = document.createElement('tr');
    arr[0].forEach(elem =>{
        row.innerHTML +=`<th>${elem}</th>`
    })
    tabhead.appendChild(row);
}
 
//fillContent: rellena los registros de la tabla 
//              dado el obj del json , el obj del registro y el array init ->
//                  crea registros de la tabval con los campos ingresados por el array init q esten en el json
function fillContent(obj,row,arr){
    arr[1].forEach(elem =>{
        
        let s=obj[`${elem}`];                           //tomamos el valor del elemento ingg en arr
        row.innerHTML +=`<td name='${elem}'>${s}</td>`  //insrt un elem en elel registro

    })
}


function fillwJson(arr,json,idtab){ 
    let tab = document.querySelector(`#${idtab} tbody`);
    let m =0;
    json.forEach(data =>{
        
        let row  = document.createElement('tr');
        if(m%2==0) row.className = 'pair';
        else row.className = 'odd';
        
        fillContent(data,row,arr);                         
        tab.appendChild(row);
        
        m++;
    })            
    
    
}
function createTable(arr,json,idtab){
    fillTitle(arr,idtab);
    fillwJson(arr,json,idtab);
}
function takeJson(arr,idtab){
    fetch("../cookie.json")
        .then(response => response.json())
        .then(jsondata =>{
            
            createTable(arr,jsondata,idtab);
        });

}


const idtab = "xtablea" 
const arrinit = [["Raz.Soc.","Cod. Cliente","Email","Tel."],["razsoc","codcli","e_mail","telef"],["razsoc","codcli"]];
takeJson(arrinit,idtab);

const input =document.getElementById('areatext');
input.onkeyup = function() {
    
    filter(arrinit,idtab);
  };
