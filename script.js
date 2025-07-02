document.addEventListener('DOMContentLoaded', () => {
  // --- SIGNUP ---
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('signupEmail').value.trim();
      const password = document.getElementById('signupPassword').value.trim();

      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.push({ email, password });
      localStorage.setItem('users', JSON.stringify(users));

      // Redirection
      localStorage.setItem('loggedInUser', JSON.stringify({ email }));
      window.location.href = "dashboard.html";
    });
  }

  // --- LOGIN ---
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value.trim();

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const found = users.find(u => u.email === email && u.password === password);

      if (found) {
        localStorage.setItem('loggedInUser', JSON.stringify(found));
        window.location.href = "dashboard.html";
      } else {
        alert("Email ou mot de passe incorrect");
      }
    });
  }

  // --- DASHBOARD ---
  const defaultExos = ["Pompes", "Squats", "Abdos", "Fentes", "Burpees"];
  const defaultContainer = document.getElementById('defaultExercises');
  if (defaultContainer) {
    defaultExos.forEach(ex => {
      const li = document.createElement('li');
      li.textContent = ex;
      defaultContainer.appendChild(li);
    });
  }

  const exerciseForm = document.getElementById('exerciseForm');
  const exerciseInput = document.getElementById('exerciseName');
  const exerciseList = document.getElementById('exerciseList');

  const savedExos = JSON.parse(localStorage.getItem('exercises')) || [];
  savedExos.forEach(ex => {
    const li = document.createElement('li');
    li.textContent = ex;
    exerciseList.appendChild(li);
  });

  if (exerciseForm) {
    exerciseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = exerciseInput.value.trim();
      if (name) {
        const li = document.createElement('li');
        li.textContent = name;
        exerciseList.appendChild(li);
        savedExos.push(name);
        localStorage.setItem('exercises', JSON.stringify(savedExos));
        exerciseInput.value = '';
      }
    });
  }
});
