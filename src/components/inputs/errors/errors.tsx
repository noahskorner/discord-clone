import ErrorInterface from '../../../utils/types/interfaces/error';

interface ErrorsProps {
  errors: ErrorInterface[];
}

const Errors = ({ errors }: ErrorsProps) => {
  return errors.length ? (
    <div>
      {errors.map((error, index) => {
        return (
          <p key={index} className="font-medium text-red-500">
            {error.message}
          </p>
        );
      })}
    </div>
  ) : (
    <></>
  );
};

export default Errors;
