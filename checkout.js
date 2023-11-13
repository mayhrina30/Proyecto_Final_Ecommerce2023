var carrito = JSON.parse(localStorage.getItem("carrito"));
var orderProducts = document.querySelector(".order-products"); // Agrega esta línea

if (carrito && carrito.productos.length > 0) {
    // Elimina cualquier contenido existente en la sección "Order Products"
    orderProducts.innerHTML = '';

    carrito.productos.forEach(product => {
        // Crea elementos HTML para cada producto y agrega los datos
        var productCol = document.createElement("div");
        productCol.classList.add("order-col");

        var productInfo = document.createElement("div");
        productInfo.textContent = `${product.quantity}x ${product.nombre}`;

        var productPrice = document.createElement("div");
        productPrice.textContent = `${product.precio}`;

        productCol.appendChild(productInfo);
        productCol.appendChild(productPrice);

        // Agrega el elemento de producto a la sección "Order Products"
        orderProducts.appendChild(productCol);
    });

    // Muestra el total de compras
    var orderTotal = document.querySelector(".order-total");
    orderTotal.textContent = `Total: $${carrito.total.toFixed(2)}

    <button class="btn-primarym" id="checkout-btn"> go to checkout</button>
    <div id="button-checkout"></div>
    `;
///
    const mercadopago = new Mercadopago("PUBLIC KEY", {
        locale:"es-AR",
    });

    const checkoutButton = orderTotal.querySelector("#checkout-btn");

    checkoutButton.addEventListener("click", function (){

        checkoutButton.remove();

        const orderData = {
            quantity: 1,
            description: "compra de ecommerce",
            price: carrito.total,
        };

        fetch("http://localhost:8080/create_preference",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        })
            .then(function (response){
                return response.json();
            })
            .then(function (preference){
                createCheckoutButton(preference.id);
            })
            .catch(function (){
                alert ("Unexpected error");
            });
    });

    function createCheckoutButton(preferenceId){
        //Initialize the ckeckout
        const bricksBuilder = mercadopago.bricks();

        const renderComponent = async (bricksBuilder) => {
            //if (window.checkoutButton) checkoutButton.unmount();

            await bricksBuilder.create(
                "wallet",
                "button-checkout",
                {
                    initialization: {
                        preferenceId: preferenceId,
                    },
                    callbacks: {
                        onError: (error) => console.error(error),
                        onReady: () => {},
                    },
                }
            );
        };
        window.checkoutButton = renderComponent(bricksBuilder);
    }

    }else {
    console.log("El carrito está vacío.");
};