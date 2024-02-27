import dayjs from 'dayjs'
import UpdateLocale from 'dayjs/plugin/updateLocale'
import RelativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(RelativeTime)
dayjs.extend(UpdateLocale)

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'em %s',
    past: 'há %s',
    s: 'alguns seconds',
    m: 'um minute',
    mm: '%d minutos',
    h: 'uma hora',
    hh: '%d horas',
    d: 'um dia',
    dd: '%d dias',
    M: 'um mês',
    MM: '%d meses',
    y: 'um ano',
    yy: '%d anos'
  }
})

export const $dayjs = dayjs
