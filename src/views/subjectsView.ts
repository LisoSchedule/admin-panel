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
          <tbody id="subjects-table-body"></tbody>
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
            <option value="лекція">Лекція</option>
            <option value="лабораторна">Лабораторна</option>
          </select>
          
          <button type="submit">Додати предмет</button>
        </form>
      </section>
    </div>
  `;
}