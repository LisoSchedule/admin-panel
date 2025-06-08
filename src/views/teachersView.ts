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
        <tbody id="teachers-table-body">
          
        </tbody>
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
          <option value="асистент">Асистент</option>
          <option value="старший викладач">Старший викладач</option>
          <option value="доцент">Доцент</option>
          <option value="професор">Професор</option>
        </select>
        <button type="submit">Додати</button>
      </form>
    </section>
  </div>
  `;
}