import { Teacher } from "../types/teacher";
import { TeacherPosition } from "../enums/teacherPosition.js";

export function renderTeachersView(container: HTMLElement) {
  container.innerHTML = `
  <div class="content-wrapper">
    <section class="table-section">
      <h2>Список викладачів</h2>
      <table>
        <thead>
          <tr>
            <th>Ім'я викладача</th>
            <th>Посада</th>
          </tr>
        </thead>
        <tbody id="teachersTableBody"></tbody>
      </table>
    </section>

    <section class="form-section">
      <h2>Додати викладача</h2>
      <form id="addTeacherForm">
        <label for="teacherName">Ім'я викладача</label>
        <input type="text" id="teacherName" placeholder="Введіть ПІБ викладача" required />

        <label for="teacherPosition">Посада викладача</label>
        <select id="teacherPosition" required>
          <option value="" disabled selected>Оберіть посаду</option>
          <option value="Assistant">Асистент</option>
          <option value="SeniorLecturer">Старший викладач</option>
          <option value="AssosiateProfessor">Доцент</option>
          <option value="Professor">Професор</option>
          <option value="DepartmentProfessor">Професор кафедри</option>
        </select>
        <button type="submit">Додати</button>
      </form>
    </section>
  </div>
  `;

  fetchTeachersAndRender();
  setupAddTeacherForm();
}

async function fetchTeachersAndRender() {
  try {
    const response = await fetch('http://localhost:4000/api/teachers');
    const result = await response.json();
    if (result.success && Array.isArray(result.data)) {
      renderTeacherTable(result.data);
    } else {
      renderTeacherTable([]);
      alert('Не вдалося завантажити викладачів');
    }
  } catch (error) {
    renderTeacherTable([]);
    alert('Помилка при завантаженні викладачів');
  }
}

function renderTeacherTable(teachers: Teacher[]) {
  const tbody = document.getElementById('teachersTableBody');
  if (!tbody) return;

  tbody.innerHTML = teachers.map(teacher => `
    <tr>
      <td>${teacher.name}</td>
      <td>${teacherTypesMap[teacher.position]}</td>
    </tr>
  `).join('');
}

function setupAddTeacherForm() {
  const form = document.getElementById('addTeacherForm') as HTMLFormElement;
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const teacherNameInput = document.getElementById('teacherName') as HTMLInputElement;
    const teacherPositionSelect = document.getElementById('teacherPosition') as HTMLSelectElement;

    const payload = {
      name: teacherNameInput.value,
      position: teacherPositionSelect.value as TeacherPosition
    };

    try {
      const response = await fetch('http://localhost:4000/api/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.success) {
        alert('Викладача успішно додано');
        teacherNameInput.value = '';
        teacherPositionSelect.value = '';
        teacherPositionSelect.selectedIndex = 0;
        fetchTeachersAndRender();
      } else {
        alert('Не вдалося додати викладача');
      }
    } catch (error) {
      alert('Помилка при додаванні викладача');
    }

   }); 
}

const teacherTypesMap: Record<string, string> = {
  [TeacherPosition.Assistant]: 'Асистент',
  [TeacherPosition.SeniorLecturer]: 'Старший викладач',
  [TeacherPosition.AssociateProfessor]: 'Доцент',
  [TeacherPosition.Professor]: 'Професор',
  [TeacherPosition.DepartmentProfessor]: 'Професор кафедри'
};