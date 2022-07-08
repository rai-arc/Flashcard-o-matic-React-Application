import React from "react";

//This component is used by both AddCard and EditCard.
//It takes many of their functions as props.

export default function CardForm({
  onSubmit,
  onCancel,
  submitLabel,
  cancelLabel,
  formData,
  setFormData,
}) {
  const handleInputChange = (event) =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="card-front">Front</label>
        <textarea
          className="form-control"
          defaultValue={formData.front}
          onChange={handleInputChange}
          name="front"
          id="card-front"
        />
      </div>
      <div className="form-group">
        <label htmlFor="card-back">Back</label>
        <textarea
          className="form-control"
          defaultValue={formData.back}
          onChange={handleInputChange}
          name="back"
          id="card-back"
        />
      </div>
      <div>
        <button
          className="btn btn-secondary mr-1"
          onClick={onCancel}
          type="button"
        >
          {cancelLabel}
        </button>
        <button className="btn btn-primary mr-1" type="submit">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
