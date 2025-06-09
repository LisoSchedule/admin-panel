export function renderClassroomsView(container: HTMLElement) {
  container.innerHTML = `

  <div class="content-wrapper">
    <section class="table-section">
      <h2>Список аудиторій</h2>
      <table>
        <thead>
          <tr>
            <th>Навчальний корпус</th>
            <th>Номер аудиторії</th>
          </tr>
        </thead>
        <tbody id="classrooms-table-body">

        </tbody>
      </table>
    </section>

    <section class="form-section">
      <h2>Додати аудиторію</h2>
      <form id="addClassroomForm">
        <label for="hull">Навчальний корпус</label>
        <input type="text" id="classroomName" placeholder="Введіть навчальний корпус" required />

        <label for="roomNumber">Номер аудиторії</label>
        <input type="text" id="roomNumber" placeholder="Введіть номер аудиторії" required />

        <button type="submit">Додати аудиторію</button>
      </form>
    </section>
  </div>
  `;
}