// Initialize variables
var products = [];
var productsContainer = document.getElementById("product-tabel-container");
var warningMessage = document.getElementById("warning-msg");
var tabelBody = document.getElementById("tabel-body");
class Product {
    constructor(name, category, price, description) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.description = description;
    }
}

class ProductManager {
    constructor() {
        this.products = [];
        this.productsContainer = document.getElementById("product-tabel-container");
        this.warningMessage = document.getElementById("warning-msg");
        this.tableBody = document.getElementById("tabel-body");
    }

    renderData() {
        if (this.products.length !== 0) {
            this.productsContainer.classList.remove("d-none");
            this.productsContainer.classList.add("d-block");
            this.warningMessage.classList.add("d-none");
            this.warningMessage.classList.remove("d-block");

            let rows_elements = "";
            for (let i = 0; i < this.products.length; i++) {
                rows_elements += `
                    <tr>
                        <th>${i + 1}</th>
                        <td>${this.products[i].name}</td>
                        <td>${this.products[i].category}</td>
                        <td>${this.products[i].price}</td>
                        <td>${this.products[i].description}</td>
                        <td>
                            <button class="btn btn-outline-success" onclick="productManager.editProduct(${i})">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                        </td>
                        <td>
                            <button class="btn btn-outline-danger" onclick="productManager.deleteProduct(${i})">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
            }
            this.tableBody.innerHTML = rows_elements;
        } else {
            this.warningMessage.classList.remove("d-none");
            this.warningMessage.classList.add("d-block");
            this.productsContainer.classList.add("d-none");
            this.productsContainer.classList.remove("d-block");
        }
    }

    addProduct(product) {
        this.products.push(product);
        this.renderData();
    }

    updateProduct(index, product) {
        this.products[index] = product;
        this.renderData();
    }




    deleteProduct(index) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.products.splice(index, 1);
                this.renderData();
                Swal.fire(
                    'Deleted!',
                    'Your product has been deleted.',
                    'success'
                )
            }
        });
    }

    editProduct(index) {
        const product = this.products[index];
        document.getElementById("product_name").value = product.name;
        document.getElementById("product_category").value = product.category;
        document.getElementById("product_price").value = product.price;
        document.getElementById("prodct_desc").value = product.description;
        document.getElementById("create-btn").textContent = "Update Product";
        document.getElementById("create-btn").setAttribute('data-index', index);
    }
}

const productManager = new ProductManager();




const productForm = document.getElementById("product-form");

productForm.onsubmit = function (event) {
    event.preventDefault();

    const productName = document.getElementById("product_name").value;
    const productCategory = document.getElementById("product_category").value;
    const productPrice = document.getElementById("product_price").value;
    const productDescription = document.getElementById("prodct_desc").value;
    const createBtn = document.getElementById("create-btn");

    if (!productName || !productCategory || !productPrice || !productDescription) {
        alert("Empty data cannot be added");
        return;
    }

    const product = new Product(productName, productCategory, productPrice, productDescription);

    if (createBtn.textContent === "Add Product") {
        productManager.addProduct(product);
    } else {
        const index = createBtn.getAttribute('data-index');
        productManager.updateProduct(index, product);
        createBtn.textContent = "Add Product";
    }

    productForm.reset();
};
document.querySelector(".btn-primary:nth-of-type(2)").onclick = function (event) {
    event.preventDefault();
    productForm.reset();
};

function myFunction() {

    const element = document.body;
    
    element.classList.toggle("dark-mode");
}

productManager.renderData();
