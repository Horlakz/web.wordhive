interface Props {
  width?: number;
  height?: number;
  strokeColor?: string;
}

function ChevronRightIcon({
  width = 24,
  height = 24,
  strokeColor = "#171717",
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M8.91 19.92l6.52-6.52c.77-.77.77-2.03 0-2.8L8.91 4.08"
        stroke={strokeColor}
        strokeWidth={3}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ChevronRightIcon;
