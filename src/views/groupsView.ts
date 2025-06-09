import { Group } from "../types/group";

export function renderGroupsView(container: HTMLElement) {
  container.innerHTML = `
    <div class="content-wrapper">
      <section class="table-section">
        <h2>Список груп</h2>
        <table>
          <thead>
            <tr>
              <th>Назва групи</th>
              <th>Підгрупа</th>
            </tr>
          </thead>
          <tbody id="groupsTableBody"></tbody>
        </table>
      </section>

      <section class="form-section">
        <h2>Додати групу</h2>
        <form id="addGroupForm">
          <label for="groupName">Назва групи</label>
          <input type="text" id="groupName" placeholder="Введіть назву групи" required />
          <label for="subgroup">Підгрупа</label>
          <input type="text" id="subgroup" placeholder="Введіть підгрупу" required/>
          <button type="submit">Додати групу</button>
        </form>
      </aside>
    </div>
  `;

  fetchGroupsAndRender();
  setupAddGroupForm();
}

async function fetchGroupsAndRender() {
  try {
    const response = await fetch('http://localhost:4000/api/groups');
    const result = await response.json();
    if (result.success && Array.isArray(result.data)) {
      renderGroupsTable(result.data);
    } else {
      renderGroupsTable([]);
      alert('Не вдалося завантажити групи');
    }
  } catch (error) {
    renderGroupsTable([]);
    alert('Помилка при завантаженні груп');
  }
}

function renderGroupsTable(groups: Group[]) {
  const tbody = document.getElementById('groupsTableBody');
  if (!tbody) return;
  tbody.innerHTML = groups.map(group => `
    <tr>
      <td>${group.name}</td>
      <td>${group.subGroup}</td>
    </tr>
  `).join('');
}

function setupAddGroupForm() {
  const form = document.getElementById('addGroupForm') as HTMLFormElement;
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const groupNameInput = document.getElementById('groupName') as HTMLInputElement;
    const subgroupInput = document.getElementById('subgroup') as HTMLInputElement;

    const name = groupNameInput.value;
    const subgroup = Number(subgroupInput.value);

    const payload = { name, subGroup: subgroup };

    try {
      const response = await fetch('http://localhost:4000/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.success) {
        alert('Групу успішно додано');
        groupNameInput.value = '';
        subgroupInput.value = '';
        form.reset();
        fetchGroupsAndRender();
      } else {
        alert('Не вдалося додати групу: ' + result.message);
      }
    } catch (error) {
      alert('Помилка при додаванні групи: ' + error);
    }
  });
}
