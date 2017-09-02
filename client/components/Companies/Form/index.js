import React from "react";
import { Field } from "redux-form";
import { Input, Textarea } from "../../Form";

const logoHelp = () => (
  <span>
    Enhancement: Wouldn't it be cool to display company logos on company
    profiles?{" "}
    <a
      href="https://github.com/egdelwonk/nashdev-jobs/issues/9"
      target="_blank"
    >
      Implement it.
    </a>
  </span>
);
const bannerHelp = () => (
  <span>
    Enhancement: Wouldn't it be cool to display a photo for the banner on
    company profiles?{" "}
    <a
      href="https://github.com/egdelwonk/nashdev-jobs/issues/11"
      target="_blank"
    >
      Implement it.
    </a>
  </span>
);

const descHelp = () => (
  <span>
    Tip: You can use{" "}
    <a href="http://commonmark.org/help/" target="_blank">
      Markdown
    </a>{" "}
    here.
    <br />
    Enhancement: Interested in a Markdown WYSIWYG Editor?{" "}
    <a href="https://github.com/egdelwonk/nashdev-jobs/issues/17">
      Implement it.
    </a>
  </span>
);

export const CompanyForm = ({ submitting, pristine, reset, label }) => {
  return (
    <div>
      <h2 className="subtitle is-2">Company Details</h2>
      <Field name="name" type="text" component={Input} label="Company Name" />
      <Field
        name="phone"
        type="tel"
        component={Input}
        label="Company Telephone Number"
      />
      <Field
        name="location"
        type="text"
        component={Input}
        label="Office Location"
      />
      <Field
        name="size"
        type="number"
        component={Input}
        label="How many people are in your company?"
      />
      <Field
        name="description"
        type="text"
        component={Textarea}
        label="Description"
        help={descHelp()}
      />

      <hr className="divider" />
      <h2 className="subtitle is-2">Profile Images</h2>
      <Field
        name="logo"
        type="file"
        component={Input}
        label="Profile Logo"
        help={logoHelp()}
      />
      <Field
        name="banner"
        type="file"
        component={Input}
        label="Profile Banner"
        help={bannerHelp()}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            disabled={submitting}
            className="button is-primary"
          >
            {label}
          </button>
        </div>

        <button
          className="button is-link"
          type="button"
          disabled={pristine || submitting}
          onClick={reset}
        >
          Clear Values
        </button>
      </div>
    </div>
  );
};
