interface StatusBtnProps {
  disabled?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

const StatusBtn = ({ disabled = false, children, onClick }: StatusBtnProps) => {
  return (
    <button
      className="text-admin-primary uppercase font-medium disabled:cursor-not-allowed disabled:text-dark-600"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default StatusBtn;
