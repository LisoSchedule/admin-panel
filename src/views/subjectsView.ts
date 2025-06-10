import { Subject } from '../types/subject';
import { SubjectType } from '../enums/subjectType.js';

export function renderSubjectsView(container: HTMLElement) {
  container.innerHTML = `
    <div class="content-wrapper">
      <section class="table-section">
        <h2>Список предметів</h2>
        <table>
          <thead>
            <tr>
              <th>Назва предмету</th>
              <th>Тип</th>
            </tr>
          </thead>
          <tbody id="subjectsTableBody"></tbody>
        </table>
      </section>

      <section class="form-section">
        <h2>Додати предмет</h2>
        <form id="addSubjectForm">
          <label for="subjectName">Назва предмету</label>
          <input type="text" id="subjectName" placeholder="Введіть назву предмету" required />
          
          <label for="subjectType">Тип предмету</label>
          <select id="subjectType" required>
            <option value="" disabled selected>Оберіть тип</option>
            <option value="Lecture">Лекція</option>
            <option value="Practice">Лабораторна</option>
          </select>
          
          <button type="submit">Додати предмет</button>
        </form>
      </section>
    </div>
  `;

  fetchSubjectsAndRender();
  setupAddSubjectForm();
}

async function fetchSubjectsAndRender() {
  try {
    const response = await fetch('http://localhost:4000/api/subjects');
    const result = await response.json();
    if (result.success && Array.isArray(result.data)) {
      renderSubjectsTable(result.data);
    } else {
      renderSubjectsTable([]);
      alert('Не вдалося завантажити предмети');
    }
  } catch (error) {
    renderSubjectsTable([]);
    alert('Помилка при завантаженні предметів');
  }
}

function renderSubjectsTable(subjects: Subject[]) {
  const tbody = document.getElementById('subjectsTableBody');
  if (!tbody) return;
  tbody.innerHTML = subjects.map(subject => `
    <tr>
      <td>${subject.name}</td>
      <td>${subjectTypeMap[subject.type]}</td>
    </tr>
  `).join('');
}

function setupAddSubjectForm() {
  const form = document.getElementById('addSubjectForm') as HTMLFormElement | null;
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const subjectNameInput = document.getElementById('subjectName') as HTMLInputElement;
    const subjectTypeSelect = document.getElementById('subjectType') as HTMLSelectElement;

    const name = subjectNameInput.value;
    const type = subjectTypeSelect.value as SubjectType;

    const payload = { name, type: type };

    try {
      const response = await fetch('http://localhost:4000/api/subjects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.success) {
        alert('Предмет успішно додано');
        form.reset();
        fetchSubjectsAndRender();
      } else {
        alert('Не вдалося додати предмет: ' + (result.message || 'Невідома помилка'));
      }
    } catch (error) {
      alert('Помилка при додаванні предмета: ' + (error as Error).message);
    }
  });
}

const subjectTypeMap: Record<string, string> = {
  [SubjectType.Lecture]: "Лекція",
  [SubjectType.Practice]: "Лабораторна"
};