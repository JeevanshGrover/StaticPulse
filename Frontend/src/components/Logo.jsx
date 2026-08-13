export default function Logo({ className = "", size = 24 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M22 14 C14 14 10 22 10 32 C10 42 14 50 22 50"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42 14 C50 14 54 22 54 32 C54 42 50 50 42 50"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 36 H24 C26.5 36 27.5 28 30.5 28 C33.5 28 34.5 44 37.5 44 C40.5 44 41.5 36 44 36 H46"
        stroke="var(--logo-accent)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
