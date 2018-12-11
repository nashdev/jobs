import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import cn from "classnames";
import { Link } from "react-router-dom";

const PersonSettingsForm = ({
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
        errors.name = "Your name is required.";
      }

      return errors;
    }}
    onSubmit={onSubmit}
  >
    {({ isSubmitting, errors }) => (
      <Form>
        <fieldset>
          <legend>Your Details</legend>

          <div className="field">
            <label htmlFor="public" className="checkbox">
              <Field name="public">
                {({ field, form }) => (
                  <input
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    type="checkbox"
                    id="public"
                    name="public"
                    value
                    checked={field.value}
                    className={cn({
                      checkbox: true,
                      "is-danger": errors.public,
                    })}
                  />
                )}
              </Field>{" "}
              I would like for my profile to be listed on the{" "}
              <Link to="/people">People</Link> page.
            </label>

            <ErrorMessage
              name="public"
              component="p"
              className="help is-danger"
            />
          </div>

          <div className="field">
            <label htmlFor="available" className="checkbox">
              <Field name="available">
                {({ field, form }) => (
                  <input
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    type="checkbox"
                    id="available"
                    name="available"
                    value
                    checked={field.value}
                    className={cn({
                      checkbox: true,
                      "is-danger": errors.available,
                    })}
                  />
                )}
              </Field>{" "}
              I am available for hire or looking for new opportunities.
            </label>

            <ErrorMessage
              name="available"
              component="p"
              className="help is-danger"
            />
          </div>

          <div className="field">
            <label htmlFor="name" className="label">
              Your name
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
            <label htmlFor="resume" className="label">
              Resume
            </label>
            <div className="control">
              <Field
                id="resume"
                name="resume"
                component="textarea"
                className={cn({
                  textarea: true,
                  "is-danger": errors.resume,
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
              name="resume"
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
        </fieldset>
        <fieldset>
          <legend>Profile</legend>

          <div className="field">
            <label htmlFor="twiitter" className="label">
              Twitter
            </label>
            <div className="control">
              <Field
                type="text"
                id="twiitter"
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
            <label htmlFor="facebook" className="label">
              Facebook
            </label>
            <div className="control">
              <Field
                type="text"
                id="facebook"
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
            <label htmlFor="github" className="label">
              Github
            </label>
            <div className="control">
              <Field
                type="text"
                id="github"
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
            <label htmlFor="linkedin" className="label">
              Linkedin
            </label>
            <div className="control">
              <Field
                type="text"
                id="linkedin"
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

export default PersonSettingsForm;
