export function JsonDisplay(props) {
  return (
    <textarea
      style={{
        width: props.width ?? '90%',
        height: props.height ?? 300,
        overflow: 'scroll',
        fontSize: 9,
        fontFamily: 'monospace',
        lineHeight: 1.6,
        backgroundColor: 'darkblue'
      }}
      value={JSON.stringify(props.object, null, 3)}
    />
  );
}
