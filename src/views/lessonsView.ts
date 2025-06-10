import { SubjectType } from '../enums/subjectType.js';

export function renderLessonsView(container: HTMLElement) {
  container.innerHTML = `
  <div class="lessons-view">
    <section class="table-section">
      <h2>Список занять</h2>
      <table>
        <thead>
          <tr>
            <th>Предмет</th>
            <th>Аудиторія</th>
            <th>Група</th>
            <th>Викладач</th>
            <th>Час початку</th>
            <th>Тривалість (хв)</th>
          </tr>
        </thead>
        <tbody id="lessonsTableBody"></tbody>
      </table>
    </section>

    <section class="form-section">
      <h2>Додати заняття</h2>
      <form id="addLessonForm">
        <label for="subjectName">Предмет</label>
        <select id="subjectName" required>
          <option value="" disabled selected>Оберіть предмет</option>
        </select>

        <label for="classroom">Аудиторія</label>
        <select id="classroom" required>
          <option value="" disabled selected>Оберіть аудиторію</option>
        </select>

        <label for="groupName">Група</label>
        <select id="groupName" required>
          <option value="" disabled selected>Оберіть групу</option>
        </select>
        
        <label for="teacherName">Викладач</label>
        <select id="teacherName" required>
          <option value="" disabled selected>Оберіть викладача</option>
        </select>

        <label for="startTime">Час початку</label>
        <input type="time" id="startTime" placeholder="Введіть час початку" required />

        <label for="duration">Тривалість</label>
        <input type="text" id="duration" placeholder="Тривалість заняття (хв)" required />
        
        <button type="submit">Додати заняття</button>
      </form>
    </section>
  </div>
  `;

  fetchAndRenderLessons();
  setupLessonForm();
}

const subjectTypeMap: Record<string, string> = {
  [SubjectType.Lecture]: "Лекція",
  [SubjectType.Practice]: "Лабораторна"
};

async function fetchAndRenderLessons() {
  const lessonsRes = await fetch('http://localhost:4000/api/lessons');
  const lessonsData = await lessonsRes.json();

  const tbody = document.getElementById('lessonsTableBody');
  if (!tbody) return;

  tbody.innerHTML = (lessonsData.data ?? []).map((lesson: any) => {
    const subject = lesson.subject;
    const teacher = lesson.teacher;
    const audience = lesson.audience;
    const group = lesson.group;

    const subjectDisplay = subject
      ? `${subject.name} (${subjectTypeMap[subject.type] ?? subject.type})`
      : '-';

    const teacherDisplay = teacher
      ? teacher.name
      : '-';

    const audienceDisplay = audience
      ? audience.name
      : '-';

    const groupDisplay = group
      ? group.name
      : '-';

    return `
      <tr>
        <td>${subjectDisplay}</td>
        <td>${audienceDisplay}</td>
        <td>${groupDisplay}</td>
        <td>${teacherDisplay}</td>
        <td>${formatTime(lesson.startTime)}</td>
        <td>${lesson.duration}</td>
      </tr>
    `;
  }).join('');
}

function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.getUTCHours().toString().padStart(2, '0') + ':' + date.getUTCMinutes().toString().padStart(2, '0');
}

async function setupLessonForm() {
  
  const [
    subjectsRes,
    audiencesRes,
    groupsRes,
    teachersRes
  ] = await Promise.all([
    fetch('http://localhost:4000/api/subjects'),
    fetch('http://localhost:4000/api/audiences'),
    fetch('http://localhost:4000/api/groups'),
    fetch('http://localhost:4000/api/teachers'),
  ]);

  const [subjectsData, audiencesData, groupsData, teachersData] = await Promise.all([
    subjectsRes.json(),
    audiencesRes.json(),
    groupsRes.json(),
    teachersRes.json()
  ]);

  const subjectSelect = document.getElementById('subjectName') as HTMLSelectElement | null;
  const audienceSelect = document.getElementById('classroom') as HTMLSelectElement | null;
  const groupSelect = document.getElementById('groupName') as HTMLSelectElement | null;
  const teacherSelect = document.getElementById('teacherName') as HTMLSelectElement | null;

  if (subjectSelect) {
    subjectSelect.innerHTML = '<option value="" disabled selected>Оберіть предмет</option>' +
      (subjectsData.data ?? []).map((s: any) => 
        `<option value="${s.id}">${s.name} (${subjectTypeMap[s.type] ?? s.type})</option>`
      ).join('');
  }
  if (audienceSelect) {
    audienceSelect.innerHTML = '<option value="" disabled selected>Оберіть аудиторію</option>' +
      (audiencesData.data ?? []).map((a: any) => 
        `<option value="${a.id}">${a.name}</option>`
      ).join('');
  }
  if (groupSelect) {
    groupSelect.innerHTML = '<option value="" disabled selected>Оберіть групу</option>' +
      (groupsData.data ?? []).map((g: any) => 
        `<option value="${g.id}">${g.name}</option>`
      ).join('');
  }
  if (teacherSelect) {
    teacherSelect.innerHTML = '<option value="" disabled selected>Оберіть викладача</option>' +
      (teachersData.data ?? []).map((t: any) => 
        `<option value="${t.id}">${t.name}</option>`
      ).join('');
  }

  const form = document.getElementById('addLessonForm') as HTMLFormElement | null;
  if (!form) return;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!subjectSelect || !audienceSelect || !groupSelect || !teacherSelect) return;

    const subjectId = Number(subjectSelect.value);
    const audienceId = Number(audienceSelect.value);
    const groupId = Number(groupSelect.value);
    const teacherId = Number(teacherSelect.value);

    const startTimeInput = document.getElementById('startTime') as HTMLInputElement | null;
    const durationInput = document.getElementById('duration') as HTMLInputElement | null;
    if (!startTimeInput || !durationInput) return;

    
    const today = new Date();
    const [hours, minutes] = startTimeInput.value.split(':').map(Number);
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);
    const startTime = startDate.toISOString();

    const duration = Number(durationInput.value);

    try {
      const response = await fetch('http://localhost:4000/api/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectId,
          audienceId,
          groupId,
          teacherId,
          startTime,
          duration
        })
      });
      const result = await response.json();
      if (result.success) {
        alert('Заняття додано');
        await fetchAndRenderLessons();
        form.reset();
        
        if (subjectSelect) subjectSelect.selectedIndex = 0;
        if (audienceSelect) audienceSelect.selectedIndex = 0;
        if (groupSelect) groupSelect.selectedIndex = 0;
        if (teacherSelect) teacherSelect.selectedIndex = 0;
        if (startTimeInput) startTimeInput.value = '';
        if (durationInput) durationInput.value = '';
      } else {
        alert('Не вдалося додати заняття: ' + (result.message || 'Невідома помилка'));
      }
    } catch (e) {
      alert('Помилка при додаванні заняття');
    }
  });
}