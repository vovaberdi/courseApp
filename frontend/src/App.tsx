
import './App.css';
import Header from './Components/LayoutArea/Header/Header';
import Main from './Components/LayoutArea/Main/Main';
import Footer from './Components/LayoutArea/Footer/Footer';


function App() {
  return (
    <div className="App">
         <header><Header/></header>
         <main><Main/></main>
         <footer><Footer/></footer>
    </div>
  );
}

export default App;
