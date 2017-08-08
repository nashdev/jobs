import React from "react";

export const RenderField = ({
  children,
  input,
  label,
  type,
  help,
  meta: { touched, error }
}) => {
  return (
    <div className="form-field-group">
      <label>
        <span className="form-field-label">
          {label}
        </span>
      </label>
      <div>
        {React.cloneElement(children, {
          ...input,
          placeholder: label,
          type: type
        })}
        {help &&
          <span className="form-input-help">
            {help}
          </span>}
        {touched &&
          error &&
          <div className="text-danger text-big">
            {error}
          </div>}
      </div>
    </div>
  );
};
export const RenderCheckbox = ({
  children,
  input,
  label,
  type,
  help,
  meta: { touched, error }
}) => {
  return (
    <div className="form-field-group form-field-checkbox">
      <label>
        {React.cloneElement(children, {
          ...input,
          placeholder: label,
          type: type
        })}
        <span className="form-field-label">
          {label}
        </span>
      </label>
      {help &&
        <span className="form-input-help">
          {help}
        </span>}
      {touched &&
        error &&
        <div className="text-danger text-big">
          {error}
        </div>}
    </div>
  );
};

export const Input = props =>
  (<RenderField {...props}>
    <input />
  </RenderField>);

export const Checkbox = props =>
  (<RenderCheckbox {...props}>
    <input />
  </RenderCheckbox>);

export const Textarea = props =>
  (<RenderField {...props}>
    <textarea />
  </RenderField>);

export const Dropdown = props =>
  (<RenderField {...props}>
    <select>
      {props.options.map(o => {
        return (
          <option value={o.value} key={o.value}>
            {o.label}
          </option>
        );
      })}
    </select>
  </RenderField>);
