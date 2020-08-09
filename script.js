let pizzas = [
    {id:1, name:'Mussarela', img:'images/pizza.png', price:20.19, sizes:['100g', '530g', '860g'], description:'Descrição da pizza em mais de uma linha muito legal bem interessante'},
    {id:2, name:'Calabresa', img:'images/pizza2.png', price:18.00, sizes:['320g', '530g', '860g'], description:'Descrição da pizza em mais de uma linha muito legal bem interessante'},
    {id:3, name:'Quatro Queijos', img:'images/pizza3.png', price:17.45, sizes:['320g', '530g', '860g'], description:'Descrição da pizza em mais de uma linha muito legal bem interessante'},
    {id:4, name:'Americana', img:'images/pizza4.png', price:19.77, sizes:['320g', '530g', '860g'], description:'Descrição da pizza em mais de uma linha muito legal bem interessante'},
    {id:5, name:'Sorvete', img:'images/pizza5.png', price:21.43, sizes:['320g', '530g', '860g'], description:'Descrição da pizza em mais de uma linha muito legal bem interessante'},
    {id:6, name:'Moda da Casa', img:'images/pizza6.png', price:18.55, sizes:['320g', '530g', '860g'], description:'Descrição da pizza em mais de uma linha muito legal bem interessante'},
    {id:7, name:'Chocolate', img:'images/pizza7.png', price:22.36, sizes:['320g', '530g', '860g'], description:'Descrição da pizza em mais de uma linha muito legal bem interessante'}
];


const c =  el => document.querySelector(el);


// Exercício 1:
// mapear o pizzaJson e clonar as 7 pizzas do pizzaJson
// exercício 2, mapear, colocar a sinformações da pizza e adicionar

pizzas.map((pizza, index) => {

    // pizza item é o objeto clonado

    let pizzaItem = c(".models .pizza-item").cloneNode(true);

    pizzaItem.querySelector(".pizza-img img").src = pizza.img;
    pizzaItem.querySelector(".pizza-price").innerHTML = `R$${pizza.price.toFixed(2)}`;
    pizzaItem.querySelector(".pizza-name").innerHTML = pizza.name;
    pizzaItem.querySelector(".pizza-desc").innerHTML = pizza.description;

    c(".pizza-area").append(pizzaItem);

});

    


