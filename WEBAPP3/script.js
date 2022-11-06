var requestOptions = {
    method: 'GET',
    headers: {
        Authorization: 'Basic enVncnVwbzFAZ21haWwuY29tOjgxMWZkMzUwOTgwYmU5NzM1MDcz',
        Cookie: 'PHPSESSID=ojn2su1m0sb320igenbee223a1'
    },
    redirect: 'follow'
};


//MAIN fetch function to GetInvoices
async function getInvoices(startDate,finishDate,index) {
    let url = "https://api.alegra.com/api/v1/invoices/?date_afterOrNow=" + startDate + "&date_beforeOrNow=" + finishDate + "&start=" + index;
    let apiFetch = await fetch(url, requestOptions);
    let objectWithListOfInvoices = await apiFetch.json();
    return(objectWithListOfInvoices);
    }

async function getAll(startDate,finishDate,typeOfQuery) {
    let index = 0;
    let invoices = [];
    do {
        let invoiceObject = await getInvoices(startDate,finishDate,index);
        invoices = invoices.concat(invoiceObject);
        var invoiceNumber = invoiceObject.length;
        index += 30;
    }
    while(invoiceNumber === 30);
    if(typeOfQuery === "delivery") {
        processInvoicesForDelivery(invoices)
    } else if(typeOfQuery === "pickup") {

    } else if (typeOfQuery === "load") {
        processInvoicesForLoad(invoices)
    }
}

// funcion para convertir de 24 a 12h
function from24to12(s) {
    function z(n){return (n<10?'0':'')+n}
    var h, m, b, re = /\D/;
    if (re.test(s)) {
        b = s.split(re);
        h = b[0];
        m = z(+b[1]);
    } else {
        h = s.substring(0, s.length - 2);
        m = s.substring(s.length - 2);
    }
    return (h%12 || 12) + ':' + m //+ ' ' + (h>11? 'PM':'AM');
}

// funcion para convertir de 12 a 24h
const convertTimeTo24h = timeStr => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
        hours = '00';
    }
    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }
    return `${hours}${minutes}`;
};

// funcion para sacar la hora de las notas
function transformTime(annotation){
    let timeMatch = annotation.match(/[0-9]{1,2}:??[0-9]{0,2}\s??(?:am|pm|m)/i)[0]; //8pm or 12m
    if(/am|pm/i.test(timeMatch)){
        return from24to12(timeMatch) + " " + timeMatch.slice(timeMatch.search(/am|pm/i)).toUpperCase()
    }
    return "12:00 PM"
}



// Receives list of invoices
function processInvoicesForDelivery(invoices){
    let deliveryTable = [];
    invoices.forEach(invoice => {
        if(true){ // check status
            if (true) {
                //transformTime(invoice.anotation)
                let tempTable = [];
                tempTable.push(invoice.numberTemplate.fullNumber, invoice.client.name.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()), convertTimeTo24h(transformTime(invoice.anotation)), transformTime(invoice.anotation).split(" ")[1], invoice.totalPaid, (invoice.total - invoice.totalPaid), invoice.total)
                deliveryTable.push(tempTable)
                if(invoice.status === "void"){
                    tempTable[1]
                    tempTable[1] = "ANULADA - " + tempTable[1].slice(0,10)
                }
            }
        }
    });
    deliveryTable.sort((a, b) =>  a[2] - b[2]);
    deliveryTable.forEach((line) => {
        document.getElementById("tablaItems").innerHTML += `<tr class="border-b-2">
                    <td class="py-3">${line[0]}</td>
                    <td class="py-3 ${(/ANU/.test(line[1])? "text-red-500":"")}">${line[1]}</td>
                    <td class="py-3">${from24to12(line[2])} ${line[3]}</td>
                    <td class="py-3 text-gray-900 w-36 hidden lg:table-cell"><div class="${(/ANU/.test(line[1])? "bg-gray-300":"bg-green-300")} rounded-full">$${line[4]}</div></td>
                    <td class="py-3 text-gray-900 w-36"><div class="${(/ANU/.test(line[1])? "bg-gray-300":"bg-red-300")} rounded-full">$${line[5]}</div></td>
                    <td class="py-3 text-gray-900 w-36 hidden lg:table-cell"><div class="${(/ANU/.test(line[1])? "bg-gray-300":"bg-orange-300")} rounded-full">$${line[6]}</div></td>
                    <td class="w-10 text-center">
                        <input name="plan" type="radio">
                    </td></tr>
                    `
    })
}
function processInvoicesForLoad(invoices){
    let everyInvoice = [];
    invoices.forEach(invoice => {
        if((invoice.status === 'open'|'closed') && true){ // check status of checkboxes
            let element = [];
            invoice.items.forEach(item => {
                if(item["name"] !== "domicilio ida y regreso") {
                    element = [[ item["name"] + " --- " + item["description"] , item["quantity"] ]];
                    element = Object.fromEntries(element);
                    everyInvoice.push(element);
                }
            });
            console.log(everyInvoice);
        }
    });

    // groupArray function, receives an array (list) of key:values (name:quantity)
    // Example: [ { 'ItemA': 20 }, { 'ItemB': 1 }, { 'ItemA': 30 }, { 'ItemB': 1 } ]
    // and returns the sum of quantities for each item:
    // [ { 'ItemA': 50 }, { 'ItemB': 2 } ]
    const indexROf = function(key){
        return this.findIndex(el => typeof el[key] === 'number')
    };
    Array.prototype.indexROf = indexROf;
    const groupArray = arr => {
        const res = [];
        for(let i = 0; i < arr.length; i++){
            const key = Object.keys(arr[i])[0];
            const ind = res.indexROf(key);
            if(ind !== -1){
                res[ind][key] += arr[i][key];
            }else{
                res.push(arr[i]);
            };
        };
        return res;
    };
    // here it ends the groupArray function

    let allInvoices = groupArray(everyInvoice);
    console.log(allInvoices)
    everyInvoice = [];
    allInvoices.forEach(item => {
        let nameofProduct = Object.keys(item)[0];
        async function addItemToTable(name){
            //let productObject = await getProduct(name);  // Get products from API (unnecessary)
            //console.log(productObject[0].price[0].price)
            //let quantity = Object.values(item)[0];
            //let price = productObject[0].price[0].price*1;
            console.log(productObject[0].description) 
            element = [[ "name" , name ],[ "quantity" , Object.values(item)[0] ], [ "price", productObject[0].price[0].price*1 ]];
            element = Object.fromEntries(element);
            
            //console.log(element)
            //document.getElementById("tablaItems").innerHTML += "<tr><td>" + name + "</td><td>" + quantity + "</td><td>" + price + "</td></tr>";

            everyInvoice.push(element);
            console.log(everyInvoice)
        }
        //addItemToTable(nameofProduct)
    });
}

let today = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' }).slice(0,9)).toISOString().slice(0,10);
//console.log(today);
//getAll(today,today); //"2022-10-31"
