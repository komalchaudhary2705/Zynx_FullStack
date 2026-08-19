

let products = 200;
let limit = 30;

let totalPage = Math.ceil(products / limit);

console.log(totalPage);

let pages = [];

for (let i = 1 ; i<=totalPage; i++){
    pages.push(i)
}

console.log(pages)