interface EmptyStateProps {
  message: string;
}

const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <div className="text-center py-20 bg-white rounded-3xl text-gray-400 font-medium border border-gray-100 shadow-sm">
      {message}
    </div>
  );
};

export default EmptyState;
