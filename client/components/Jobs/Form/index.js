import React from "react";
import { Field } from "redux-form";
import { Input, Textarea, Dropdown, Checkbox } from "../../Form";

export const TYPE_OPTIONS = [
  { label: "", value: "" },
  { label: "Temporary", value: "temporary" },
  { label: "Full time", value: "fulltime" },
  { label: "Part time", value: "parttime" },
  { label: "Freelance", value: "freelance" },
  { label: "Contract", value: "contract" }
];

export const EXPERIENCE_OPTIONS = [
  { value: "",  label: "" },
  { value: 100, label: "Junior (Learner: 1-3 Years)" },
  { value: 200, label: "Midlevel (Producer: 3-5 Years)" },
  { value: 300, label: "Senior (Multiplier: 5+ Years)" }
];

export const SALARY_OPTIONS = [
  { value: "", label: "" },
  { value: 30, label: "$30,000 - $50,000" },
  { value: 50, label: "$50,000 - $80,000" },
  { value: 80, label: "$80,000 - $100,000" },
  { value: 100, label: "$100,000+" }
];

function _getValue(options) {
  return value => {
    const option = options.find(o => o.value === value);
    return option && option["label"];
  };
}

export const getType = _getValue(TYPE_OPTIONS);
export const getExperience = _getValue(EXPERIENCE_OPTIONS);
export const getSalary = _getValue(SALARY_OPTIONS);

export const CompanyField = props =>
  (<Field
    name="company_id"
    component={Dropdown}
    options={props.options}
    label="Company"
    help={companyHelp()}
  />);

export const TypeField = () =>
  (<Field
    name="type"
    component={Dropdown}
    options={TYPE_OPTIONS}
    label="Job Type"
  />);

export const ExperienceField = () =>
  (<Field
    name="experience_range"
    component={Dropdown}
    options={EXPERIENCE_OPTIONS}
    label="Experience Range"
  />);

export const SalaryField = () =>
(<Field
  name="salary_range"
  component={Dropdown}
  options={SALARY_OPTIONS}
  label="Salary Range"
/>);

const descHelp = () =>
  (<span>
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
  </span>);

const companyHelp = () =>
  (<span>
    Tip: Don't see your company listed? {" "}
    <a href="/companies/add" target="_blank">
      Add a company
    </a>{" "}
    here.
    <br />
    Enhancement: Interested in autocomplete?{" "}
    <a
      href="https://github.com/egdelwonk/nashdev-jobs/issues/14"
      target="_blank"
    >
      Implement it
    </a>.
  </span>);
export const JobForm = props => {
  return (
    <div>
      <fieldset>
        <legend>Job Details</legend>
        <CompanyField options={props.companies} />
        <Field name="title" type="text" component={Input} label="Title" />
        <Field
          name="description"
          component={Textarea}
          label="Job Details"
          help={descHelp()}
        />
        <TypeField />
      </fieldset>
      <fieldset>
        <legend>Experience and Compensation</legend>
        <ExperienceField />
        <SalaryField />
      </fieldset>
      <fieldset>
        <legend>Contact Information</legend>
        <Field
          name="contact_person"
          type="text"
          component={Input}
          label="Contact Name"
        />
        <Field
          name="contact_phone"
          type="tel"
          component={Input}
          label="Contact Phone Number"
        />
        <Field
          name="contact_slack"
          type="text"
          component={Input}
          label="Contact Slack Handle"
        />
        <Field
          name="contact_email"
          type="email"
          component={Input}
          label="Contact E-mail Address"
        />
        <Field
          name="contact_website"
          type="text"
          component={Input}
          label="Application Website"
        />
      </fieldset>

      <fieldset>
        <legend>Remote</legend>
        <Field
          name="location"
          type="text"
          component={Input}
          label="Office Location"
        />

        <Field
          name="remote_available"
          type="checkbox"
          component={Checkbox}
          label="You can work remotely at this job."
          normalize={v => !!v}
        />
      </fieldset>

      <fieldset>
        <legend>Recruiter</legend>
        <Field
          name="recruiter"
          type="checkbox"
          component={Checkbox}
          label="This job is being listed by a recruiter."
          normalize={v => !!v}
        />
        <Field
          name="recruiter_agency"
          type="text"
          component={Input}
          label="Recruiter Agency"
        />
      </fieldset>
    </div>
  );
};
