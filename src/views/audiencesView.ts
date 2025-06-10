import { Audience } from '../types/audience';

export function renderAudiencesView(container: HTMLElement) {
  container.innerHTML = `

  <div class="content-wrapper">
    <section class="table-section">
      <h2>Список аудиторій</h2>
      <table>
        <thead>
          <tr>
            <th>Аудиторія</th>
          </tr>
        </thead>
        <tbody id="audiencesTableBody"></tbody>
      </table>
    </section>

    <section class="form-section">
      <h2>Додати аудиторію</h2>
      <form id="addAudienceForm">
        <label for="name">Номер аудиторії</label>
        <input type="text" id="name" placeholder="Введіть номер аудиторії (Приклад: Ауд. 47)" required />

        <button type="submit">Додати аудиторію</button>
      </form>
    </section>
  </div>
  `;

  fetchClassroomsAndRender();
  setupAddClassroomForm();
}

async function fetchClassroomsAndRender() {
  try {
    const response = await fetch('http://localhost:4000/api/audiences');
    const result = await response.json();
    if (result.success && Array.isArray(result.data)) {
      renderClassroomsTable(result.data);
    } else {
      renderClassroomsTable([]);
      alert('Не вдалося завантажити аудиторії');
    }
  }
  catch (error) {
    renderClassroomsTable([]);
    alert('Помилка при завантаженні аудиторій');
  }
}

function renderClassroomsTable(audiences: Audience[]) {
  const tbody = document.getElementById('audiencesTableBody');
  if (!tbody) return;

  tbody.innerHTML = audiences.map(audience => `
    <tr>
      <td>${audience.name}</td>
    </tr>
  `).join('');
}

function setupAddClassroomForm() {
  const form = document.getElementById('addAudienceForm') as HTMLFormElement;
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const audienceNameInput = document.getElementById('name') as HTMLInputElement;
    if (!audienceNameInput) return;

    const audienceName = audienceNameInput.value;

    try {
      const response = await fetch('http://localhost:4000/api/audiences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: audienceName }),
      });

      const result = await response.json();
      if (result.success) {
        alert('Аудиторію успішно додано');
        fetchClassroomsAndRender();
      } else {
        alert('Не вдалося додати аудиторію');
      }
    } catch (error) {
      alert('Помилка при додаванні аудиторії');
    }
  }
  );
}

