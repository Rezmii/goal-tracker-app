import uuid from "react-native-uuid";

export default class TimeGoal {
  constructor(title, description, deadline, timePeriod) {
    this.id = uuid.v4();
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.timePeriod = timePeriod;
    this.done = false;
  }
}
