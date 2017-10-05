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
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        {React.cloneElement(children, {
          ...input,
          placeholder: label,
          type: type
        })}
        {help && <p className="help">{help}</p>}
        {touched && error && <p className="help is-danger">{error}</p>}
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
    <div className="field">
      <label className="checkbox">
        {React.cloneElement(children, {
          ...input,
          placeholder: label,
          type: type
        })}{" "}
        {label}
      </label>
      {help && <p className="help">{help}</p>}
      {touched && error && <p className="help is-danger">{error}</p>}
    </div>
  );
};

export const Input = props => (
  <RenderField {...props}>
    <input className="input" />
  </RenderField>
);

export const Checkbox = props => (
  <RenderCheckbox {...props}>
    <input />
  </RenderCheckbox>
);

export const Textarea = props => (
  <RenderField {...props}>
    <textarea className="textarea" />
  </RenderField>
);

export const Dropdown = props => (
  <RenderField {...props}>
    <select className="select">
      {props.options.map(o => {
        return (
          <option value={o.value} key={o.value}>
            {o.label}
          </option>
        );
      })}
    </select>
  </RenderField>
);
