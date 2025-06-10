import { renderGroupsView } from './views/groupsView.js';
import { renderSubjectsView } from './views/subjectsView.js';
import { renderAudiencesView } from './views/audiencesView.js';
import { renderTeachersView } from './views/teachersView.js';
import { renderLessonsView } from './views/lessonsView.js';
import { renderLessonsReccurrencesView } from './views/lessonsReccurrencesView.js';

window.addEventListener('DOMContentLoaded', () => {
  
  document.body.innerHTML = `
    <div style="display: flex; height: 100vh; font-family: sans-serif;">
      <nav style="width: 130px; background-color: #f0f0f0; padding: 1rem; box-shadow: 2px 0 5px rgba(0,0,0,0.1);">
        <ul style="list-style: none; padding: 0;">
          <li><button id="groupsBtn" style="width: 100%; padding: 0.5rem;">Групи</button></li>
          <li><button id="subjectsBtn" style="width: 100%; padding: 0.5rem;">Предмети</button></li>
          <li><button id="classroomsBtn" style="width: 100%; padding: 0.5rem;">Аудиторії</button></li>
          <li><button id="teachersBtn" style="width: 100%; padding: 0.5rem;">Викладачі</button></li>
          <li><button id="lessonsBtn" style="width: 100%; padding: 0.5rem;">Пари</button></li>
          <li><button id="lessonsReccurrencesBtn" style="width: 100%; padding: 0.5rem;">Повторення пар</button></li>
        </ul>
      </nav>
      <main id="mainContent" style="flex-grow: 1; padding: 2rem;"></main>
    </div>
  `;

  const mainContent = document.getElementById('mainContent')!;

  document.getElementById('groupsBtn')!.addEventListener('click', () => {
    renderGroupsView(mainContent);
  });

  document.getElementById('subjectsBtn')!.addEventListener('click', () => {
    renderSubjectsView(mainContent);
  });

  document.getElementById('classroomsBtn')!.addEventListener('click', () => {
    renderAudiencesView(mainContent);
  });

  document.getElementById('teachersBtn')!.addEventListener('click', () => {
    renderTeachersView(mainContent);
  });

  document.getElementById('lessonsBtn')!.addEventListener('click', () => {
    renderLessonsView(mainContent);
  });

  document.getElementById('lessonsReccurrencesBtn')!.addEventListener('click', () => {
    renderLessonsReccurrencesView(mainContent);
  });

  renderGroupsView(mainContent);
});
