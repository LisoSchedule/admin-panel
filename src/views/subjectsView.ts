export function renderSubjectsView(container: HTMLElement) {
  container.innerHTML = `
    <h2>Додати предмет</h2>
    <form id="addSubjectForm">
      <label for="subjectName">Назва предмету</label>
      <input type="text" id="subjectName" placeholder="Введіть назву предмету" required />
      <label for="subjectType">Тип предмету</label>
      <select id="subjectType" required>
        <option value="" disabled selected>Оберіть тип</option>
        <option value="лекція">Лекція</option>
        <option value="лабораторна">Лабораторна</option>
      </select>
      <button type="submit">Додати предмет</button>
    </form>
  `;
}