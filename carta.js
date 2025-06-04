// carta.js

document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
});

async function fetchProducts() {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error('Error al obtener productos');
    }
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error(error);
    const container = document.getElementById('productsContainer');
    container.innerHTML = '<p class="text-red-600">No se pudieron cargar los productos.</p>';
  }
}

function renderProducts(products) {
  const container = document.getElementById('productsContainer');
  container.innerHTML = '';
  products.forEach((product) => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md p-4 flex flex-col';

    const imgSrc = product.imageUrl || 'https://via.placeholder.com/150';
    card.innerHTML = `
      <img src="${imgSrc}" alt="${product.name}" class="w-full h-48 object-cover rounded-md mb-4" />
      <h3 class="text-lg font-semibold">${product.name}</h3>
      <p class="text-gray-600 mt-2">${product.description}</p>
      <p class="text-green-700 font-bold mt-2">$ ${product.price.toFixed(2)}</p>
    `;
    container.appendChild(card);
  });
}