
module.exports = (x,y, callback) => {
    if(x <= 0 || y <= 0) {
        callback(new Error(`A Rectangle, this is not. ReceivedL: ${x}, ${y}`));
    }
    else {
        setTimeout(() => {
            callback(null, {
                perimeter: (x, y) => 2 * (x+y),
                area: (x, y) => x * y,
            }),
            2000
        })
    }
}


// module.exports = (x,y, callback) => {
//     if(x <= 0 || y <= 0) {
//         callback(new Error(`A Rectangle, this is not. ReceivedL: ${x}, ${y}`));
//     }
//     else {
//         setTimeout(() => {
//             callback(null, {
//                 perimeter: (x, y) => 2 * (x+y),
//                 area: (x, y) => x * y,
//             }),
//             2000
//         })
//     }
// }