const ControlsWrapper = ({ className = "", children }) => {
  return (
    <div
      className={
        "p-4 dark:bg-x-bgTwoDark bg-x-bgTwo rounded-xl flex flex-col gap-y-4 " +
        className
      }
    >
      {children}
    </div>
  );
};

export default ControlsWrapper;
