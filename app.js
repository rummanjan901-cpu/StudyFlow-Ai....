/**
 * AI Study Dashboard Logic
 * Modular script for Quiz, To-Do, and Habit Tracking
 */

document.addEventListener('DOMContentLoaded', () => {
    initTodoSystem();
    initHabitTracker();
    initQuizSystem();
});

// --- 1. QUIZ SYSTEM ---
const initQuizSystem = () => {
    const quizData = [
        { q: "Which organelle is the powerhouse of the cell?", a: ["Nucleus", "Ribosome", "Mitochondria", "Vacuole"], correct: 2 },
        { q: "What is the chemical symbol for Gold?", a: ["Ag", "Au", "Gd", "Go"], correct: 1 }
    ];

    let currentIdx = 0;
    const container = document.querySelector('#quiz-container'); // Ensure your HTML has this ID

    const renderQuestion = () => {
        if (currentIdx >= quizData.length) {
            container.innerHTML = "<h3>Quiz Complete! 🧠</h3>";
            return;
        }

        const data = quizData[currentIdx];
        container.innerHTML = `
            <p class="quiz-question">${data.q}</p>
            <div class="quiz-options">
                ${data.a.map((opt, i) => `<button class="opt-btn" onclick="checkAnswer(${i})">${opt}</button>`).join('')}
            </div>
            <button id="next-quiz-btn" style="display:none;" class="btn-premium">Next Question</button>
        `;
    };

    window.checkAnswer = (selected) => {
        const data = quizData[currentIdx];
        const buttons = document.querySelectorAll('.opt-btn');
        const nextBtn = document.querySelector('#next-quiz-btn');

        buttons.forEach((btn, i) => {
            btn.disabled = true;
            if (i === data.correct) btn.style.background = "#2ecc71"; // Green
            else if (i === selected) btn.style.background = "#e74c3c"; // Red
        });

        if (selected === data.correct) {
            setTimeout(() => { currentIdx++; renderQuestion(); }, 1200);
        } else {
            nextBtn.style.display = "block";
            nextBtn.onclick = () => { currentIdx++; renderQuestion(); };
        }
    };

    renderQuestion();
};

// --- 2. TO-DO LIST (Local Storage) ---
const initTodoSystem = () => {
    const todoInput = document.querySelector('#todo-input');
    const todoList = document.querySelector('#todo-list');
    let tasks = JSON.parse(localStorage.getItem('study_tasks')) || [];

    const saveAndRender = () => {
        localStorage.setItem('study_tasks', JSON.stringify(tasks));
        todoList.innerHTML = tasks.map((t, i) => `
            <div class="list-item">
                <span style="${t.done ? 'text-decoration: line-through; opacity: 0.5' : ''}">${t.text}</span>
                <input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggleTask(${i})">
            </div>
        `).join('');
    };

    window.addTask = () => {
        if (!todoInput.value) return;
        tasks.push({ text: todoInput.value, done: false });
        todoInput.value = '';
        saveAndRender();
    };

    window.toggleTask = (index) => {
        tasks[index].done = !tasks[index].done;
        saveAndRender();
    };

    saveAndRender();
};

// --- 3. HABIT TRACKER ---
const initHabitTracker = () => {
    const habitList = document.querySelector('#habit-list');
    let habits = JSON.parse(localStorage.getItem('study_habits')) || [
        { name: "Deep Work", streak: 5, lastDone: null }
    ];

    const renderHabits = () => {
        habitList.innerHTML = habits.map((h, i) => `
            <div class="list-item">
                <span>${h.name}</span>
                <div style="display:flex; align-items:center; gap:10px;">
                    <span class="streak-count"><i class="fas fa-fire"></i> ${h.streak}</span>
                    <button class="btn-premium" style="padding: 5px 10px; font-size: 0.7rem;" onclick="completeHabit(${i})">Done</button>
                </div>
            </div>
        `).join('');
    };

    window.completeHabit = (index) => {
        const habit = habits[index];
        const today = new Date().toDateString();

        if (habit.lastDone !== today) {
            habit.streak++;
            habit.lastDone = today;
            localStorage.setItem('study_habits', JSON.stringify(habits));
            renderHabits();
        } else {
            alert("Already logged for today! Keep it up.");
        }
    };

    renderHabits();
};
