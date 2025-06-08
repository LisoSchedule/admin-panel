export function renderLessonsReccurrencesView(container: HTMLElement) {
    container.innerHTML = `
    <div class="content-wrapper">
      <section class="table-section">
        <h2>Список повторень занять</h2>
        <table>
          <thead>
            <tr>
              <th>Предмет</th>
              <th>Тип повторення</th>
              <th>Кількість повторень</th>
              <th>Дата початку</th>
              <th>Дата закінчення</th>
            </tr>
          </thead>
          <tbody id="reccurrences-table-body">
            
          </tbody>
        </table>
      </section>

      <section class="form-section">
        <h2>Додати повторення занять</h2>
        <form id="addReccurrenceForm">
          <label for="subjectName">Пара</label>
          <select id="subjectName" required>
            <option value="" disabled selected>Оберіть пару</option>
            <option value="лекція">ООАП</option>
            <option value="семінар">Машинне навчання</option>
            <option value="практичне">Андроїд</option>
          </select>

          <label for="repeatType">Повторювати</label>
          <select id="repeatType" required>
            <option value="" disabled selected>Оберіть повторюваність</option>
            <option value="лекція">Щоденно</option>
            <option value="семінар">Щотижня</option>
            <option value="практичне">Щомісяця</option>
          </select>

          <label for="repeatValue">Кількість повторень</label>
          <input type="text" id="repeatValue" placeholder="Введіть кількість повторень" required />

          <label for="startDate">Дата початку</label>
          <input type="date" id="startDate" placeholder="Введіть дату початку" required />

          <label for="endDate">Дата закінчення</label>
          <input type="date" id="endDate" placeholder="Введіть дату закінчення" required />

          <button type="submit">Додати заняття</button>
        </form>
    `;
}