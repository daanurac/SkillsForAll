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

async function getAll(startDate,finishDate) {
    let index = 0;
    let invoices = [];
    do {
        let invoiceObject = await getInvoices(startDate,finishDate,index);
        invoices = invoices.concat(invoiceObject);
        var invoiceNumber = invoiceObject.length;
        index += 30;
    }
    while(invoiceNumber === 30);
    processInvoices(invoices)
}


// Receives list of invoices
function processInvoices(invoices){
    let everyInvoice = [];
    let deliveryTable = [];
    invoices.forEach(invoice => {
        if(true){ // check status
            if (true) {
                let elementOfDeliveryTable = [];
                elementOfDeliveryTable.push(invoice.numberTemplate.fullNumber)
                elementOfDeliveryTable.push(invoice.client.name)
                elementOfDeliveryTable.push('8:00 am')
                elementOfDeliveryTable.push(invoice.totalPaid)
                elementOfDeliveryTable.push(invoice.total - invoice.totalPaid)
                elementOfDeliveryTable.push(invoice.total)
                console.log(elementOfDeliveryTable)
                document.getElementById("tablaItems").innerHTML += `
                        <td class="py-3">${invoice.numberTemplate.fullNumber}</td>
                        <td class="py-3">${invoice.client.name}</td>
                        <td class="py-3">8:00 am</td>
                        <td class="py-3 text-gray-900 w-36 hidden lg:table-cell"><div class="bg-green-300 rounded-full">$${invoice.totalPaid}</div></td>
                        <td class="py-3 text-gray-900 w-36"><div class="bg-red-300 rounded-full">$${invoice.total - invoice.totalPaid}</div></td>
                        <td class="py-3 text-gray-900 w-36 hidden lg:table-cell"><div class="bg-orange-300 rounded-full">$${invoice.total}</div></td>
                        <td class="w-10 text-center">
                            <input name="plan" type="radio">
                        </td>
                        `
            } 
            let element = [];
            invoice.items.forEach(item => {
                element = [[ item["name"] , item["quantity"] ]];
                element = Object.fromEntries(element);
                //console.log(element)
                everyInvoice.push(element);
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

getAll("2022-10-31","2022-10-31");