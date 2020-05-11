import gql from 'graphql-tag';

const TODO_QUERY = gql`
  query Todos {
    todos {
      id
      title
      completed
    }
  }
`;

const TODO_MUTATION = gql`
  mutation {
    addTodo(id: 2, title: "test 2") {
      id
      title
    }
  }
`;

export default { TODO_QUERY, TODO_MUTATION };
