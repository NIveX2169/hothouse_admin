// -----------------------------------------------Imports------------------------------------------------
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner"
import { appRouter } from "./routes/routes";
// ------------------------------------------------------------------------------------------------------

function App() {
  return (
    <>
      <Toaster richColors
        containerClassName="overflow-auto"
        position="top-center"
        expand={true}
      />
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
