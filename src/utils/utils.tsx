import { Tooltip } from '@mui/material';
import { ActionIcon } from '@/src/components/Client/components/styleClient';

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
}

export const ActionIconComponent = ({
  action,
  icon,
  placement,
  title,
}: ActionIconProps) => {
  return (
    <Tooltip title={title} placement={placement}>
      <ActionIcon onClick={action}>{icon}</ActionIcon>
    </Tooltip>
  );
};
