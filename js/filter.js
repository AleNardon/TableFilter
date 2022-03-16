
function filter(arr) {
    let input, filter, table, tr, td, i, txtValue,cond;
    input = document.getElementById("areatext");
    filter = input.value.toUpperCase();
    table = document.getElementById("xtablea");
    tr = table.getElementsByTagName("tr");
    
    for (i = 0; i < tr.length; i++) {
        
        
        for(let ele of arr[1]) {
            
            td = tr[i].getElementsByTagName("td")[ele];
            console.log(ele);
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    cond=true;
                    break;
                } else {
                    tr[i].style.display = "none";
                    cond=false;
                }
            }       
          
        };
            
    }
}

const tab = document.querySelector('#xtablea tbody');
function tablefill(obj,row,arr){

    arr[0].forEach(elem =>{
        let s=obj[`${elem}`];
        row.innerHTML +=`<td name='${elem}'>${s}</td>`

    })
    
}

function filterArrJson(arr){
    fetch("../cookie.json")
        .then(response => response.json())
        .then(jsondata =>{
            let m =0;
            jsondata.forEach(data =>{
                
                let row  = document.createElement('tr');
                if(m%2==0) row.className = 'pair';
                else row.className = 'odd';
                // ,row,ty
                tablefill(data,row,arr);                         
                tab.appendChild(row);
                
                m++;
            })            
        });

}
const arrinit = [["razsoc","codcli","e_mail","idfecha"],["razsoc","codcli"]];
filterArrJson(arrinit);

const input =document.getElementById('areatext');
input.onkeyup = function() {
    
    filter(arrinit);
  };
