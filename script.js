document.addEventListener('DOMContentLoaded', () => {
    let allUsers = [];
  
    async function fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        allUsers = data;
        displayUsers(allUsers);
      } catch (error) {
        const userGrid = document.getElementById('userGrid');
        if (userGrid) {
          userGrid.innerHTML = `<p class="text-red-500">Error loading users. Please try again later.</p>`;
        }
        console.error('Error fetching users:', error);
      }
    }
  
    function escapeHtml(str) {
      if (str === null || str === undefined) return '';
      return String(str).replace(/[&<>"']/g, ch =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch])
      );
    }
  
    function displayUsers(users) {
      const userGrid = document.getElementById('userGrid');
      if (!userGrid) return;
  
      if (!users || users.length === 0) {
        userGrid.innerHTML = `<p class="text-gray-500">No users found.</p>`;
        return;
      }
  
      userGrid.innerHTML = users.map(user => `
        <div class="bg-white rounded-xl shadow-lg p-4">
          <h2 class="text-xl font-semibold">${escapeHtml(user.name)}</h2>
          <p class="text-gray-600">${escapeHtml(user.email)}</p>
          <p class="text-gray-600">${escapeHtml(user.address?.city ?? 'N/A')}</p>
          <p class="text-gray-500">${escapeHtml(user.company?.name ?? '')}</p>
          <button class="view-more mt-3 text-blue-600 hover:underline"
                  data-phone="${escapeHtml(user.phone)}"
                  data-website="${escapeHtml(user.website)}">
            View More
          </button>
        </div>
      `).join('');
    }
  
    // Search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const q = (e.target.value || '').toLowerCase();
        const filtered = allUsers.filter(u => (u.name || '').toLowerCase().includes(q));
        displayUsers(filtered);
      });
    }
  
    // Event delegation for View More buttons
    const userGrid = document.getElementById('userGrid');
    if (userGrid) {
      userGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('.view-more');
        if (!btn) return;
        const phone = btn.dataset.phone || '';
        const website = btn.dataset.website || '';
        alert(`phone: ${phone}\nwebsite: ${website}`);
      });
    }
  
    // initialize
    fetchUsers();
  });
  