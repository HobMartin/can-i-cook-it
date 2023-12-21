import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/uk";

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.locale("uk");

const HOUR_TO_SECONDS = 3600;
const MINUTE_TO_SECONDS = 60;
const SECOND_TO_MILLISECONDS = 1000;
export const getDuration = (hours: number, minutes: number) => {
  return (
    (hours * HOUR_TO_SECONDS + minutes * MINUTE_TO_SECONDS) *
    SECOND_TO_MILLISECONDS
  );
};

export const durationToDate = (duration: number) => {
  const dayjsDuration = dayjs.duration(duration);
  const hours = dayjsDuration.hours();
  const minutes = dayjsDuration.minutes();
  const date = dayjs().set("hours", hours).set("minutes", minutes).toDate();
  console.log(date);

  return date;
};

export const getTimeToCook = (durationTime: number) => {
  const result: [string, string] = ["", ""];

  const duration = dayjs.duration(durationTime);
  console.log(duration.toISOString());

  const hours = duration.hours();
  const minutes = duration.minutes();

  if (hours > 0) {
    const humanizeHours = dayjs.duration(hours, "hours").humanize();
    result[0] = hours === 1 ? `${hours} ${humanizeHours}` : humanizeHours;
    if (hours > 21) {
      const humanizeHours = dayjs
        .duration(hours - 20, "hours")
        .humanize()
        .split(" ")[1];

      result[0] = `${hours} ${humanizeHours}`;
    }
  }

  if (minutes > 0) {
    const humanizeMinutes = dayjs.duration(minutes, "minutes").humanize();
    result[1] =
      minutes === 1 ? `${minutes} ${humanizeMinutes}` : humanizeMinutes;
    if (minutes > 44) {
      const subMinutes = Math.floor(minutes / 10) * 10;
      const humanizeMinutes = dayjs
        .duration(minutes - subMinutes, "minutes")
        .humanize()
        .split(" ");
      result[1] = `${minutes} ${humanizeMinutes[1] ?? humanizeMinutes[0]}`;
    }
  }

  return { text: result.join(" "), duration: durationTime };
};
