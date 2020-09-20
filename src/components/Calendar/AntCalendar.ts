import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
import generateCalendar from 'antd/es/calendar/generateCalendar';
import 'antd/es/date-picker/style/index';

const AntCalendar = generateCalendar<Date>(dateFnsGenerateConfig);

export default AntCalendar;