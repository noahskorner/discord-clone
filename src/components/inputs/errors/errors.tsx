import ErrorInterface from '../../../utils/types/interfaces/error';

interface ErrorsProps {
  errors: ErrorInterface[];
}

const Errors = ({ errors }: ErrorsProps) => {
  return errors.length ? (
    <div>
      {errors.map((error, index) => {
        return (
          <p key={index} className="text-red-500 font-medium">
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
