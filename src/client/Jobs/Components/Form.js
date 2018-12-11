import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import cn from "classnames";

const JobForm = ({
  isSubmitting,
  onSubmit,
  initialValues,
  submitBtnText,
  companies,
}) => (
  <Formik
    initialValues={initialValues}
    validate={(values) => {
      const errors = {};
      if (!values.companyId) {
        errors.companyId = "Please select one of your companies to continue.";
      }
      if (!values.title) {
        errors.title = "Please enter a job title.";
      }

      if (values.title.length > 80) {
        errors.title = "Please enter a title that is 80 characters or less.";
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
        errors.description = "Please enter a detailed description of this job.";
      }

      if (!values.salaryRange) {
        errors.salaryRange = "Please select a salary range for this position.";
      }

      if (!values.experienceRange) {
        errors.experienceRange =
          "Please select an experience range for this position.";
      }

      if (values.recruiter && !values.recruiterAgency) {
        errors.recruiterAgency = "Please enter your recruiter agency name.";
      }
      return errors;
    }}
    onSubmit={onSubmit}
  >
    {({ isSubmitting, errors }) => (
      <Form>
        <fieldset>
          <legend>Job Details</legend>

          <div className="field">
            <label htmlFor="companyId" className="label">
              Select a Company
            </label>
            <div className="control">
              <div
                className={cn({
                  select: true,
                  "is-danger": errors.companyId,
                })}
              >
                <Field name="companyId" id="companyId" component="select">
                  {companies.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Field>
              </div>
            </div>

            <ErrorMessage
              name="companyId"
              component="p"
              className="help is-danger"
            />
          </div>
          <div className="field">
            <label htmlFor="title" className="label">
              Job Title
            </label>
            <div className="control">
              <Field
                type="text"
                name="title"
                id="title"
                className={cn({
                  input: true,
                  "is-danger": errors.title,
                })}
              />
            </div>

            <ErrorMessage
              name="title"
              component="p"
              className="help is-danger"
            />
          </div>
          <div className="field">
            <label htmlFor="short_description" className="label">
              Short Description
            </label>
            <div className="control">
              <Field
                type="text"
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
              Detailed Description
            </label>
            <div className="control">
              <Field
                type="text"
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
            <label htmlFor="type" className="label">
              Employment Status
            </label>
            <div className="control">
              <div
                className={cn({
                  select: true,
                  "is-danger": errors.type,
                })}
              >
                <Field id="type" name="type" component="select">
                  <option value="temporary">Temporary</option>
                  <option value="internship">Internship</option>
                  <option value="fulltime">Full Time</option>
                  <option value="parttime">Part Time</option>
                  <option value="freelance">Freelance</option>
                  <option value="contract">Contract</option>
                </Field>
              </div>
            </div>
            <ErrorMessage
              name="type"
              component="p"
              className="help is-danger"
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Experience and Compensation</legend>

          <div className="field">
            <label htmlFor="experienceRange" className="label">
              Experience Range
            </label>
            <div className="control">
              <div
                className={cn({
                  select: true,
                  "is-danger": errors.experienceRange,
                })}
              >
                <Field
                  id="experienceRange"
                  name="experienceRange"
                  component="select"
                >
                  <option value="junior">Junior</option>
                  <option value="midlevel">Midlevel</option>
                  <option value="senior">Senior</option>
                </Field>
              </div>
            </div>
            <ErrorMessage
              name="experienceRange"
              component="p"
              className="help is-danger"
            />
          </div>
          <div className="field">
            <label htmlFor="salaryRange" className="label">
              Salary Range
            </label>
            <div className="control">
              <div
                className={cn({
                  select: true,
                  "is-danger": errors.salaryRange,
                })}
              >
                <Field id="salaryRange" name="salaryRange" component="select">
                  <option value="Undisclosed">Undisclosed</option>
                  {Array(14)
                    .fill(0)
                    .map((_, i) => {
                      const value = `$${(i * 20000).toLocaleString()} - $${(
                        (i + 1) *
                        20000
                      ).toLocaleString()}`;
                      return (
                        <option key={i} value={value}>
                          {value}
                        </option>
                      );
                    })}
                </Field>
              </div>
            </div>
            <p className="help">
              Hint: If you provide salary information, your post will
              automatically notify everyone in the #jobs channel on Nashdev.
            </p>
            <ErrorMessage
              name="salaryRange"
              component="p"
              className="help is-danger"
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Contact Information</legend>
          <div className="field">
            <label htmlFor="website" className="label">
              Application Website
            </label>
            <div className="control">
              <Field
                type="text"
                id="website"
                name="website"
                className={cn({
                  input: true,
                  "is-danger": errors.website,
                })}
              />
            </div>
            <ErrorMessage
              name="website"
              component="p"
              className="help is-danger"
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Remote</legend>
          <div className="field">
            <label htmlFor="location" className="label">
              Office Location
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
            <label htmlFor="remoteAvailable" className="checkbox">
              <Field name="remoteAvailable">
                {({ field, form }) => (
                  <input
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    type="checkbox"
                    id="remoteAvailable"
                    name="remoteAvailable"
                    value
                    checked={field.value}
                    className={cn({
                      checkbox: true,
                      "is-danger": errors.remoteAvailable,
                    })}
                  />
                )}
              </Field>{" "}
              You can work remotely at this job.
            </label>

            <ErrorMessage
              name="remoteAvailable"
              component="p"
              className="help is-danger"
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Recruiter</legend>
          <div className="field">
            <label htmlFor="recruiter" className="checkbox">
              <Field name="recruiter">
                {({ field, form }) => (
                  <input
                    id="recruiter"
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    type="checkbox"
                    name="recruiter"
                    value
                    checked={field.value}
                    className={cn({
                      checkbox: true,
                      "is-danger": errors.recruiter,
                    })}
                  />
                )}
              </Field>{" "}
              This job is being listed by a recruiting agency.
            </label>
            <ErrorMessage
              name="recruiter"
              component="p"
              className="help is-danger"
            />
          </div>
          <div className="field">
            <label htmlFor="recruiterAgency" className="label">
              Recruiter Agency
            </label>
            <div className="control">
              <Field
                type="text"
                id="recruiterAgency"
                name="recruiterAgency"
                className={cn({
                  input: true,
                  "is-danger": errors.recruiterAgency,
                })}
              />
            </div>
            <ErrorMessage
              name="recruiterAgency"
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

export default JobForm;
