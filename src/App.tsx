import logo from './assets/logo.svg';
import { TaskManager } from './TaskManager.tsx';

function App() {
  return (
    <>
      <header className='header'>
        <img src={logo} alt='logo' />
      </header>
      <main className='main'>
        <TaskManager />
      </main>
    </>
  )
}

export default App
