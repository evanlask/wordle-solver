import { solutions } from './dictionary';

const DAY_IN_MILISECONDS = 86400000;
const EPOCH = new Date(2021, 5, 19, 0, 0, 0, 0); // If Wordle changes this date I pulled from their built JS everything stops working

// Calculates the number of days between two provided dates
function daysBetween(dateOne, dateTwo) {
  const dateOneAtMidnight = new Date(dateOne).setHours(0, 0, 0, 0);
  const dateTwoAtMidnight = new Date(dateTwo).setHours(0, 0, 0, 0);

  const deltaInMS = dateTwoAtMidnight - dateOneAtMidnight;

  return Math.round(deltaInMS / DAY_IN_MILISECONDS);
}

// Calculates the number of days from epoch to the provided date
function daysFromEpoch(date) {
  return daysBetween(EPOCH, date);
}

// Get a solution for the provided date
function solutionForDate(date) {
  const days = daysFromEpoch(date);
  const index = days % solutions.length;

  return solutions[index];
}

// Render a weeks of solutions to Wordle
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long'
});

document.write(
  '<h1>Weekly <a target="_blank" href="https://www.powerlanguage.co.uk/wordle/">Wordle</a> Solutions</h1>'
);

for (let i = 0; i < 7; i++) {
  const date = new Date(Date.now() + DAY_IN_MILISECONDS * i);
  const day = dateFormatter.format(date);
  const solution = solutionForDate(date);

  document.write(`
    <div class="result">
      <h2 class="day">${day}</h2>
      <p class="solution">${solution.toUpperCase()}</p>
    </div>
  `);
}
