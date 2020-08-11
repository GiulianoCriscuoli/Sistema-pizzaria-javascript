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
let cart = [];
let modalKey = 0;
const c =  el => document.querySelector(el);
const cAll = el => document.querySelectorAll(el);

pizzas.map((pizza, index) => {

    // pizza item é o objeto clonado

    let pizzaItem = c(".models .pizza-item").cloneNode(true);
    const modal = c(".pizza--modal-area");
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
        modalKey = key;

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

        // abrindo modal
        c(".pizzaInfo-qt").innerHTML = modalQtPizzas;

        modal.style.opacity = 0;
        modal.style.display = "flex";

        setTimeout(() => {

            modal.style.opacity = 1;

        }, timer)
    
     });

});

// eventos do modal

// Fechando o modal

function closeModal() {

    const modal = c(".pizza--modal-area");
    let timerCloser = 500;

    modal.style.opacity = 0;

    setTimeout(() => {
        
    modal.style.display = "none";

    }, timerCloser);
  
}

// Pegar os dois botões que fecham e dar um foreach para fechá-los

cAll(".pizzaInfo-cancelButton, .pizzaInfo--cancelButton-mobile").forEach(close => {

    close.addEventListener("click", closeModal);

});

// aumentando e diminuindo a quantidade de pizzas

c(".pizzaInfo-qtmenos").addEventListener("click", () => {

    if(modalQtPizzas > 1) {
       
        modalQtPizzas--;

        c(".pizzaInfo-qt").innerHTML = modalQtPizzas;

    }    

});

c(".pizzaInfo-qtmais").addEventListener("click", () => {

        modalQtPizzas++;

        c(".pizzaInfo-qt").innerHTML = modalQtPizzas;

});

// selecionando os tamanhos

cAll(".pizzaInfo-size").forEach((size) => {

    size.addEventListener("click", (e) => {

        c(".pizzaInfo-size.selected").classList.remove("selected");
        size.classList.add("selected");

    });

});

c(".pizzaInfo-addButton").addEventListener("click", () => {

    // 3 informações são necessárias aqui: 
    // qual pizza? Está armazenada em modalKey, que possui a key do modal selecionado
    // tamanho da pizza? O tamanho da pizza é a que está com a classe selected, então pegamos a sua data-ley
    // quantas pizzas? Essa informação está em modalQtPizzas

    // daata-key do tamanho da pizza

    let size = parseInt(c(".pizzaInfo-size.selected").getAttribute("data-key"));

    // criar o identificador

    let identifier = pizzas[modalKey].id + "@" + size;

    // cria uma variável com o array dos identifiers iguais
    // com o findIndex vai procurar pelo identificador igualado

    let keyCart = cart.findIndex(item => item.identifier === identifier);

    // verifica se tem o item na keyCart

    if(keyCart > -1) {

        cart[keyCart].qt += modalQtPizzas;
    } else {
  
    cart.push({
        identifier,
        id: pizzas[modalKey].id,
        size,
        qt: modalQtPizzas

    });

    }
    updateCart();
    closeModal();

});

//atualizando o carrinho após adicionar e fechar o modal

function updateCart() {

    // se o item existir, ele vai mostrar o painel do carrinho

    if(cart.length > 0) {

        c("aside").classList.add("show");
        c(".cart").innerHTML = "";

        let subtotal = 0;
        let off = 0;
        let total = 0;

        // for para procurar em cada item array do carrinho 

        for( let i in cart) {

            

            // selectedPizza recebe pelo find todas as propriedades da pizza onde
            // o id da busca for igual ao id do item selecionado e  do carrinho da interação 

            let selectedPizza = pizzas.find(item => item.id === cart[i].id);

            // Fazer o cáculo do subtotal = é ele + (preço das pizzas * quantidade)

            subtotal += selectedPizza.price * cart[i].qt;

            let cartItem = c(".models .cart-item").cloneNode(true);
            let pizzaSizeName;

            switch(cart[i].size) {

                case 0: 
                    pizzaSizeName = "P";
                    break;

                case 1: 
                    pizzaSizeName = "M";
                    break;

                case 2:
                    pizzaSizeName = "G";
                    break;
            }

            let pizzaName = `${selectedPizza.name} (${pizzaSizeName})`;

            cartItem.querySelector("img").src = selectedPizza.img;
            cartItem.querySelector(".cart--item-name").innerHTML = pizzaName;
            cartItem.querySelector(".cart--item-qt").innerHTML = cart[i].qt;
            cartItem.querySelector(".cart--item-qtmenos").addEventListener("click", () => {
                
                if(cart[i].qt > 1) {
                    cart[i].qt--;

                } else {
                    cart.splice(i, 1);
                    
                }

                updateCart();

            });

            cartItem.querySelector(".cart--item-qtmais").addEventListener("click", () => {
                cart[i].qt++;
                updateCart();

            });

            c(".cart").append(cartItem);
        }

        off = subtotal * 0.1;
        total = subtotal - off;

        c(".subtotal span:last-child").innerHTML = `RS ${subtotal.toFixed(2)}`;
        c(".desconto span:last-child").innerHTML = `RS ${off.toFixed(2)}`;
        c(".total span:last-child").innerHTML = `RS ${total.toFixed(2)}`;

    } else {

        c("aside").classList.remove("show");

    }

}