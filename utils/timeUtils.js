import moment from "moment";

const manualStartDate = moment("2024-09-24", "YYYY-MM-DD");

// Funkcja obliczająca ile czasu pozostało
export const getTimeRemaining = (timePeriod) => {
  const now = manualStartDate; // Użyj ręcznie ustalonej daty
  let end;

  switch (timePeriod) {
    case "week":
      end = moment(manualStartDate).add(1, "week"); // Dokładnie tydzień od ręcznej daty
      break;
    case "month":
      end = moment(manualStartDate).add(1, "month"); // Dokładnie miesiąc od ręcznej daty
      break;
    case "quarter":
      end = moment(manualStartDate).add(3, "months"); // Dokładnie 3 miesiące od ręcznej daty
      break;
    case "year":
      end = moment(manualStartDate).add(1, "year"); // Dokładnie rok od ręcznej daty
      break;
    case "threeYears":
      end = moment(manualStartDate).add(3, "years"); // Dokładnie 3 lata od ręcznej daty
      break;
    default:
      return "Nieznany okres";
  }

  const totalDays = end.diff(now, "days"); // Całkowita liczba dni do końca okresu
  const totalMonths = end.diff(now, "months"); // Całkowita liczba miesięcy do końca okresu
  const totalYears = end.diff(now, "years"); // Całkowita liczba lat do końca okresu

  // Oblicz pozostałe dni, miesiące i lata
  const yearsRemaining = totalYears;
  const monthsRemaining = totalMonths - yearsRemaining * 12; // Pozostałe miesiące po odjęciu lat
  const daysRemaining = totalDays - totalMonths * 30; // Przybliżone dni na podstawie miesięcy

  const parts = [];

  // Dodawaj tylko największą część, która jest większa od zera
  if (yearsRemaining > 0) {
    parts.push(`${yearsRemaining} ${yearsRemaining === 1 ? "rok" : "lata"}`);
  } else if (monthsRemaining > 0) {
    parts.push(
      `${monthsRemaining} ${monthsRemaining === 1 ? "miesiąc" : "miesięcy"}`
    );
  } else if (daysRemaining > 0) {
    parts.push(`${daysRemaining} ${daysRemaining === 1 ? "dzień" : "dni"}`);
  }

  // Obsłuż przypadek, gdy nic nie pozostało
  return parts.length > 0 ? parts.join(" i ") : "Koniec okresu";
};
