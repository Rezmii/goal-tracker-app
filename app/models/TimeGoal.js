import uuid from "react-native-uuid";

export default class TimeGoal {
  constructor(title, description, endDate, timePeriod, priority = false) {
    this.id = uuid.v4();
    this.title = title;
    this.description = description;
    this.endDate = endDate;
    this.timePeriod = timePeriod;
    this.done = false;
    this.priority = priority;
  }
}
