import React from "react";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import CompanyForm from "../Components/Form";
import HeroBanner from "../../Common/HeroBanner";

const CREATE_COMPANY = gql`
  mutation CreateCompany(
    $name: String!
    $description: String!
    $short_description: String!
    $size: Int
    $picture: String
    $banner: String
    $location: String
    $github: String
    $facebook: String
    $linkedin: String
    $twitter: String
  ) {
    createCompany(
      company: {
        name: $name
        description: $description
        short_description: $short_description
        location: $location
        size: $size
        picture: $picture
        banner: $banner
        twitter: $twitter
        linkedin: $linkedin
        github: $github
        facebook: $facebook
      }
    ) {
      id
      name
      description
      short_description
      location
      size
      picture
      banner
      twitter
      linkedin
      github
      facebook
    }
  }
`;

const DESCRIPTION_TEMPLATE = `### About Us

### Our Story

### Funding

### Perks + Culture
`;

const CreateCompanyPage = ({ history, location }) => (
  <Mutation mutation={CREATE_COMPANY}>
    {(createCompany) => (
      <React.Fragment>
        <HeroBanner title="Create a new company." location={location} />

        <section className="section">
          <div className="container">
            <CompanyForm
              submitBtnText="Add Company"
              onSubmit={(values, { setSubmitting }) => {
                createCompany({ variables: values }).then((res) => {
                  const { name } = res.data.createCompany;
                  const companyId = res.data.createCompany.id;
                  history.replace(`/dashboard`, {
                    flash: {
                      status: "success",
                      title: "Created Company",
                      message: `You successfully added the company "${name}".`,
                      link: `/company/${companyId}/edit`,
                      linkText: "Edit Company",
                    },
                  });
                  setSubmitting(false);
                });
              }}
              initialValues={{
                name: "",
                description: DESCRIPTION_TEMPLATE,
                short_description: "A brief description of your company.",
                location: "Nashville, TN",
                size: 0,
                picture: "",
                banner: "",
                twitter: "",
                linkedin: "",
                github: "",
                facebook: "",
              }}
            />
          </div>
        </section>
      </React.Fragment>
    )}
  </Mutation>
);

export default withRouter(CreateCompanyPage);
