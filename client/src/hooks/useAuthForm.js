import { useCallback, useState } from "react";

const useAuthForm = (initialValues, validate) => {
  const [input, setInput] = useState(initialValues);
  const [error, setError] = useState(null);

  const handleChange = useCallback(
    (e) => {
      setInput({ ...input, [e.target.name]: e.target.value });
    },
    [input],
  );

  const handleSubmit = (e, callback) => {
    e.preventDefault();
    const validator = validate(input);
    if (validator.error !== null) {
      setError(validator.error);
    } else {
      setError(null);
      callback();
    }
  };

  return {
    input,
    handleChange,
    error,
    handleSubmit,
    setError,
    setInput,
  };
};

export default useAuthForm;
