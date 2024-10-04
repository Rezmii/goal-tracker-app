import moment from "moment";

const manualStartDate = moment("2024-09-24", "YYYY-MM-DD");

export const getTimeRemaining = (timePeriod) => {
  const now = moment(); // Używaj aktualnej daty, nie manualStartDate
  let end;

  switch (timePeriod) {
    case "week":
      end = moment(manualStartDate).add(1, "week");
      break;
    case "month":
      end = moment(manualStartDate).add(1, "month");
      break;
    case "quarter":
      end = moment(manualStartDate).add(3, "months");
      break;
    case "year":
      end = moment(manualStartDate).add(1, "year");
      break;
    case "threeYears":
      end = moment(manualStartDate).add(3, "years");
      break;
    default:
      return "Nieznany okres";
  }

  const duration = moment.duration(end.diff(now)); // Różnica pomiędzy teraz a końcem

  const yearsRemaining = duration.years();
  const monthsRemaining = duration.months();
  const daysRemaining = duration.days();

  const parts = [];

  if (yearsRemaining > 0) {
    parts.push(`${yearsRemaining} ${yearsRemaining === 1 ? "rok" : "lata"}`);
  }
  if (monthsRemaining > 0) {
    parts.push(
      `${monthsRemaining} ${monthsRemaining === 1 ? "miesiąc" : "miesięcy"}`
    );
  }
  if (daysRemaining > 0) {
    parts.push(`${daysRemaining} ${daysRemaining === 1 ? "dzień" : "dni"}`);
  }

  return parts.length > 0 ? parts.join(" i ") : "Koniec okresu";
};
