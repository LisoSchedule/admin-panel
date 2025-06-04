export function renderLessonsView(container: HTMLElement) {
  container.innerHTML = `
    <h2>Додати заняття</h2>
    <form id="addLessonForm">
      <label for="subjectName">Предмет</label>
      <select id="subjectName" required>
        <option value="" disabled selected>Оберіть предмет</option>
        <option value="лекція">ООАП</option>
        <option value="семінар">Машинне навчання</option>
        <option value="практичне">Андроїд</option>
      </select>
      <label for="classroom">Аудиторія</label>
      <select id="classroom" required>
        <option value="" disabled selected>Оберіть аудиторію</option>
        <option value="лекція">4</option>
        <option value="семінар">6</option>
        <option value="практичне">47</option>
      </select>
      <label for="groupName">Група</label>
      <select id="groupName" required>
        <option value="" disabled selected>Оберіть групу</option>
        <option value="лекція">КН-31</option>
        <option value="семінар">Кн-32</option>
      </select>
      <label for="teacherName">Викладач</label>
      <select id="teacherName" required>
        <option value="" disabled selected>Оберіть викладача</option>
        <option value="асистент">Волинець Євген Олегович</option>
        <option value="старший викладач">Сало Микола Федорович</option>
        <option value="доцент">Опришко Мар'ян Іванович</option>
      </select>
        <label for="startTime">Час початку</label>
        <input type="time" id="startTime" placeholder="Введіть час початку" required />
        <label for="duration">Тривалість</label>
        <input type="number" id="duration" placeholder="Тривалість заняття (хв)" required />
      <button type="submit">Додати заняття</button>
    </form>
  `;
}