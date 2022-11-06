  // groupArray function, receives an array (list) of key:values (name:quantity)
    // Example: [ { 'ItemA': 20 }, { 'ItemB': 1 }, { 'ItemA': 30 }, { 'ItemB': 1 } ]
    // and returns the sum of quantities for each item:
    // [ { 'ItemA': 50 }, { 'ItemB': 2 } ]
    elArray = [ { 'ItemA': 20 }, { 'ItemB': 1 }, { 'ItemA': 30 }, { 'ItemB': 1 } ]
    elOtro = [ [ 'ItemA', 20 ], [ 'ItemB', 1 ], [ 'ItemA', 30 ], [ 'ItemB', 1 ] ]
    const indexROf = function(key){
        return this.findIndex(el => typeof el[key] === 'number')
    };
    Array.prototype.indexROf = indexROf;
    const groupArray = arr => {
        const res = [];
        for(let i = 0; i < arr.length; i++){
            //const key = Object.keys(arr[i])[0];
            const key = arr[i][0];
            //console.log(key)
            const ind = res.indexROf(key);
            //console.log(ind)
            if(ind !== -1){
                console.log(key)
                console.log(ind)
                console.log(res[ind][key])
                console.log(arr[i][key])
                res[ind][key] += arr[i][key];
                
            }else{
                res.push(arr[i]);
            };
        };
        return res;

    };

    console.log(groupArray(elOtro))
    console.log(elArray[0])
    // here it ends the groupArray function
