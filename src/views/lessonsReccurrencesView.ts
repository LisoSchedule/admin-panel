export function renderLessonsReccurrencesView(container: HTMLElement) {
    container.innerHTML = `
    <h2>Додати повторення занять</h2>
    <form id="addReccurrenceForm">
      <label for="subjectName">Предмет</label>
      <select id="subjectName" required>
        <option value="" disabled selected>Оберіть предмет</option>
        <option value="лекція">ООАП</option>
        <option value="семінар">Машинне навчання</option>
        <option value="практичне">Андроїд</option>
      </select>
      <label for="repeatType">Повторювати</label>
      <select id="repeatType" required>
        <option value="" disabled selected></option>
        <option value="лекція">Щоденно</option>
        <option value="семінар">Щотижня</option>
        <option value="практичне">Щомісяця</option>
      </select>
        <label for="startDate">Дата початку</label>
        <input type="date" id="startDate" placeholder="Введіть дату початку" required />
        <label for="endDate">Дата закінчення</label>
        <input type="date" id="endDate" placeholder="Введіть дату закінчення" required />
    <button type="submit">Додати заняття</button>
    </form>
    `;
}