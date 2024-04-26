const SectionLabel = ({ className = "", children }) => {
  return (
    <label
      className={`text-sm font-bold dark:text-x-accent1Dark text-x-accent1 ${className}`}
    >
      {children}
    </label>
  );
};

export default SectionLabel;
