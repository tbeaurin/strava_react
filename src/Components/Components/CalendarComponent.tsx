import React, {
  useEffect,
  useRef,
  useState,
  MutableRefObject,
} from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import FullCalendar, { DatesSetArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import frLocale from '@fullcalendar/core/locales/fr';
import { withStyles, Theme } from '@material-ui/core/styles';
import { isArray } from 'lodash';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { activitiesData } from '../../Models/activities';
import NetworkUrls from '../../Services/NetworkUrls';
import { get } from '../../Services/api';
import Constants from '../../Resources/Constants/Constants';
import '../../Resources/custom.css';

moment.locale('fr');

const styles = (theme: Theme) => ({
  calendar: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.secondary,
    borderColor: 'red',
  },
  container: {
    color: 'red',
    width: '80%',
  },
  datePicker: {
    display: 'none',
  },
  dayCell: {
    '& .fc-daygrid-day-frame': {
      display: 'flex',
      flexDirection: 'column-reverse' as const,
    },
  },
  event: {
    border: 'none',
  },
});

type Props = {
  classes: {
    container: string;
    calendar: string;
    datePicker: string;
    dayCell: string;
    event: string;
  };
};

const CalendarComponent = ({ classes }: Props): JSX.Element => {
  const [activities, setActivities] = useState<activitiesData>([]);
  const [startDate, setStartDate] = useState<number>();
  const [endDate, setEndDate] = useState<number>();
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(
    false
  );

  const calendar = useRef() as MutableRefObject<FullCalendar>;

  const getActivities = async () => {
    const path = `${
      NetworkUrls.getActivities
    }?access_token=${localStorage.getItem(
      'access_token'
    )}&before=${endDate}&after=${startDate}`;
    const getActivitiesResponse = await get({ path });
    setActivities(getActivitiesResponse);
  };

  const goToDate = () => {
    const calendarApi = calendar.current.getApi();
    const day = new Date().getDay();
    const newDate = new Date(currentYear, currentMonth, day);
    calendarApi.gotoDate(newDate);
  };

  useEffect(() => {
    startDate && getActivities();
  }, [startDate]);

  useEffect(() => {
    goToDate();
  }, [currentYear, currentMonth]);

  const formatActivities = () => {
    const runs =
      activities && isArray(activities)
        ? activities.map(activity => {
            const type =
              activity.type !== 'Run' &&
              activity.type !== 'Swim' &&
              activity.type !== 'Ride'
                ? 'Other'
                : null;

            return {
              title: activity.name,
              date: activity.start_date,
              type: type || activity.type,
              backgroundColor:
                Constants.typeColor[type || activity.type],
            };
          })
        : [{}];
    return runs;
  };

  const handleNativeTimeChange = (start: Date, end: Date) => {
    setCurrentMonth(start.getMonth());
    setCurrentYear(start.getFullYear());
    setStartDate(start.getTime() / 1000);
    setEndDate(end.getTime() / 1000);
  };

  const handleChangeDate = (date?: MaterialUiPickersDate) => {
    date && setCurrentMonth(date.get('month'));
    date && setCurrentYear(date.get('year'));
  };

  const renderDateControls = () => {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          className={classes.datePicker}
          disableFuture
          lang="fr/fr"
          onChange={e => {
            handleChangeDate(e);
          }}
          onClose={() => {
            setOpenDatePicker(false);
          }}
          open={openDatePicker}
          value={`${
            Constants.monthNames[currentMonth]
          } ${currentYear.toString()}`}
          views={['month', 'year']}
        />
      </MuiPickersUtilsProvider>
    );
  };

  const renderCalendar = () => {
    return (
      <FullCalendar
        aspectRatio={2}
        customButtons={{
          datePickerTitle: {
            text: `${
              Constants.monthNames[currentMonth]
            } ${currentYear.toString()}`,
            click() {
              setOpenDatePicker(true);
            },
          },
        }}
        datesSet={(arg: DatesSetArg): void => {
          handleNativeTimeChange(arg.start, arg.end);
        }}
        dayCellClassNames={classes.dayCell}
        defaultAllDay
        displayEventTime={false}
        eventClassNames={classes.event}
        events={formatActivities()}
        fixedWeekCount={false}
        headerToolbar={{
          start: '',
          center: 'prev datePickerTitle next',
          end: 'today',
        }}
        locale={frLocale}
        plugins={[dayGridPlugin]}
        ref={calendar}
        showNonCurrentDates={false}
        viewClassNames={classes.calendar}
      />
      // <FullCalendar plugins={[dayGridPlugin]} ref={calendar} />
    );
  };

  return (
    <>
      <div className={classes.container}>
        {renderDateControls()}
        {renderCalendar()}
      </div>
    </>
  );
};

export default withStyles(styles)(CalendarComponent);
