// ── Sample listings data ──
const listings = [
  {
    name: "Ate Maria's Kitchen",
    category: "restaurant",
    emoji: "🍽️",
    description: "Authentic Filipino home cooking. Adobo, sinigang, lechon, and more.",
    location: "Los Angeles, CA"
  },
  {
    name: "Pilipino Beauty Bar",
    category: "beauty",
    emoji: "💅",
    description: "Hair, nails, and skincare services by Filipino professionals.",
    location: "San Francisco, CA"
  },
  {
    name: "Pinoy Padala Express",
    category: "remittance",
    emoji: "💸",
    description: "Fast and affordable money transfers to the Philippines.",
    location: "New York, NY"
  },
  {
    name: "Dr. Reyes Family Clinic",
    category: "medical",
    emoji: "🏥",
    description: "General practice with Filipino-speaking staff. All ages welcome.",
    location: "Chicago, IL"
  },
  {
    name: "Sari-Sari General Store",
    category: "retail",
    emoji: "🛍️",
    description: "Filipino groceries, snacks, and hard-to-find products from home.",
    location: "Houston, TX"
  },
  {
    name: "Kabayan AC & Repair",
    category: "services",
    emoji: "🔧",
    description: "Trusted home repair and HVAC services by licensed Filipino technicians.",
    location: "Las Vegas, NV"
  },
  {
    name: "Aling Nena's Bakery",
    category: "restaurant",
    emoji: "🍞",
    description: "Pan de sal, bibingka, ensaymada, and more Filipino breads & pastries.",
    location: "Seattle, WA"
  },
  {
    name: "GlowUp by Ate Len",
    category: "beauty",
    emoji: "✨",
    description: "Eyelash extensions, brow shaping, and skin care facials.",
    location: "San Diego, CA"
  },
  {
    name: "Pinoy Tech Services",
    category: "services",
    emoji: "💻",
    description: "Computer repair, network setup, and IT support for homes and small businesses.",
    location: "Phoenix, AZ"
  }
];

let activeCategory = 'all';

// ── Render listings ──
function renderListings(items) {
  const grid = document.getElementById('listingsGrid');
  const noResults = document.getElementById('noResults');

  if (items.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }

  noResults.style.display = 'none';
  grid.innerHTML = items.map(item => `
    <div class="card">
      <div class="card-emoji">${item.emoji}</div>
      <h3>${item.name}</h3>
      <span class="card-cat">${item.category}</span>
      <p>${item.description}</p>
      <div class="card-location">${item.location}</div>
    </div>
  `).join('');
}

// ── Filter by category ──
function setCategory(cat) {
  activeCategory = cat;

  // Update active button
  document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  filterListings();
}

// ── Search + category filter ──
function filterListings() {
  const query = document.getElementById('searchInput').value.toLowerCase().trim();

  const filtered = listings.filter(item => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = !query ||
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  renderListings(filtered);
}

// ── Live search on keyup ──
document.getElementById('searchInput').addEventListener('keyup', filterListings);

// ── Contact form ──
function handleSubmit(e) {
  e.preventDefault();
  e.target.reset();
  document.getElementById('formSuccess').style.display = 'block';
  setTimeout(() => {
    document.getElementById('formSuccess').style.display = 'none';
  }, 5000);
}

// ── Init ──
renderListings(listings);
