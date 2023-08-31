import classnames from "classnames";

interface ValueCardProps {
  readonly title: string;
  readonly body: string;
  readonly switchColors?: boolean;
}

const edgePositions = [
  "sm:-top-12 -top-6 sm:-left-12 -left-6",
  "sm:-top-16 -top-10 sm:-right-16 -right-10",
  "sm:-bottom-16 -bottom-10 sm:-left-16 -left-10",
  "sm:-bottom-12 -bottom-6 sm:-right-12 -right-6",
];

function ValueCard({ title, body, switchColors }: ValueCardProps) {
  return (
    <div className="overflow-hidden relative sm:py-16 py-8 sm:px-10 px-6 rounded-xl">
      {edgePositions.map((pos, i) => {
        const principalDiagonal = i == 1 || i == 2;
        const secondaryDiagonal = i == 0 || i == 3;

        return (
          <span
            key={i}
            className={classnames(
              "absolute sm:w-24 w-16 sm:h-24 h-16 rounded-full",
              pos,
              {
                "bg-primary": switchColors
                  ? secondaryDiagonal
                  : principalDiagonal,
                "bg-secondary": switchColors
                  ? principalDiagonal
                  : secondaryDiagonal,
              }
            )}
          />
        );
      })}
      <h5 className="sm:text-3xl text-2xl font-medium text-dark-900">
        {title}
      </h5>
      <p className="text-dark-600">{body}</p>
    </div>
  );
}

export default ValueCard;
