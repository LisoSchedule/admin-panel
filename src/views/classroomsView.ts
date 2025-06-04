export function renderClassroomsView(container: HTMLElement) {
  container.innerHTML = `
    <h2>Додати аудиторію</h2>
    <form id="addClassroomForm">
      <label for="hull">Навчальний корпус</label>
      <input type="text" id="classroomName" placeholder="Введіть навчальний корпус" required />
      <label for="roomNumber">Номер аудиторії</label>
      <input type="text" id="roomNumber" placeholder="Введіть номер аудиторії" required />
      <button type="submit">Додати аудиторію</button>
    </form>
  `;
}