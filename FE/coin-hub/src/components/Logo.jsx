export default function Logo({ width = 120, className = "" }) {
  return (
    <svg
      width={width}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle */}
      <circle cx="100" cy="100" r="100" fill="#8DC647" />

      {/* Gecko eye */}
      <circle cx="120" cy="80" r="10" fill="#000" />

      {/* Gecko face shape */}
      <path d="M40 120 Q80 40 160 100 Q120 160 40 120" fill="#CBE87C" />
    </svg>
  );
}
