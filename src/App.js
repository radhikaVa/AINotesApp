import Navbar from "./components/Navbar";
import AppSnakeBar  from "./utils/AppSnakeBar";
import MobileFabMenu from "./components/MobileFabMenu";
import AppRoutes from "./routes/AppRoutes";


function App() {

  return (
    <>
    <Navbar/>
    <MobileFabMenu/>
   <AppSnakeBar/>
    <br/>
    {/* <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/create" element={<CreateNote/>}/>
      <Route path="/edit/:id" element={<NoteEditor/>}/>
      <Route path="/note/:id" element={<NoteDetails/>}/>
    </Routes> */}
    <AppRoutes/>
    </>
  );
}

export default App;
