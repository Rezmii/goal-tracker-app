export default class TimeGoal {
  constructor(title, description, deadline, progress, timePeriod) {
    this.title = title; // Tytuł celu
    this.description = description; // Krótki opis
    this.deadline = deadline; // Termin zakończenia
    this.progress = progress; // Postęp (w %)
    this.timePeriod = timePeriod;
  }
}
