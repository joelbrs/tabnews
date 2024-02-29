import dayjs from 'dayjs'
import TimeZone from 'dayjs/plugin/timezone'
import UpdateLocale from 'dayjs/plugin/updateLocale'
import RelativeTime from 'dayjs/plugin/relativeTime'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(RelativeTime)
dayjs.extend(UpdateLocale)
dayjs.extend(LocalizedFormat)
dayjs.extend(TimeZone)
dayjs.tz.setDefault('America/Brasilia')

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'em %s',
    past: '%s',
    s: 'alguns segundos',
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
  },
  months: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ]
})

export const $dayjs = dayjs
