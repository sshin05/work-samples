import { css } from '@cerberus/styled-system/css';

export const ClassroomBackground = () => {
  return (
    <div
      className={css({
        position: 'absolute',
        top: '0',
        left: '0',
        bottom: '0',
        right: '0',
        zIndex: '-1',
        backgroundImage: "url('/admin/images/classroom-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      })}
    ></div>
  );
};
