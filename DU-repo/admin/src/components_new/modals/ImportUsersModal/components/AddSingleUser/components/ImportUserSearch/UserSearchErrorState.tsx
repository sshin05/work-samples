import type { FieldError } from 'react-hook-form';

export const UserSearchErrorState = (props: { error: FieldError }) => {
  const { error } = props;
  return (
    <>
      <div
        className="cds--text-input__field-wrapper"
        data-invalid="true"
        style={{ bottom: 27, left: 8, position: 'relative' }}
      >
        <svg
          focusable="false"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          aria-hidden="true"
          className="cds--text cds--text-input__invalid-icon"
        >
          <path d="M8,1C4.2,1,1,4.2,1,8s3.2,7,7,7s7-3.1,7-7S11.9,1,8,1z M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2 c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z" />
          <path
            d="M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8 c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z"
            data-icon-path="inner-path"
            opacity="0"
          />
        </svg>
      </div>
      <div style={{ top: 0, position: 'relative' }}>
        <p
          style={{
            position: 'absolute',
            display: 'block',
            fontWeight: 400,
            maxHeight: '12.5rem',
            overflow: 'visible',
            fontSize: '.7rem',
            color: 'danger.text.initial'
          }}
          className="cds--form-requirement"
          id="email-error-msg"
        >
          {error?.message}
        </p>
      </div>
    </>
  );
};
