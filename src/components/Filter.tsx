import classes from './Filter.module.css'
import {ChangeEvent, FormEvent, useState} from "react";

type FilterProps = {
  min: (value: number) => void;
}

export default function Filter({min}: FilterProps) {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Manejar el cambio en el campo de entrada
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    // Validar que solo se permita introducir números
    if (/^\d*$/.test(value)) {
      setInputValue(value);
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const numericValue = Number(inputValue);
    if (!isNaN(numericValue) && inputValue.trim() !== "") {
      min(numericValue);
      setErrorMessage(null); // Limpia cualquier mensaje de error
    } else {
      setErrorMessage("Por favor, introduce un número válido.");
    }
  }

  // Manejar la limpieza del campo de entrada
  function handleReset() {
    setInputValue(""); // Limpia el valor del input
    setErrorMessage(null);
    min(0);
  }

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <label htmlFor="minPopulation" className={classes.label}>Minimum population:</label>
        <input
          id="minPopulation"
          type="number"
          className={classes.input}
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter a number"
        />
        <button
          type="submit"
          className={classes.btn}
          disabled={!inputValue.trim()}
        >Filter</button>
        <button
          type="button"
          className={`${classes.btn} ${classes.clearBtn}`}
          disabled={!inputValue.trim()}
          onClick={handleReset}
        >Reset</button>
      </form>
      {errorMessage && (
        <p id="error-message" className={classes.error}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}