export function renderGroupsView(container: HTMLElement) {
  container.innerHTML = `
      <h2>Додати групу</h2>
      <form id="addGroupForm">
        <label for="groupName">Назва групи</label>
        <input type="text" id="groupName" placeholder="Введіть назву групи" required />
        <label for="subgroup">Підгрупа</label>
        <input type="text" id="subgroup" placeholder="Введіть підгрупу (необов'язково)" />
        <button type="submit">Додати групу</button>
      </form>
  `;
}