  // groupArray function, receives an array (list) of key:values (name:quantity)
    // Example: [ { 'ItemA': 20 }, { 'ItemB': 1 }, { 'ItemA': 30 }, { 'ItemB': 1 } ]
    // and returns the sum of quantities for each item:
    // [ { 'ItemA': 50 }, { 'ItemB': 2 } ]
    elArray = [ { 'ItemA': 20 }, { 'ItemB': 1 }, { 'ItemA': 30 }, { 'ItemB': 1 } ]
    elOtro = [ [ 'ItemA', 20 ], [ 'ItemB', 1 ], [ 'ItemA', 30 ], [ 'ItemB', 1 ] ]
    
    console.log(Object.entries(elArray[0])[0])