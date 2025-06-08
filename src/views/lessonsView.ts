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
        <tbody id="lessons-table-body">
          
        </tbody>
      </table>
    </section>

    <section class="form-section">
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
          <option value="">КН-31</option>
          <option value="">Кн-32</option>
        </select>
        
        <label for="teacherName">Викладач</label>
        <select id="teacherName" required>
          <option value="" disabled selected>Оберіть викладача</option>
          <option value="">Волинець Євген Олегович</option>
          <option value="">Сало Микола Федорович</option>
          <option value="">Опришко Мар'ян Іванович</option>
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
}