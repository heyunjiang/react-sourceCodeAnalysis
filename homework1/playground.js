import HReact from './HReact'

const user = { name: 'test' }

const {createElement} = HReact

// debugger
const App = () => {
  return <div>{user.name}</div>
}

HReact.renderComponent(
  App,
  document.getElementById('root')
);
