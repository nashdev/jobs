import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import cn from "classnames";

const CompanyForm = ({
  isSubmitting,
  onSubmit,
  initialValues,
  submitBtnText,
}) => (
  <Formik
    initialValues={initialValues}
    validate={(values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Your company name is required.";
      }

      if (values.name.length > 65) {
        errors.name = "Please enter a name that is 65 characters or less.";
      }

      if (!values.short_description) {
        errors.short_description =
          "Please enter a short description of your company.";
      }

      if (values.short_description.length > 200) {
        errors.short_description =
          "Please enter a short description that is 200 characters or less.";
      }

      if (!values.description) {
        errors.description =
          "Please enter a detailed description of your company.";
      }
      if (!values.location) {
        errors.location = "Please the location of your company headquarters.";
      }

      if (!values.size) {
        errors.size =
          "Please describe the number of people your company employs.";
      }

      if (!Number.isInteger(values.size) || values.size > 3000000) {
        errors.size =
          "Please enter a valid size. (No Decimals/Smaller than 3 million)";
      }
      return errors;
    }}
    onSubmit={onSubmit}
  >
    {({ isSubmitting, errors }) => (
      <Form>
        <fieldset>
          <legend>Company Details</legend>

          <div className="field">
            <label htmlFor="name" className="label">
              Company Name
            </label>
            <div className="control">
              <Field
                type="text"
                name="name"
                id="name"
                className={cn({
                  input: true,
                  "is-danger": errors.name,
                })}
              />
            </div>

            <ErrorMessage
              name="name"
              component="p"
              className="help is-danger"
            />
          </div>
          <div className="field">
            <label htmlFor="description" className="label">
              Short Description
            </label>
            <div className="control">
              <Field
                id="short_description"
                name="short_description"
                component="textarea"
                className={cn({
                  textarea: true,
                  "is-danger": errors.short_description,
                })}
              />
            </div>
            <ErrorMessage
              name="short_description"
              component="p"
              className="help is-danger"
            />
          </div>
          <div className="field">
            <label htmlFor="description" className="label">
              Company Details
            </label>
            <div className="control">
              <Field
                id="description"
                name="description"
                component="textarea"
                className={cn({
                  textarea: true,
                  "is-danger": errors.description,
                })}
              />
            </div>
            <p className="help">
              Hint: You can use{" "}
              <a
                href="https://guides.github.com/features/mastering-markdown/#syntax"
                rel="noopener noreferrer"
                target="_blank"
              >
                Markdown
              </a>
            </p>
            <ErrorMessage
              name="description"
              component="p"
              className="help is-danger"
            />
          </div>
          <div className="field">
            <label htmlFor="location" className="label">
              Location:{" "}
            </label>
            <div className="control">
              <Field
                type="text"
                id="location"
                name="location"
                className={cn({
                  input: true,
                  "is-danger": errors.location,
                })}
              />
            </div>
            <ErrorMessage
              name="location"
              component="p"
              className="help is-danger"
            />
          </div>

          <div className="field">
            <label htmlFor="size" className="label">
              Company size
            </label>
            <div className="control">
              <Field
                type="number"
                id="size"
                name="size"
                className={cn({
                  input: true,
                  "is-danger": errors.size,
                })}
              />
            </div>
            <ErrorMessage
              name="size"
              component="p"
              className="help is-danger"
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Profile</legend>

          <div className="field">
            <label htmlFor="size" className="label">
              Twitter
            </label>
            <div className="control">
              <Field
                type="text"
                id="size"
                name="twitter"
                className={cn({
                  input: true,
                  "is-danger": errors.twitter,
                })}
              />
            </div>
            <ErrorMessage
              name="twitter"
              component="p"
              className="help is-danger"
            />
          </div>
          <div className="field">
            <label htmlFor="size" className="label">
              Facebook
            </label>
            <div className="control">
              <Field
                type="text"
                id="size"
                name="facebook"
                className={cn({
                  input: true,
                  "is-danger": errors.facebook,
                })}
              />
            </div>
            <ErrorMessage
              name="facebook"
              component="p"
              className="help is-danger"
            />
          </div>
          <div className="field">
            <label htmlFor="size" className="label">
              Github
            </label>
            <div className="control">
              <Field
                type="text"
                id="size"
                name="github"
                className={cn({
                  input: true,
                  "is-danger": errors.github,
                })}
              />
            </div>
            <ErrorMessage
              name="github"
              component="p"
              className="help is-danger"
            />
          </div>
          <div className="field">
            <label htmlFor="size" className="label">
              Linkedin
            </label>
            <div className="control">
              <Field
                type="text"
                id="size"
                name="linkedin"
                className={cn({
                  input: true,
                  "is-danger": errors.linkedin,
                })}
              />
            </div>
            <ErrorMessage
              name="linkedin"
              component="p"
              className="help is-danger"
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="field is-grouped">
            <div className="control">
              <button
                className="button is-link"
                disabled={isSubmitting}
                type="submit"
              >
                {submitBtnText}
              </button>
            </div>
            <div className="control">
              <button className="button is-text" type="reset">
                Reset
              </button>
            </div>
          </div>
        </fieldset>
      </Form>
    )}
  </Formik>
);

export default CompanyForm;
