let a = [['ACB CLIENTE','','deposito@fullwork.com.ar; FACTURACION@AGROFEDERAL.NET','0078'],['ACCESORIOS INDUSTRIALES S.R.L.','','DEPOSITO@FULLWORK.COM.AR;ADMINISTRACION@ACCESORIOSINDUSTRIALESSRL.COM','0066'],['ADRIAN BUNGE','','DEPOSITO@FULLWORK.COM.AR','0129'],['ADRIAN DI LAZIO','','DEPOSITO@FULLWORK.COM.AR','0074'],['AL SERVICIO INTEGRAL S.A','','COMPRAS@ALSISA.COM; DEPOSITO@FULLWORK.COM.AR','0042'],['ALBERTO DI FILIPPO','','FUNINDUMENTARIAS@HOTMAIL.COM; DEPOSITO@FULLWORK.COM.AR','0041'],['ALFONSINA REVENDEDORA','','DEPOSITO@FULLWORK.COM.AR','0164'],['ALIMENTOS CORONEL BAIGORRIA','','ADMINISTRACION@ACB.COM.AR','0027'],['AMRO SRL','','COMERCIAL@ACEROSMOLDEADOS.COM.AR;DEPOSITO@FULLWORK.COM.AR','0208']];

function refillTable(arr){
    if (arr.length == 0) {
        document.getElementById('error').textContent = 'No se encontro ningun registro';
        // document.getElementById('xtablea').innerHTML = '';
        
    }
    else{
        document.getElementById('error').textContent = '';
        let str='';
        let cantreg= arr.length;
        let cantcam= arr[0].length;
        for (let i = 0; i < arr.length; i++) {
            str+=`<tr`
            if(i%2==0) str+=` class='pair'>`;
            else str+=` class='odd'>`;

            arr[i].forEach(camp => {
                str+=`<td>${camp}</td>`;
            });
            str+=`</tr>`
        }
        document.getElementById('tbod').innerHTML=str;
    }
}

function filterArr(arr,str){
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


const input =document.getElementById('areatext');
input.oninput = function() {
    filterArr   (a,input.value);
  };

