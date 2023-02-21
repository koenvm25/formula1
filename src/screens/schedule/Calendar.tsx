import { useEffect, useState } from "react";
import { Spinner} from "react-bootstrap";
import { getCalendar } from "../../api/endpoints";
import { RoundCard } from "../../components/schedule/RoundCard";
import { SeasonSelector } from "../../components/SeasonSelector";
import { RaceTable } from "../../domain/calendar";
import "./Calendar.scss";

export const Calendar = () => {
  const currentYear = new Date().getFullYear();
  const [season, setSeason] = useState<number>(currentYear);
  const [calendar, setCalendar] = useState<RaceTable>();
  useEffect(() => {
    getCalendar(season).then((response) => {
      console.log(response.data.MRData);
      setCalendar(response.data.MRData.RaceTable);
    });
  }, [season]);

  return (
    <div>
      <SeasonSelector setSeason={setSeason} season={season} />
      <div className="race-card-container">
        {!!calendar ? (
          calendar.Races.map((race) => (
            <RoundCard key={race.round} race={race} />
          ))
        ) : (
          <Spinner animation="grow" />
        )}
      </div>
    </div>
  );
};
