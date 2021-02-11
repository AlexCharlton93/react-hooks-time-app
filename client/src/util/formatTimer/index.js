import { Duration } from 'luxon';

export const formatTimer = (seconds) => {
  return Duration.fromObject({ seconds }).toFormat('hh:mm:ss')
}
