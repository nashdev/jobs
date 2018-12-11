export const GET_COMPANY_QUERY = gql`
  query GetCompany($id: ID!) {
    company(id: $id) {
      id
      name
      location
      phone
      size
      description
    }
  }
`;
