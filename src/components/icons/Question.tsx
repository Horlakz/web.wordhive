interface Props {
  width?: number;
  height?: number;
  strokeColor?: string;
}

function QuestionIcon({
  width = 24,
  height = 24,
  strokeColor = "#171717",
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 19h.01M8.217 7.697A4.002 4.002 0 0116 9a4.001 4.001 0 01-2.442 3.685c-.74.314-1.111.47-1.24.592a.75.75 0 00-.257.386C12 13.83 12 14.087 12 14.6V16"
        stroke={strokeColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default QuestionIcon;
