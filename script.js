let pizzas = [
    {id:1, name:'Mussarela', img:'images/pizza.png', price:20.19, sizes:['100g', '530g', '860g'], description:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'},
    {id:2, name:'Calabresa', img:'images/pizza2.png', price:18.00, sizes:['320g', '530g', '860g'], description:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'},
    {id:3, name:'Quatro Queijos', img:'images/pizza3.png', price:17.45, sizes:['320g', '530g', '860g'], description:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'},
    {id:4, name:'Americana', img:'images/pizza4.png', price:19.77, sizes:['320g', '530g', '860g'], description:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'},
    {id:5, name:'Sorvete', img:'images/pizza5.png', price:21.43, sizes:['320g', '530g', '860g'], description:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'},
    {id:6, name:'Moda da Casa', img:'images/pizza6.png', price:18.55, sizes:['320g', '530g', '860g'], description:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'},
    {id:7, name:'Chocolate', img:'images/pizza7.png', price:22.36, sizes:['320g', '530g', '860g'], description:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'}
];

let modalQtPizzas = 1;
const c =  el => document.querySelector(el);
const cAll = el => document.querySelectorAll(el);


// Exercício 1: mapear o pizzaJson e clonar as 7 pizzas do pizzaJson
// exercício 2: mapear, colocar a sinformações da pizza e adicionar
// exercício 3: tirar o evento de atualizar na tag a, o add.EventListener
// exercício 4: Abrir o modal
// exercício 5: Fazer a key de cada modal conforme a pizza clicada e por as informações da pizza no modal
// exercício 6: pegar os tamanhos das pizzas
// exercício 7: mostrar sempre o tamanho grande selecionado

pizzas.map((pizza, index) => {

    // pizza item é o objeto clonado

    let pizzaItem = c(".models .pizza-item").cloneNode(true);
    let modal = c(".pizza--modal-area");
    let timer = 300;

    // Pegando as informações do array de pizza e preenchendo os objetos
    //Atribui um data-key e pega a contagem do index mapeado para identificar cada pizza

    pizzaItem.setAttribute("data-key", index);
    pizzaItem.querySelector(".pizza-img img").src = pizza.img;
    pizzaItem.querySelector(".pizza-price").innerHTML = `R$${pizza.price.toFixed(2)}`;
    pizzaItem.querySelector(".pizza-name").innerHTML = pizza.name;
    pizzaItem.querySelector(".pizza-desc").innerHTML = pizza.description;

    // adicionando o clone da pizza 

      c(".pizza-area").append(pizzaItem);

    // Tirando  o evento default dos links das pizzas

    pizzaItem.querySelector("a").addEventListener("click", e => {
        
        e.preventDefault();

        // a key aponta para pizza-item e recebe o attribute dele que foi settado

        let key = e.target.closest(".pizza-item").getAttribute("data-key");
        let sizeValue = cAll(".pizzaInfo-size");
        modalQtPizzas = 1;

        // preenchendo as informações do modal de acordo com a sua key

        c(".pizzaBig img").src = pizzas[key].img;
        c(".pizzaInfo h1").innerHTML = pizzas[key].name;
        c(".pizzaInfo .pizzaInfo-desc").innerHTML = pizzas[key].description;
        c(".pizzaInfo-actualPrice").innerHTML = `R$ ${pizzas[key].price.toFixed(2)}`

        // Remove a classe que possui selected

        c(".pizzaInfo-size.selected").classList.remove("selected");

        // Adiciona se o tamanho for grande.

        
        sizeValue.forEach((size, sizeIndex) => {

            size.querySelector('span').innerHTML = pizzas[key].sizes[sizeIndex];

            if(sizeIndex === 2) {

                size.classList.add("selected");
            }

        });

        c(".pizzaInfo-qt").innerHTML = modalQtPizzas;

        // abrindo modal

        modal.style.opacity = 0;
        modal.style.display = "flex";

        setTimeout(() => {

            modal.style.opacity = 1;

        }, timer)
    
    
     });

  

   



});

    


