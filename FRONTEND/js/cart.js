// cart.js - Lógica simple para mostrar productos y manejar carrito
(function(){
  const products = [
    { id: 'p1', name: 'Crema Hidratante', type: 'Belleza', price: 12.50, img: 'images/crema.jpg' },
    { id: 'p2', name: 'Sérum Facial', type: 'Belleza', price: 24.00, img: 'images/serum.jpg' },
    { id: 'p3', name: 'Shampoo', type: 'Cuidado', price: 8.75, img: 'images/shampoo.jpg' },
    { id: 'p4', name: 'Acondicionador', type: 'Cuidado', price: 9.50, img: 'images/condicionador.jpg' }
  ];

  const $products = document.getElementById('products');
  const $cartItems = document.getElementById('cart-items');
  const $cartTotal = document.getElementById('cart-total');
  const $checkout = document.getElementById('checkout');

  let cart = loadCart();

  function renderProducts(){
    $products.innerHTML = '';
    products.forEach(p => {
      const card = document.createElement('article');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${p.img}" alt="${p.name}" onerror="this.style.display='none'">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center">
            <strong>${p.name}</strong>
            <span class="price">${fmt(p.price)}</span>
          </div>
          <div class="product-meta">
            <div class="type">${p.type}</div>
            <button class="btn-add" data-id="${p.id}">Agregar</button>
          </div>
        </div>
      `;
      $products.appendChild(card);
    });

    $products.querySelectorAll('.btn-add').forEach(btn => {
      btn.addEventListener('click', () => addToCart(btn.dataset.id));
    });
  }

  function addToCart(id){
    const prod = products.find(p=>p.id===id);
    if(!prod) return;
    const item = cart.find(i=>i.id===id);
    if(item) item.qty += 1; else cart.push({ id: prod.id, name: prod.name, type: prod.type, price: prod.price, qty: 1 });
    saveCart();
    renderCart();
  }

  function renderCart(){
    $cartItems.innerHTML = '';
    if(cart.length===0){
      $cartItems.innerHTML = '<div class="empty">El carrito está vacío.</div>';
      $cartTotal.textContent = fmt(0);
      return;
    }

    cart.forEach(item => {
      const el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML = `
        <div class="info">
          <div><strong>${item.name}</strong></div>
          <div style="font-size:.9rem;color:#666">${item.type}</div>
        </div>
        <div class="controls">
          <button class="qty-minus" data-id="${item.id}">-</button>
          <div style="min-width:28px;text-align:center">${item.qty}</div>
          <button class="qty-plus" data-id="${item.id}">+</button>
          <div style="width:80px;text-align:right">${fmt(item.price * item.qty)}</div>
          <button class="remove" data-id="${item.id}">✕</button>
        </div>
      `;
      $cartItems.appendChild(el);
    });

    $cartItems.querySelectorAll('.qty-plus').forEach(b => b.addEventListener('click', ()=> changeQty(b.dataset.id,1)));
    $cartItems.querySelectorAll('.qty-minus').forEach(b => b.addEventListener('click', ()=> changeQty(b.dataset.id,-1)));
    $cartItems.querySelectorAll('.remove').forEach(b => b.addEventListener('click', ()=> removeItem(b.dataset.id)));

    updateTotal();
  }

  function changeQty(id, delta){
    const it = cart.find(i=>i.id===id); if(!it) return;
    it.qty += delta; if(it.qty < 1) it.qty = 1;
    saveCart(); renderCart();
  }

  function removeItem(id){
    cart = cart.filter(i=>i.id!==id);
    saveCart(); renderCart();
  }

  function updateTotal(){
    const total = cart.reduce((s,i)=> s + i.price * i.qty, 0);
    $cartTotal.textContent = fmt(total);
  }

  function fmt(n){
    return new Intl.NumberFormat('es-ES',{ style:'currency', currency:'USD', maximumFractionDigits:2 }).format(n);
  }

  function saveCart(){
    try{ localStorage.setItem('cart', JSON.stringify(cart)); }catch(e){}
  }

  function loadCart(){
    try{ return JSON.parse(localStorage.getItem('cart')) || []; }catch(e){ return []; }
  }

  // Checkout placeholder
  $checkout.addEventListener('click', ()=>{
    if(cart.length===0){ alert('El carrito está vacío.'); return; }
    alert('Procesar pago — total: ' + $cartTotal.textContent);
    cart = [];
    saveCart(); renderCart();
  });

  // Inicializar
  renderProducts();
  renderCart();
})();
