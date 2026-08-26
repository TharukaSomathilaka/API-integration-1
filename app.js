fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {

        let productContainer = document.getElementById("productContainer");
        let body = "";

        data.forEach(element => {
            body += `
                <div class="col">
                    <div class="card shadow-sm">

                        <img src="${element.image}" 
                             alt="${element.title}" 
                             class="card-img img-thumbnail">

                        <div class="card-body">
                        <h1 class="card-title">${element.title} </h1>
                            <h5>${element.title}</h5>

                            <p class="card-text">
                                ${element.description}
                            </p>

                            <p>
                                <strong>$${element.price}</strong>
                            </p>

                            <div class="d-flex justify-content-between align-items-center">

                                <div class="">
                                    <button type="button"
                                            class="btn btn-sm btn-outline-secondary">
                                        Buy Now ${element.price} $
                                    </button>

                                   
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            `;
        });

        productContainer.innerHTML = body;
    });