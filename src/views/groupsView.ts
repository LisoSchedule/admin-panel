export function renderGroupsView(container: HTMLElement) {
  container.innerHTML = `
    <div class="content-wrapper">
      <section class="table-section">
        <h2>Список груп</h2>
        <table>
          <thead>
            <tr>
              <th>Назва групи</th>
              <th>Підгрупа</th>
            </tr>
          </thead>
          <tbody id="groupsTableBody">
            
          </tbody>
        </table>
      </section>

      <section class="form-section">
        <h2>Додати групу</h2>
        <form id="addGroupForm">
          <label for="groupName">Назва групи</label>
          <input type="text" id="groupName" placeholder="Введіть назву групи" required />
          <label for="subgroup">Підгрупа</label>
          <input type="text" id="subgroup" placeholder="Введіть підгрупу (необов'язково)" />
          <button type="submit">Додати групу</button>
        </form>
      </aside>
    </div>
  `;
}
