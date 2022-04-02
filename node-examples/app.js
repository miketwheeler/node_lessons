
const rect = import('./rectangle.js');

function solveRect(l, w) {
    console.log(`SOLVING FOR RECTANGLE WITH DIMENSIONS: ${l}x${w}`);

    rect(l, w, (err, rectangle) => {
        if(err) {
            console.log('Error: ', err.message)
        }
        else {
            console.log(`Area of Rectangle with dimensions ${l}x${w} is: ${rectangle.area()}`);
            console.log(`Perimeter of Rectangle with dimensions ${l}x${w} is: ${rectangle.perimeter()}`)
        }
    });
    console.log('This statement is logged after the call to rect()');
}

solveRect(2, 4);
solveRect(3, 5);
solveRect(0, 5);
solveRect(5, -3);

// const rect = require('./rectangle');

// function solveRect(l, w) {
//     console.log(`SOLVING FOR RECTANGLE WITH DIMENSIONS: ${l}x${w}`);

//     rect(l, w, (err, rectangle) => {
//         if(err) {
//             console.log('Error: ', err.message)
//         }
//         else {
//             console.log(`Area of Rectangle with dimensions ${l}x${w} is: ${rectangle.area()}`);
//             console.log(`Perimeter of Rectangle with dimensions ${l}x${w} is: ${rectangle.perimeter()}`)
//         }
//     });
//     console.log('This statement is logged after the call to rect()');
// }

// solveRect(2, 4);
// solveRect(3, 5);
// solveRect(0, 5);
// solveRect(5, -3);