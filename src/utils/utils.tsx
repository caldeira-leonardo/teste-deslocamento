import { Tooltip } from '@mui/material';
import { ActionIcon } from '@/src/components/Client/components/styleClient';
import moment from 'moment';

interface ActionIconProps {
  title: string;
  placement:
  | 'bottom-end'
  | 'bottom-start'
  | 'bottom'
  | 'left-end'
  | 'left-start'
  | 'left'
  | 'right-end'
  | 'right-start'
  | 'right'
  | 'top-end'
  | 'top-start'
  | 'top';
  action(): void;
  icon: any;
  ['data-testId']?: string;
}

export const ActionIconComponent = (props: ActionIconProps) => {
  const { action, icon } = props;

  return (
    <Tooltip {...props}>
      <ActionIcon onClick={action}>{icon}</ActionIcon>
    </Tooltip>
  );
};

export const MomentLocale = () => {
  return moment.updateLocale('pt-br', {
    months: 'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split(
      '_',
    ),
    monthsShort: 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split('_'),
    weekdays: 'domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado'.split(
      '_',
    ),
    weekdaysShort: 'dom_seg_ter_qua_qui_sex_sáb'.split('_'),
    weekdaysMin: 'dom_2ª_3ª_4ª_5ª_6ª_sáb'.split('_'),
    relativeTime: {
      future: 'em %s',
      past: '%s atrás',
      s: 'segundos',
      m: 'um minuto',
      mm: '%d minutos',
      h: 'uma hora',
      hh: '%d horas',
      d: 'um dia',
      dd: '%d dias',
      M: 'um mês',
      MM: '%d meses',
      y: 'um ano',
      yy: '%d anos',
    },
  });
};
